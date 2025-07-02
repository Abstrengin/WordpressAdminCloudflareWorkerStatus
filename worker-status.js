export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return new Response("Method Not Allowed", { status: 405 });
    }

    try {
      const { client } = await request.json();
      const isAdmin = client?.IsAdmin ?? "false";

      return new Response(isAdmin, {
        headers: { "content-type": "application/json" }
      });
    } catch (err) {
      return new Response("Bad Request", { status: 400 });
    }
  }
}
