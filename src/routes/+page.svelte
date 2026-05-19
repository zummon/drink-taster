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
		const categoryProducts = products.filter((p) => p.category === drinkType);
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

	let drinkColor = $derived(
		drinkType === "Coffee"
			? "#4A2C11"
			: drinkType === "Cocoa"
				? "#3D2314"
				: drinkType === "Tea"
					? "#8B9A46"
					: "#D2B48C",
	);

	let drinkColorLighter = $derived(
		drinkType === "Coffee"
			? "#623A17"
			: drinkType === "Cocoa"
				? "#502E1B"
				: drinkType === "Tea"
					? "#A1B058"
					: "#E6C2A0",
	);

	function handleOrderNow() {
		const customDrink = {
			name: `Custom ${drinkType} (${temperature})`,
			category: drinkType,
			price: totalPrice,
			imgSrc:
				products.find((p) => p.category === drinkType)?.imgSrc ||
				"https://i.imgur.com/e2qFUQa.jpeg",
			imgAlt: "Custom Drink",
		};
		cart.addItem(customDrink);
		goto("/basket");
	}
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content={data.description} />
</svelte:head>

<div class="glass-card max-w-3xl mx-auto p-8 mb-8 text-center">
	<h1 class="text-4xl font-bold mb-4 text-rustic-terracotta">{data.title}</h1>
	<p class="text-xl font-medium text-earth-brown/80">{data.description}</p>
</div>

<div
	class="max-w-5xl mx-auto mt-10 flex flex-col-reverse lg:flex-row gap-8 items-center lg:items-start justify-center"
