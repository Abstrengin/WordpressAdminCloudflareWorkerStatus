export default {
  async fetch(request, env) {
    const { client } = await request.json(); 
    const isAdminValue = client.IsAdmin; 

    return new Response(JSON.stringify(isAdminValue), {
      headers: { 'content-type': 'application/json' },
    });
  },
};
