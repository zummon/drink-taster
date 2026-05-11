import { getBlog } from "../../../lib/getBlogs";

export const prerender = true;

export function load({ params }) {
	let md = getBlog(params.slug);

	return {
		...md,
	};
}