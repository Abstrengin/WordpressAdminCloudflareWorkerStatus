export default {
  async fetch(request) {
    // Force a fresh fetch to bypass any caching layers
    const originResponse = await fetch(request, {
      cf: { cacheEverything: false }, // Avoid Cloudflare caching
      headers: request.headers
    });

    const contentType = originResponse.headers.get("Content-Type") || "";

    // Only inject on HTML pages
    if (!contentType.includes("text/html")) {
      return originResponse;
    }

    // Get admin status from origin headers
    const isAdmin = originResponse.headers.get("X-Is-Admin")?.toLowerCase() === "true";

    // Read response body
    const originalBody = await originResponse.text();

    // Inject zarazData with admin info
    const injection = `
<script>
  window.zarazData = window.zarazData || {};
  window.zarazData.client = window.zarazData.client || {};
  window.zarazData.client.IsAdmin = "${isAdmin}";
</script>`;

    // Inject before </head>
    const modifiedBody = originalBody.replace("</head>", `${injection}</head>`);

    // Return modified response
    return new Response(modifiedBody, {
      status: originResponse.status,
      statusText: originResponse.statusText,
      headers: originResponse.headers
    });
  }
}
