export default {
  async fetch(request, env) {
    // Only handle POST requests where Zaraz calls the worker with JSON payload
    if (request.method === "POST") {
      let client = {};
      try {
        const reqBody = await request.json();
        client = reqBody?.client || {};
      } catch {
        // ignore JSON parse errors
      }
      const isAdmin = client?.IsAdmin?.toString().toLowerCase() === "true";

      return new Response(JSON.stringify(isAdmin), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // For any other requests (GET page loads, assets), just proxy normally
    return fetch(request);
  }
}
