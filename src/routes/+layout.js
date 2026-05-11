export async function load({ url }) {
	return {
		siteName: 'Drink Taster',
		pathname: url.pathname
	}
}