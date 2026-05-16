<script>
	import { cart } from "$lib/cart.svelte.js";
	import { goto } from "$app/navigation";
	let { data } = $props();

	function handleOrderNow(product) {
		cart.addItem(product);
		goto("/basket");
	}
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
	{#each data.products as item}
		<a
			href="/product/{item.id}"
			class="glass-card p-6 group flex flex-col transition-all hover:-translate-y-2"
		>
			<div class="overflow-hidden rounded-2xl mb-6 shadow-md">
				<img
					class="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-110"
					src={item.imgSrc}
					alt={item.imgAlt}
				/>
			</div>
			<div class="grow">
				<div class="flex justify-between items-start mb-2">
					<h3 class="text-xl font-bold text-earth-brown">{item.name}</h3>
					<span
						class="bg-soft-sage/10 text-soft-sage text-xs font-black px-2 py-1 rounded-full uppercase tracking-widest"
						>{item.category}</span
					>
				</div>
				<p
					class="text-sm text-earth-brown/60 leading-relaxed mb-6 line-clamp-2"
				>
					{item.description}
				</p>
			</div>
			<div
				class="flex items-center justify-between mt-auto pt-6 border-t border-soft-sage/10"
			>
				<span class="text-2xl font-black text-rustic-terracotta"
					>฿{item.price}</span
				>
				<button
					onclick={(e) => {
						e.preventDefault();
						handleOrderNow(item);
					}}
					class="cursor-pointer bg-soft-sage text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-rustic-terracotta transition-colors shadow-lg shadow-soft-sage/20 relative z-10"
				>
					Select
				</button>
			</div>
		</a>
	{/each}
</div>
