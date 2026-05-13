<script>
	import { cart } from "$lib/cart.svelte.js";
	import { goto } from "$app/navigation";
	let { data } = $props();
	const { product } = data;

	function addToCart() {
		cart.addItem(product);
		goto("/ordered");
	}
</script>

<svelte:head>
	<title>{product.name} | Countryside Sips</title>
</svelte:head>

<div class="max-w-5xl mx-auto my-12">
	<div class="glass-card overflow-hidden flex flex-col md:flex-row">
		<!-- Image Section -->
		<div class="md:w-1/2 overflow-hidden">
			<img
				class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
				src={product.imgSrc}
				alt={product.imgAlt}
			/>
		</div>

		<!-- Details Section -->
		<div class="md:w-1/2 p-10 flex flex-col">
			<div class="mb-4">
				<span class="bg-soft-sage/10 text-soft-sage text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
					{product.category}
				</span>
			</div>
			
			<h1 class="text-4xl font-black text-earth-brown mb-4 leading-tight">
				{product.name}
			</h1>
			
			<p class="text-3xl font-black text-rustic-terracotta mb-8">
				฿{product.price}
			</p>
			
			<div class="prose prose-stone mb-10 flex-grow">
				<p class="text-lg text-earth-brown/70 leading-relaxed italic border-l-4 border-soft-sage/30 pl-6">
					{product.description}
				</p>
			</div>
			
			<div class="space-y-4">
				<button 
					onclick={addToCart}
					class="w-full bg-soft-sage text-white py-4 rounded-2xl text-lg font-bold hover:bg-rustic-terracotta transition-all shadow-xl shadow-soft-sage/20 active:scale-95"
				>
					Add to Cart
				</button>
				
				<a href="/product" class="block text-center text-soft-sage font-bold hover:text-rustic-terracotta transition-colors py-2">
					← Back to Menu
				</a>
			</div>
		</div>
	</div>
</div>
