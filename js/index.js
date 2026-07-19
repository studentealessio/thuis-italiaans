// ─────────────────────────────────────────────────────────────
//  Cloudflare Web Analytics — beacon injector
//  Serves static assets from the repo and injects the CF Web
//  Analytics beacon into every HTML response, right before </body>.
//  No need to touch the 700+ HTML files individually.
// ─────────────────────────────────────────────────────────────

const CF_BEACON_SNIPPET = `<!-- Cloudflare Web Analytics --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "263e866dd6a24216999ef6625771d40a"}'></script><!-- End Cloudflare Web Analytics -->`;

class BeaconInjector {
	element(element) {
		element.append(CF_BEACON_SNIPPET, { html: true });
	}
}

export default {
	async fetch(request, env, ctx) {
		// Delegate to the static assets binding
		const response = await env.ASSETS.fetch(request);

		// Only transform HTML responses
		const contentType = response.headers.get("content-type") || "";
		if (!contentType.includes("text/html")) {
			return response;
		}

		// Inject the beacon just before </body>
		return new HTMLRewriter()
			.on("body", new BeaconInjector())
			.transform(response);
	},
};



