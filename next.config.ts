const API_URL = process.env.NEXT_PUBLIC_API_KEY

/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:path*',
        destination: `${API_URL}api/:path*`, 
			},
		]
	},
}

module.exports = nextConfig