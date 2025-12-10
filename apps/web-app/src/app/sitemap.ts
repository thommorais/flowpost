import { LOCAL_HREFS } from '_/constants'

export default async function sitemap() {
	return [LOCAL_HREFS].map(route => ({
		url: `${route}`,
		lastModified: new Date().toISOString().split('T')[0],
	}))
}
