<script>
	import "../app.css";
	import { cart } from "$lib/cart.svelte.js";

	let { data, children } = $props();

	let navs = [
		{ path: "/about", text: "About" },
		{ path: "/product", text: "Product" },
		{ path: "/confirmed", text: "My Orders" },
	];
</script>

<svelte:head></svelte:head>

<div class="flex flex-wrap justify-between glass-card m-4 px-6 py-2">
	<div class="py-3 px-4">
		<a
			class="transition duration-500 text-2xl font-bold {data.pathname == '/'
				? 'text-rustic-terracotta'
				: 'hover:text-rustic-terracotta'}"
			href="/"
		>
			{data.siteName}
		</a>
	</div>
	<div class="py-3 px-4 flex flex-wrap gap-6 items-center">
		{#each navs as item}
			<a
				class="transition duration-500 text-lg font-medium {data.pathname.startsWith(
					item.path,
				)
					? 'text-rustic-terracotta border-b-2 border-rustic-terracotta'
					: 'hover:text-soft-sage'}"
				href={item.path}
			>
				{item.text}
			</a>
		{/each}
		<a
			href="/basket"
			class="flex items-center gap-2 bg-soft-sage text-white px-4 py-2 rounded-full font-bold hover:bg-rustic-terracotta transition-all shadow-md shadow-soft-sage/20"
		>
			<span>🧺</span>
			<span>Basket</span>
			{#if cart.count > 0}
				<span
					class="bg-white text-rustic-terracotta px-2 py-0.5 rounded-full text-xs animate-bounce"
				>
					{cart.count}
				</span>
			{/if}
		</a>
	</div>
</div>

<div class="px-4 max-w-7xl mx-auto">
	{@render children()}
</div>

<div class="my-8 mr-4 ml-auto glass-card w-fit p-1">
	<p class="py-3 px-6 text-sm italic opacity-80">
		<span class="font-medium">
			Made with ♡ by Ai, <a
				class="text-amber-800 underline"
				target="_blank"
				href="https://github.com/zummon"
			>
				Teerapat Anantarattanachai
			</a>
			<br />
			Something breaks, needs upgrade. Let me know
		</span>
	</p>
</div>
