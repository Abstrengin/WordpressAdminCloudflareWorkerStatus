export default {
  async fetch(request) {
    const { client } = await request.json();
    const isAdmin = client?.IsAdmin || "false";
    return new Response(isAdmin, {
      headers: { "content-type": "application/json" }
    });
  }
}
