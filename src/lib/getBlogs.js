import blogs from "./content/blogs.json";

export function getBlogs() {
	let result = [];

	for (const blog of blogs) {

		result.push({
			...blog,
		});
	}

	return result;
};

export async function getBlog(file) {
	let content = await import(`./content/blog/${file}.json`)

	let blog = blogs.find((blog) => blog.slug === file);

	return {
		...blog,
		content,
	}
}