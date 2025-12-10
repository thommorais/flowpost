import type { MetadataRoute } from 'next'
import { meta } from './meta'

const sizes = [128, 192, 256, 384, 512]

const icons = sizes
	.filter(e => e !== sizes[0])
	.map(size => ({
		src: `/icons/favicon-${size}x${size}.png`,
		sizes: `${size}x${size}`,
		type: 'image/png',
	}))

const theme_color = '#060E0B'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: meta.name,
		short_name: meta.name,
		description: meta.description,
		start_url: './',
		scope: '.',
		display: 'standalone',
		background_color: theme_color,
		theme_color: theme_color,
		icons: [
			{
				purpose: 'maskable',
				sizes: '1024x1024',
				src: '/icons/maskable_icon.png',
				type: 'image/png',
			},
			{
				src: '/icons/icon.svg',
				sizes: 'any',
			},
			...icons,
		],
	}
}
