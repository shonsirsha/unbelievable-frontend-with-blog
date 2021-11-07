const { createSecureHeaders } = require("next-secure-headers");

module.exports = {
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: createSecureHeaders({
					contentSecurityPolicy: {
						directives: {
							frameAncestors: [
								"self",
								"https://checkout-staging.xendit.com",
								"https://checkout.xendit.com",
							],
						},
					},
					frameGuard: false,
					forceHTTPSRedirect: [
						true,
						{ maxAge: 60 * 60 * 24 * 7, includeSubDomains: true },
					],
					xssProtection: "sanitize",
					// referrerPolicy: "same-origin",
				}),
			},
		];
	},
};
