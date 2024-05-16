/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			// home screen redirect
			{
				source: "/",
				destination: "/pr-stats/author",
				permanent: true,
			},
		];
	},
	images: {
		domains: ["avatars.githubusercontent.com", "github.com"],
	},
};

module.exports = nextConfig;
