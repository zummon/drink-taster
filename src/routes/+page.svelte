<script>
	import { cart } from "$lib/cart.svelte.js";
	import { goto } from "$app/navigation";
	let { data } = $props();

	import { products, categories } from "$lib/db.js";

	// 1. Define reactive variables using Svelte 5 $state
	let drinkType = $state(categories[0]);
	let temperature = $state("Cold");
	let sweetnessLevel = $state(50); // Represented as a percentage
	let creamScoops = $state(1);
	let iceLevel = $state("Normal");

	// 2. Automatically calculate total price using $derived
	let totalPrice = $derived.by(() => {
		// Find the first product in the category to get a base price (or use a default)
		const categoryProducts = products.filter(p => p.category === drinkType);
		let price = categoryProducts.length > 0 ? categoryProducts[0].price : 50;

		// Cold drinks and Frappes might cost more
		if (temperature === "Cold") price += 5;
		if (temperature === "Frappe") price += 15;

		// Add cost for extra ingredients (e.g., 5 per cream scoop)
		price += creamScoops * 5;

		return price;
	});

	// 3. Generate health recommendations using $derived
	let healthMessage = $derived.by(() => {
		if (sweetnessLevel >= 120) {
			return {
				text: "Whoa, that's very sweet! Consider lowering the sugar for your health.",
				color: "text-red-500",
			};
		}
		if (creamScoops > 3) {
			return {
				text: "Extra creamy! Just a heads up, this adds a lot of extra calories.",
				color: "text-orange-500",
			};
		}
		if (sweetnessLevel <= 25 && creamScoops <= 1) {
			return {
				text: "Low sugar and light cream! Great, healthy choice.",
				color: "text-green-600",
			};
		}
		return {
			text: "Looks like a perfectly balanced drink!",
			color: "text-blue-600",
		};
	});

	function addToCart() {
		const customDrink = {
			name: `Custom ${drinkType} (${temperature})`,
			category: drinkType,
			price: totalPrice,
			imgSrc: products.find(p => p.category === drinkType)?.imgSrc || "https://i.imgur.com/e2qFUQa.jpeg",
			imgAlt: "Custom Drink"
		};
		cart.addItem(customDrink);
		goto("/ordered");
	}
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content={data.description} />
</svelte:head>

<div
	class="glass-card max-w-3xl mx-auto p-8 mb-8 text-center"
>
	<h1 class="text-4xl font-bold mb-4 text-rustic-terracotta">{data.title}</h1>
	<p class="text-xl font-medium text-earth-brown/80">{data.description}</p>
</div>

<div
	class="max-w-md mx-auto mt-10 p-8 glass-card border-none"
>
	<h1 class="text-2xl font-bold text-earth-brown mb-8 border-b border-soft-sage/20 pb-4">
		Craft Your Perfect Brew
	</h1>

	<!-- Drink Type Selection -->
	<div class="mb-6">
		<label class="block text-sm font-semibold text-earth-brown/70 mb-2" for="drinkType"
			>Select Your Base</label
		>
		<select
			id="drinkType"
			bind:value={drinkType}
			class="input-field"
		>
			{#each categories as category}
				<option value={category}>{category}</option>
			{/each}
		</select>
	</div>

	<!-- Temperature Selection -->
	<div class="mb-6">
		<label class="block text-sm font-semibold text-earth-brown/70 mb-2" for="temp"
			>Temperature</label
		>
		<select
			id="temp"
			bind:value={temperature}
			class="input-field"
		>
			<option value="Hot">🔥 Hot</option>
			<option value="Cold">❄️ Cold (+฿5)</option>
			<option value="Frappe">🌪️ Frappe (+฿15)</option>
		</select>
	</div>

	<!-- Sweetness Slider -->
	<div class="mb-6">
		<label class="block text-sm font-semibold text-earth-brown/70 mb-2" for="sweetness">
			Sweetness Level: <span class="text-rustic-terracotta font-bold">{sweetnessLevel}%</span>
		</label>
		<input
			id="sweetness"
			type="range"
			min="0"
			max="150"
			step="25"
			bind:value={sweetnessLevel}
			class="w-full h-2 bg-soft-sage/20 rounded-lg appearance-none cursor-pointer accent-soft-sage"
		/>
	</div>

	<!-- Cream Counter -->
	<div class="mb-6">
		<label class="block text-sm font-semibold text-earth-brown/70 mb-2" for="cream">
			Cream Scoops: <span class="text-rustic-terracotta font-bold">{creamScoops}</span>
		</label>
		<input
			id="cream"
			type="range"
			min="0"
			max="5"
			step="1"
			bind:value={creamScoops}
			class="w-full h-2 bg-soft-sage/20 rounded-lg appearance-none cursor-pointer accent-soft-sage"
		/>
	</div>

	<!-- Ice Level (Only show if not hot) -->
	{#if temperature !== "Hot"}
		<div class="mb-8">
			<label class="block text-sm font-semibold text-earth-brown/70 mb-2" for="ice"
				>Ice Level</label
			>
			<select
				id="ice"
				bind:value={iceLevel}
				class="input-field"
			>
				<option value="Less">🧊 Less Ice</option>
				<option value="Normal">🧊 Normal Ice</option>
				<option value="Extra">🧊 Extra Ice</option>
			</select>
		</div>
	{/if}

	<!-- Health Recommendation Feedback -->
	<div
		class="mb-8 p-4 rounded-xl bg-white/40 border border-soft-sage/10 text-sm italic {healthMessage.color}"
	>
		<p class="flex items-center gap-2">
			<span>✨</span> {healthMessage.text}
		</p>
	</div>

	<!-- Price Calculation -->
	<div
		class="flex justify-between items-center bg-soft-sage/10 p-5 rounded-2xl border border-soft-sage/20 shadow-inner mb-6"
	>
		<span class="text-lg font-bold text-earth-brown">Total Price</span>
		<span class="text-3xl font-black text-rustic-terracotta drop-shadow-sm">฿{totalPrice}</span>
	</div>

	<button 
		onclick={addToCart}
		class="w-full bg-rustic-terracotta text-white py-4 rounded-2xl text-lg font-bold hover:bg-earth-brown transition-all shadow-xl shadow-rustic-terracotta/20 active:scale-95"
	>
		Add to Order
	</button>
</div>
