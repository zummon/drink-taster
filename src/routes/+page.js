import { getBlogs } from "../lib/getBlogs";

export const prerender = true;

export async function load() {

	return {
		title: 'Home. Lorem ipsum dolor sit.',
		description:
			'Libero error reprehenderit, expedita enim, praesentium animi natus modi odio ipsam nemo, quisquam voluptates? Ipsum voluptas necessitatibus culpa. Accusamus eveniet eaque cum.',
		blogs: (getBlogs()).slice(0, 2),
	}
}