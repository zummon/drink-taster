import { products } from "$lib/db.js";

export async function load({}) {
	return { products };
}