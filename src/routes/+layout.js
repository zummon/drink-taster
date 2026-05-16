export const prerender = true;

export async function load({ url }) {
	return {
		siteName: 'Countryside Sips',
		pathname: url.pathname
	}
}