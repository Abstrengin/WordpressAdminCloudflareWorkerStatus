export default {
  async fetch(request) {
    const originResponse = await fetch(request);
    const contentType = originResponse.headers.get("Content-Type") || "";

    if (!contentType.includes("text/html")) {
      return originResponse;
    }

    const body = await originResponse.text();
    const isAdmin = originResponse.headers.get("X-Is-Admin")?.toLowerCase() === "true";

    const injection = `
<script>
  window.zarazData = window.zarazData || {};
  window.zarazData.client = window.zarazData.client || {};
  window.zarazData.client.IsAdmin = "${isAdmin}";
</script>`;

    const modifiedBody = body.replace("</head>", `${injection}</head>`);

    return new Response(modifiedBody, {
      status: originResponse.status,
      statusText: originResponse.statusText,
      headers: originResponse.headers,
    });
  }
}
