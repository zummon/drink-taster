<script>
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content={data.desc} />
</svelte:head>

<img
	class="mx-auto aspect-video object-cover rounded-3xl shadow-lg mb-8"
	src="https://i.imgur.com/oXnUuoO.jpeg"
	alt="About Us"
/>

<div
	class="glass-card max-w-3xl mx-auto p-8 mb-8 text-center"
>
	<h1 class="text-4xl font-bold mb-4 text-rustic-terracotta">{data.title}</h1>
	<p class="text-xl font-medium text-earth-brown/80">{data.desc}</p>
</div>

<div
	class="max-w-3xl mx-auto glass-card p-10 mb-12"
>
	<h2 class="font-bold text-3xl mb-6 text-earth-brown">{data.heading}</h2>
	<blockquote class="font-medium italic border-l-4 border-soft-sage pl-6 mb-8 text-lg text-earth-brown/70 bg-soft-sage/5 py-4 rounded-r-xl">
		"{data.blockquote}"
	</blockquote>
	<p class="mb-8 text-lg leading-relaxed text-earth-brown/80">{data.content}</p>
	<ul class="space-y-4">
		{#each data.list as item}
			<li class="flex items-start gap-3">
				<span class="text-soft-sage text-xl mt-0.5">●</span>
				<span class="text-lg text-earth-brown/80">{item}</span>
			</li>
		{/each}
	</ul>
</div>
