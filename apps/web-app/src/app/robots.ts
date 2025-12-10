import { ENVS } from '_/constants'

export default function robots() {
	return {
		rules: [
			{
				userAgent: '*',
			},
		],
		sitemap: `${ENVS.NEXT_PUBLIC_WEBAPP_URL}/sitemap.xml`,
		host: ENVS.NEXT_PUBLIC_WEBAPP_URL,
	}
}
