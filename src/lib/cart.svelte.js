// src/lib/cart.svelte.js
export const cart = $state({
	items: [],
	address: "",
	orders: [],
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
	},
	confirmOrder() {
		if (this.items.length === 0) return;
		
		const newOrder = {
			id: Math.random().toString(36).substr(2, 9),
			items: [...this.items],
			total: this.total,
			address: this.address,
			status: "pending", // pending, preparing, wait for delivery, done
			timestamp: new Date().toISOString()
		};
		
		this.orders.push(newOrder);
		this.items = [];
		// Simulate status changes for demo purposes if needed, 
		// but let's stick to the core requirements first.
	},
	cancelOrder(orderId) {
		const order = this.orders.find(o => o.id === orderId);
		if (order && order.status === "pending") {
			this.orders = this.orders.filter(o => o.id !== orderId);
		}
	}
});