>
	<!-- Visual Section (Left) -->
	<div
		class="lg:sticky lg:top-8 w-full max-w-md glass-card p-8 flex flex-col items-center justify-center text-center overflow-hidden"
	>
		<h2 class="text-2xl font-bold text-earth-brown mb-6">Your Drink Preview</h2>

		<div class="relative w-64 h-80 flex items-center justify-center">
			<svg
				viewBox="0 0 200 300"
				class="w-full h-full drop-shadow-xl transition-all duration-500"
			>
				<!-- Steam for Hot -->
				{#if temperature === "Hot"}
					<path
						d="M70,80 Q60,40 70,10"
						stroke="#cbd5e1"
						stroke-width="4"
						fill="none"
						class="animate-pulse"
						opacity="0.6"
					/>
					<path
						d="M100,80 Q90,40 100,10"
						stroke="#cbd5e1"
						stroke-width="5"
						fill="none"
						class="animate-pulse"
						style="animation-delay: 200ms;"
						opacity="0.7"
					/>
					<path
						d="M130,80 Q120,40 130,10"
						stroke="#cbd5e1"
						stroke-width="4"
						fill="none"
						class="animate-pulse"
						style="animation-delay: 400ms;"
						opacity="0.6"
					/>
				{/if}

				<!-- Straw for Cold/Frappe -->
				{#if temperature !== "Hot"}
					<line
						x1="100"
						y1="200"
						x2="140"
						y2="20"
						stroke="#8A9A5B"
						stroke-width="12"
						stroke-linecap="round"
					/>
				{/if}

				<!-- Back of cup rim -->
				<ellipse
					cx="100"
					cy="90"
					rx="60"
					ry="15"
					fill="rgba(255,255,255,0.4)"
				/>

				<!-- Liquid -->
				<path
					d="M45,100 L55,240 Q100,255 145,240 L155,100 Z"
					fill={drinkColor}
					class="transition-colors duration-500"
				/>

				<!-- Top surface of liquid -->
				<ellipse
					cx="100"
					cy="100"
					rx="55"
					ry="14"
					fill={drinkColorLighter}
					class="transition-colors duration-500"
				/>

				<!-- Ice Cubes for Cold/Frappe -->
				{#if temperature !== "Hot"}
					{#if iceLevel === "Less" || iceLevel === "Normal" || iceLevel === "Extra"}
						<rect
							x="70"
							y="150"
							width="20"
							height="20"
							rx="4"
							fill="rgba(255,255,255,0.5)"
							transform="rotate(15, 80, 160)"
						/>
						<rect
							x="110"
							y="180"
							width="20"
							height="20"
							rx="4"
							fill="rgba(255,255,255,0.5)"
							transform="rotate(-10, 120, 190)"
						/>
					{/if}
					{#if iceLevel === "Normal" || iceLevel === "Extra"}
						<rect
							x="90"
							y="120"
							width="25"
							height="25"
							rx="4"
							fill="rgba(255,255,255,0.6)"
							transform="rotate(25, 102, 132)"
						/>
						<rect
							x="60"
							y="200"
							width="18"
							height="18"
							rx="4"
							fill="rgba(255,255,255,0.5)"
							transform="rotate(-5, 69, 209)"
						/>
					{/if}
					{#if iceLevel === "Extra"}
						<rect
							x="120"
							y="140"
							width="22"
							height="22"
							rx="4"
							fill="rgba(255,255,255,0.6)"
							transform="rotate(45, 131, 151)"
						/>
						<rect
							x="100"
							y="210"
							width="20"
							height="20"
							rx="4"
							fill="rgba(255,255,255,0.5)"
							transform="rotate(12, 110, 220)"
						/>
					{/if}
				{/if}

				<!-- Frappe dome -->
				{#if temperature === "Frappe"}
					<path
						d="M40,90 Q100,0 160,90 Z"
						fill="rgba(255,255,255,0.85)"
						opacity="0.9"
					/>
				{/if}

				<!-- Cream Scoops -->
				{#if creamScoops > 0 && temperature !== "Frappe"}
					<g transform="translate(0, -5)">
						{#each Array(creamScoops) as _, i}
							<circle
								cx={100 + (i - (creamScoops - 1) / 2) * 20}
								cy={95 - Math.sin(i) * 10}
								r="16"
								fill="#FFFDD0"
								opacity="0.95"
							/>
						{/each}
					</g>
				{/if}

				<!-- Cream on top of Frappe -->
				{#if creamScoops > 0 && temperature === "Frappe"}
					<g transform="translate(0, -35)">
						{#each Array(creamScoops) as _, i}
							<circle
								cx={100 + (i - (creamScoops - 1) / 2) * 15}
								cy={75 - Math.sin(i) * 10}
								r="14"
								fill="#FFFDD0"
								opacity="0.95"
							/>
						{/each}
					</g>
				{/if}

				<!-- Cup Body (Glassy effect) -->
				<path
					d="M40,90 L50,250 Q100,270 150,250 L160,90 Z"
					fill="rgba(255, 255, 255, 0.1)"
					stroke="rgba(255,255,255,0.8)"
					stroke-width="4"
				/>
				<ellipse
					cx="100"
					cy="90"
					rx="60"
					ry="15"
					fill="none"
					stroke="rgba(255,255,255,0.8)"
					stroke-width="4"
				/>

				<!-- Cup Bottom rim -->
				<path
					d="M50,250 Q100,270 150,250"
					fill="none"
					stroke="rgba(255,255,255,0.8)"
					stroke-width="4"
				/>

				<!-- Shine / Reflection -->
				<path
					d="M48,110 L56,230"
					stroke="rgba(255,255,255,0.6)"
					stroke-width="6"
					stroke-linecap="round"
				/>
				<path
					d="M56,110 L60,150"
					stroke="rgba(255,255,255,0.4)"
					stroke-width="4"
					stroke-linecap="round"
				/>
			</svg>
		</div>

		<div class="mt-8 flex flex-col gap-3 w-full">
			<div
				class="flex justify-between items-center text-sm font-semibold text-earth-brown/80 bg-soft-sage/10 p-3 rounded-xl border border-soft-sage/20"
			>
				<span>Base:</span>
				<span class="text-rustic-terracotta text-base">{drinkType}</span>
			</div>
			<div
				class="flex justify-between items-center text-sm font-semibold text-earth-brown/80 bg-soft-sage/10 p-3 rounded-xl border border-soft-sage/20"
			>
				<span>Temp:</span>
				<span class="text-rustic-terracotta text-base">{temperature}</span>
			</div>
			<div
				class="flex justify-between items-center text-sm font-semibold text-earth-brown/80 bg-soft-sage/10 p-3 rounded-xl border border-soft-sage/20"
			>
				<span>Sweetness:</span>
				<span class="text-rustic-terracotta text-base">{sweetnessLevel}%</span>
			</div>
			{#if creamScoops > 0}
				<div
					class="flex justify-between items-center text-sm font-semibold text-earth-brown/80 bg-soft-sage/10 p-3 rounded-xl border border-soft-sage/20"
				>
					<span>Cream:</span>
					<span class="text-rustic-terracotta text-base"
						>{creamScoops} Scoops</span
					>
				</div>
			{/if}
			{#if temperature !== "Hot"}
				<div
					class="flex justify-between items-center text-sm font-semibold text-earth-brown/80 bg-soft-sage/10 p-3 rounded-xl border border-soft-sage/20"
				>
					<span>Ice:</span>
					<span class="text-rustic-terracotta text-base">{iceLevel}</span>
				</div>
			{/if}
		</div>
	</div>

	<!-- Form Section (Right) -->
	<div class="w-full max-w-md p-8 glass-card border-none">
		<h1
			class="text-2xl font-bold text-earth-brown mb-8 border-b border-soft-sage/20 pb-4"
		>
			Craft Your Perfect Brew
		</h1>

		<!-- Drink Type Selection -->
		<div class="mb-6">
			<label
				class="block text-sm font-semibold text-earth-brown/70 mb-2"
				for="drinkType">Select Your Base</label
			>
			<select id="drinkType" bind:value={drinkType} class="input-field">
				{#each categories as category}
					<option value={category}>{category}</option>
				{/each}
			</select>
		</div>

		<!-- Temperature Selection -->
		<div class="mb-6">
			<label
				class="block text-sm font-semibold text-earth-brown/70 mb-2"
				for="temp">Temperature</label
			>
			<select id="temp" bind:value={temperature} class="input-field">
				<option value="Hot">🔥 Hot</option>
				<option value="Cold">❄️ Cold (+฿5)</option>
				<option value="Frappe">🌪️ Frappe (+฿15)</option>
			</select>
		</div>

		<!-- Sweetness Slider -->
		<div class="mb-6">
			<label
				class="block text-sm font-semibold text-earth-brown/70 mb-2"
				for="sweetness"
			>
				Sweetness Level: <span class="text-rustic-terracotta font-bold"
					>{sweetnessLevel}%</span
				>
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
			<label
				class="block text-sm font-semibold text-earth-brown/70 mb-2"
				for="cream"
			>
				Cream Scoops: <span class="text-rustic-terracotta font-bold"
					>{creamScoops}</span
				>
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
				<label
					class="block text-sm font-semibold text-earth-brown/70 mb-2"
					for="ice">Ice Level</label
				>
				<select id="ice" bind:value={iceLevel} class="input-field">
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
				<span>✨</span>
				{healthMessage.text}
			</p>
		</div>

		<!-- Price Calculation -->
		<div
			class="flex justify-between items-center bg-soft-sage/10 p-5 rounded-2xl border border-soft-sage/20 shadow-inner mb-6"
		>
			<span class="text-lg font-bold text-earth-brown">Total Price</span>
			<span class="text-3xl font-black text-rustic-terracotta drop-shadow-sm"
				>฿{totalPrice}</span
			>
		</div>

		<button
			onclick={handleOrderNow}
			class="cursor-pointer w-full bg-rustic-terracotta text-white py-4 rounded-2xl text-lg font-bold hover:bg-earth-brown transition-all shadow-xl shadow-rustic-terracotta/20 active:scale-95"
		>
			Add to Basket
		</button>
	</div>
</div>
