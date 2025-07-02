export default {
  async fetch(request, env) {
    const { client } = await request.json();
    const isAdmin = client?.IsAdmin?.toString().toLowerCase() === "true";
    
    return new Response(JSON.stringify(isAdmin), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
