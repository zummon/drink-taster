<script>
	let { data } = $props();
</script>

<div
	class="bg-white bg-opacity-75 hover:bg-opacity-100 transition duration-500 rounded-lg max-w-3xl mx-auto p-4 mb-4 text-center"
>
	<h1 class="text-3xl font-semibold mb-6">{data.title}</h1>
	<p class="text-xl font-medium mb-4">{data.description}</p>
	<p class="font-semibold">
		<span class="">
			{new Date(data.date).toLocaleDateString(undefined, {
				day: "numeric",
				month: "short",
				year: "numeric",
			})}
		</span>
		{#each data.tags as item, index (`tag-${index}`)}
			<a class="underline" href="/#">
				{item}
			</a>
		{/each}
	</p>
</div>
<div
	class="prose prose-lg max-w-3xl mx-auto bg-white bg-opacity-75 hover:bg-opacity-100 transition duration-500 rounded-lg p-4"
>
	{#each data.content.blocks as block, index}
		{#if block.type === "heading"}
			<h2 class="text-amber-900">{block.content}</h2>
		{:else if block.type === "paragraph"}
			<p class="text-amber-900">{block.content}</p>
		{:else if block.type === "list"}
			<ul class="text-amber-900">
				{#each block.items as item}
					<li class="text-amber-900">
						{#if item.url}
							<a class="text-amber-900" href={item.url}>
								{item.text}
							</a>
						{:else}
							{item.text}
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	{/each}
</div>
