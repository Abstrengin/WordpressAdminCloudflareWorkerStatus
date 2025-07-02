export default {
  async fetch(request, env) {
    let client = {};
    try {
      const reqBody = await request.json();
      client = reqBody?.client || {};
    } catch (e) {
      // If the request body isn't JSON, we avoid crashing
    }

    const isAdmin = client?.IsAdmin?.toString().toLowerCase() === "true";

    return new Response(JSON.stringify(isAdmin), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
