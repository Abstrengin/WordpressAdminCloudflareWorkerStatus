export default {
  async fetch(request) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "https://www.tiesthatbindgaming.com",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: corsHeaders,
      });
    }

    try {
      const { client } = await request.json();
      const isAdmin = client?.IsAdmin ?? "false";

      return new Response(isAdmin, {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      return new Response("Bad Request", {
        status: 400,
        headers: corsHeaders,
      });
    }
  },
};
