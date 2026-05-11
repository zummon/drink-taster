<script>
	let { data } = $props();

	// 1. Define reactive variables using Svelte 5 $state
	let drinkType = $state("Cocoa");
	let temperature = $state("Cold");
	let sweetnessLevel = $state(50); // Represented as a percentage
	let creamScoops = $state(1);
	let iceLevel = $state("Normal");

	// Base prices for the drinks
	const basePrices = {
		Coffee: 60,
		Cocoa: 65,
		Tea: 50,
	};

	// 2. Automatically calculate total price using $derived
	let totalPrice = $derived.by(() => {
		let price = basePrices[drinkType] || 50;

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
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content={data.description} />
</svelte:head>

<div
	class="bg-white bg-opacity-75 hover:bg-opacity-100 transition duration-500 rounded-lg max-w-3xl mx-auto p-4 mb-4 text-center"
>
	<h1 class="text-3xl font-semibold mb-6">{data.title}</h1>
	<p class="text-xl font-medium mb-4">{data.description}</p>
</div>

<div
	class="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 font-sans"
>
	<h1 class="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
		Customize Your Drink
	</h1>

	<!-- Drink Type Selection -->
	<div class="mb-4">
		<label class="block text-sm font-medium text-gray-700 mb-1" for="drinkType"
			>Drink Type</label
		>
		<select
			id="drinkType"
			bind:value={drinkType}
			class="w-full border-gray-300 rounded-lg shadow-sm p-2 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
		>
			<option value="Coffee">Coffee</option>
			<option value="Cocoa">Cocoa</option>
			<option value="Tea">Tea</option>
		</select>
	</div>

	<!-- Temperature Selection -->
	<div class="mb-4">
		<label class="block text-sm font-medium text-gray-700 mb-1" for="temp"
			>Temperature</label
		>
		<select
			id="temp"
			bind:value={temperature}
			class="w-full border-gray-300 rounded-lg shadow-sm p-2 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
		>
			<option value="Hot">Hot</option>
			<option value="Cold">Cold (+5)</option>
			<option value="Frappe">Frappe (+15)</option>
		</select>
	</div>

	<!-- Sweetness Slider -->
	<div class="mb-4">
		<label class="block text-sm font-medium text-gray-700 mb-1" for="sweetness">
			Sweetness: {sweetnessLevel}%
		</label>
		<input
			id="sweetness"
			type="range"
			min="0"
			max="150"
			step="25"
			bind:value={sweetnessLevel}
			class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
		/>
	</div>

	<!-- Cream Counter -->
	<div class="mb-4">
		<label class="block text-sm font-medium text-gray-700 mb-1" for="cream">
			Cream (Scoops): {creamScoops}
		</label>
		<input
			id="cream"
			type="range"
			min="0"
			max="5"
			step="1"
			bind:value={creamScoops}
			class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
		/>
	</div>

	<!-- Ice Level (Only show if not hot) -->
	{#if temperature !== "Hot"}
		<div class="mb-6">
			<label class="block text-sm font-medium text-gray-700 mb-1" for="ice"
				>Ice Level</label
			>
			<select
				id="ice"
				bind:value={iceLevel}
				class="w-full border-gray-300 rounded-lg shadow-sm p-2 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
			>
				<option value="Less">Less Ice</option>
				<option value="Normal">Normal Ice</option>
				<option value="Extra">Extra Ice</option>
			</select>
		</div>
	{/if}

	<!-- Health Recommendation Feedback -->
	<div
		class="mb-6 p-3 rounded-lg bg-gray-50 border border-gray-100 text-sm {healthMessage.color}"
	>
		<p>{healthMessage.text}</p>
	</div>

	<!-- Price Calculation -->
	<div
		class="flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100"
	>
		<span class="text-lg font-semibold text-gray-800">Total Price:</span>
		<span class="text-2xl font-bold text-blue-600 font-mono">฿{totalPrice}</span
		>
	</div>

	<!-- Project Footer -->
	<footer class="mt-8 text-center text-xs text-gray-400">
		Made by Teerapat Anantarattanachai with help from Claude.ai.
	</footer>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
	{#each data.blogs as item}
		<div
			class="bg-white bg-opacity-75 hover:bg-opacity-100 transition duration-500 rounded-lg"
		>
			<img
				class="rounded-t-lg aspect-video object-cover"
				src={item.cover.src}
				alt={item.cover.alt}
			/>
			<h2 class="text-2xl pt-4 px-4 font-medium">{item.title}</h2>
			<p class="italic my-2 px-4 ml-2">
				<span class="">
					{new Date(item.date).toLocaleDateString(undefined, {
						day: "numeric",
						month: "short",
						year: "numeric",
					})}
				</span>
				{#each item.tags as itemSec}
					<a class="underline" href="/#">
						{itemSec}
					</a>
				{/each}
			</p>
			<p class="text-lg px-4 ml-4">{item.description}</p>
			<a
				class="text-lg px-4 pb-4 italic flex items-center justify-end"
				href="/blog/{item.slug}"
			>
				<span class="font-medium">Read </span>
				<span class="">
					<!-- https://feathericons.com/ chevrons-right -->
					<svg
						class=""
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><polyline points="13 17 18 12 13 7"></polyline><polyline
							points="6 17 11 12 6 7"
						></polyline></svg
					>
				</span>
			</a>
		</div>
	{/each}
</div>
