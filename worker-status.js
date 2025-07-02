export default {
  async fetch(request, env, ctx) {
    const response = await fetch(request);
    const contentType = response.headers.get("Content-Type") || "";

    // Only modify HTML pages
    if (!contentType.includes("text/html")) {
      return response;
    }

    // Read our custom header set by WordPress
    const isAdminHeader = response.headers.get("X-Is-Admin");
    const isAdmin = isAdminHeader && isAdminHeader.toLowerCase() === "true";

    // Inject zarazData before </head>
    const originalBody = await response.text();
    const injection = `
<script>
  window.zarazData = window.zarazData || {};
  window.zarazData.client = window.zarazData.client || {};
  window.zarazData.client.IsAdmin = "${isAdmin ? 'true' : 'false'}";
</script>`;

    const modifiedBody = originalBody.replace("</head>", `${injection}</head>`);

    return new Response(modifiedBody, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  }
};
