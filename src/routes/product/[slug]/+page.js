import { products } from "$lib/db.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
	const product = products.find(p => p.id === params.slug);
	
	if (!product) {
		throw error(404, 'Product not found');
	}
	
	return { product };
}