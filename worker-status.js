export default {
  async fetch(request, env) {
    try {
      // Zaraz sends context (including window.IsAdmin) via a POST request body
      const { client } = await request.json(); 
      const isAdminValue = client.IsAdmin; 

      // Return the boolean value back to Zaraz
      return new Response(JSON.stringify(isAdminValue), {
        headers: { 'content-type': 'application/json' },
      });
    } catch (error) {
      // Log the error for debugging in Cloudflare Workers dashboard
      console.error("Worker error processing Zaraz request:", error);
      // Return false as a safe fallback if worker fails, so GA is not blocked
      return new Response(JSON.stringify(false), { 
        headers: { 'content-type': 'application/json' },
        status: 500 
      });
    }
  },
};
