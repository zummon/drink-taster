<script>
	import { cart } from "$lib/cart.svelte.js";
	import { fade, fly, slide } from "svelte/transition";

	const statusConfig = {
		pending: {
			label: "Pending",
			icon: "⏳",
			color: "text-amber-500",
			bg: "bg-amber-50",
		},
		preparing: {
			label: "Preparing",
			icon: "🍳",
			color: "text-blue-500",
			bg: "bg-blue-50",
		},
		"wait for delivery": {
			label: "Waiting for Delivery",
			icon: "🚚",
			color: "text-purple-500",
			bg: "bg-purple-50",
		},
		done: {
			label: "Completed",
			icon: "✅",
			color: "text-green-500",
			bg: "bg-green-50",
		},
	};
</script>

<svelte:head>
	<title>Confirmed Orders | Countryside Sips</title>
</svelte:head>

<div class="max-w-4xl mx-auto my-12 px-4 space-y-8">
	<div class="glass-card p-10">
		<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-soft-sage/20 pb-8">
			<h1 class="text-4xl font-black text-earth-brown flex items-center gap-4">
				<span class="text-rustic-terracotta">📜</span> Your Orders
			</h1>
			<a href="/product" class="btn-primary">
				Order More
			</a>
		</div>

		{#if cart.orders.length === 0}
			<div class="text-center py-20" in:fade>
				<p class="text-2xl font-bold text-earth-brown/40 mb-8">
					No orders found yet...
				</p>
				<a href="/product" class="text-rustic-terracotta font-black hover:underline"> Start your first order 🧺 </a>
			</div>
		{:else}
			<div class="space-y-6">
				{#each cart.orders as order (order.id)}
					<div
						class="bg-white/50 rounded-3xl p-8 border border-soft-sage/10 shadow-sm space-y-6"
						transition:slide
					>
						<div class="flex flex-col sm:flex-row justify-between items-start gap-4">
							<div>
								<div class="flex items-center gap-3 mb-2">
									<span
										class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider {statusConfig[
											order.status
										].bg} {statusConfig[order.status].color}"
									>
										{statusConfig[order.status].icon}
										{statusConfig[order.status].label}
									</span>
									<span class="text-xs text-soft-sage font-medium"
										>#{order.id}</span
									>
								</div>
								<p class="text-sm text-earth-brown/60">
									Ordered {new Date(order.timestamp).toLocaleString()}
								</p>
							</div>
							<div class="text-left sm:text-right">
								<p class="text-3xl font-black text-rustic-terracotta">
									฿{order.total}
								</p>
								{#if order.status === "pending"}
									<button
										onclick={() => cart.cancelOrder(order.id)}
										class="cursor-pointer text-xs font-bold text-red-400 hover:text-red-600 transition-colors mt-2"
									>
										Cancel Order
									</button>
								{/if}
							</div>
						</div>

						<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div class="space-y-4">
								<p class="text-xs font-black text-soft-sage uppercase tracking-widest">Items</p>
								<div class="flex flex-wrap gap-3">
									{#each order.items as item}
										<div class="relative group">
											<img
												src={item.imgSrc}
												alt={item.name}
												class="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-sm"
											/>
											<div class="absolute -top-2 -right-2 bg-soft-sage text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
												1
											</div>
										</div>
									{/each}
								</div>
							</div>

							<div class="space-y-4">
								<p class="text-xs font-black text-soft-sage uppercase tracking-widest">Delivery To</p>
								<div class="bg-earth-brown/5 p-4 rounded-2xl italic text-earth-brown text-sm border border-earth-brown/5">
									"{order.address}"
								</div>
							</div>
						</div>

						<!-- Demo Status Toggle -->
						<div class="pt-6 border-t border-soft-sage/10">
							<p class="text-[10px] font-bold text-soft-sage/60 uppercase tracking-widest mb-3">Update Status (Demo)</p>
							<div class="flex flex-wrap gap-2">
								{#each Object.keys(statusConfig) as status}
									<button
										onclick={() => (order.status = status)}
										class="cursor-pointer px-3 py-1.5 rounded-lg text-[10px] font-black transition-all uppercase tracking-wider {order.status ===
										status
											? 'bg-earth-brown text-white shadow-lg'
											: 'bg-white text-soft-sage border border-soft-sage/20 hover:bg-soft-sage/5'}"
									>
										{status}
									</button>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	:global(body) {
		background-attachment: fixed;
	}
</style>
