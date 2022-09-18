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
						{ maxAge: 2592000, includeSubDomains: true },
					],
					xssProtection: "sanitize",
					// referrerPolicy: "same-origin",
				}),
			},
		];
	},
	images: {
		minimumCacheTTL: 1400,
		domains: [
			"unb-dev.s3.ap-southeast-1.amazonaws.com",
			"unbelievable-webapp.s3.ap-southeast-1.amazonaws.com",
			"unbelievable-webapp.s3.amazonaws.com",
			"i.ytimg.com",
			"video.cdninstagram.com",
			"scontent.cdninstagram.com",
		],
	},
};
