<script>
	import { cart } from "$lib/cart.svelte.js";
	import { fade, fly } from "svelte/transition";
	import { goto } from "$app/navigation";

	let showAddressError = $state(false);

	function handleConfirm() {
		if (!cart.address.trim()) {
			showAddressError = true;
			return;
		}
		showAddressError = false;
		cart.confirmOrder();
		goto("/confirmed");
	}
</script>

<svelte:head>
	<title>Your Basket | Countryside Sips</title>
</svelte:head>

<div class="max-w-4xl mx-auto my-12 px-4 space-y-8">
	<!-- Current Basket Section -->
	<div class="glass-card p-10">
		<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-soft-sage/20 pb-8">
			<h1 class="text-4xl font-black text-earth-brown flex items-center gap-4">
				<span class="text-rustic-terracotta">🧺</span> Your Countryside Basket
			</h1>
			<a href="/confirmed" class="text-soft-sage font-bold hover:text-rustic-terracotta transition-colors flex items-center gap-2">
				<span>📜</span> View Past Orders
			</a>
		</div>

		{#if cart.items.length === 0}
			<div class="text-center py-20" in:fade>
				<p class="text-2xl font-bold text-earth-brown/40 mb-8">
					Your basket is empty...
				</p>
				<a href="/product" class="btn-primary inline-block"> Browse Menu </a>
			</div>
		{:else}
			<div class="space-y-6 mb-12">
				{#each cart.items as item (item.orderId)}
					<div
						class="flex items-center gap-6 p-4 rounded-2xl hover:bg-soft-sage/5 transition-colors group"
						in:fly={{ y: 20, duration: 500 }}
					>
						<img
							src={item.imgSrc}
							alt={item.imgAlt}
							class="w-24 h-24 object-cover rounded-xl shadow-sm"
						/>

						<div class="grow">
							<h3 class="text-xl font-bold text-earth-brown">{item.name}</h3>
							<p
								class="text-sm text-soft-sage font-black uppercase tracking-widest"
							>
								{item.category}
							</p>
						</div>

						<div class="text-right">
							<p class="text-2xl font-black text-rustic-terracotta">
								฿{item.price}
							</p>
							<button
								onclick={() => cart.removeItem(item.orderId)}
								class="cursor-pointer text-xs font-bold text-red-400 hover:text-red-600 transition-colors mt-1 opacity-0 group-hover:opacity-100"
							>
								Remove
							</button>
						</div>
					</div>
				{/each}
			</div>

			<div class="space-y-8">
				<!-- Address Input -->
				<div
					class="bg-white/40 p-8 rounded-3xl border-2 {showAddressError
						? 'border-red-300'
						: 'border-soft-sage/20'} transition-colors"
				>
					<label
						for="address"
						class="block text-sm font-black text-earth-brown uppercase tracking-widest mb-4 flex items-center gap-2"
					>
						<span class="text-rustic-terracotta">📍</span> Delivery Address
					</label>
					<textarea
						id="address"
						bind:value={cart.address}
						placeholder="Where should we send your countryside sips? (e.g., The Blue House under the big oak tree)"
						class="w-full bg-white/60 border-none rounded-2xl p-4 text-earth-brown placeholder:text-soft-sage/50 focus:ring-2 focus:ring-rustic-terracotta/20 transition-all resize-none h-24 font-medium"
					></textarea>
					{#if showAddressError}
						<p class="text-red-500 text-xs font-bold mt-2" transition:fade>
							Please provide a delivery address
						</p>
					{/if}
				</div>

				<div class="bg-soft-sage/10 p-8 rounded-3xl border border-soft-sage/20">
					<div class="flex justify-between items-center mb-8">
						<span class="text-xl font-bold text-earth-brown">Order Total</span>
						<span class="text-4xl font-black text-rustic-terracotta"
							>฿{cart.total}</span
						>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<button
							onclick={handleConfirm}
							class="cursor-pointer bg-rustic-terracotta text-white py-4 rounded-2xl text-lg font-bold hover:bg-earth-brown transition-all shadow-xl shadow-rustic-terracotta/20"
						>
							Confirm Order
						</button>
						<a
							href="/product"
							class="flex items-center justify-center bg-white text-soft-sage border-2 border-soft-sage/20 py-4 rounded-2xl text-lg font-bold hover:bg-soft-sage hover:text-white transition-all"
						>
							Add More Items
						</a>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>

