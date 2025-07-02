export default {
  async fetch(request, env) {
    try {
      const { client } = await request.json(); 
      const isAdminValue = client.IsAdmin; 
      return new Response(JSON.stringify(isAdminValue), {
        headers: { 'content-type': 'application/json' },
      });
    } catch (error) {
      // Log the error to Cloudflare Workers dashboard for debugging
      console.error("Worker error processing Zaraz request:", error);
      // Return a default value or an error indicator if something goes wrong
      // Returning false ensures GA is not blocked if the worker fails to detect admin
      return new Response(JSON.stringify(false), {
        headers: { 'content-type': 'application/json' },
        status: 500 // Indicate an internal server error
      });
    }
  },
};
