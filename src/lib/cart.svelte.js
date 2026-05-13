// src/lib/cart.svelte.js
export const cart = $state({
	items: [],
	get total() {
		return this.items.reduce((sum, item) => sum + item.price, 0);
	},
	get count() {
		return this.items.length;
	},
	addItem(product) {
		this.items.push({
			...product,
			orderId: Math.random().toString(36).substr(2, 9)
		});
	},
	removeItem(orderId) {
		this.items = this.items.filter(item => item.orderId !== orderId);
	},
	clear() {
		this.items = [];
	}
});
