export default {
  async fetch(request, env) {
    // Zaraz sends the context (including page's JS variables like window.IsAdmin)
    // as a POST request body to Workers configured as Zaraz variables.
    const { client } = await request.json(); 

    // Access the IsAdmin variable that your WordPress site outputs.
    const isAdminValue = client.IsAdmin; 

    // Return the boolean value back to Zaraz.
    return new Response(JSON.stringify(isAdminValue), {
      headers: { 'content-type': 'application/json' },
    });
  },
};
