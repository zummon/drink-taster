<script>
	import '../app.css';

	let {data, children} = $props()

	let navs = [
		{path:'/about',text:'About'},
		{path:'/product',text:'Product'},
		{path:'/blog',text:'Blog'},
	]
</script>


<div class="flex flex-wrap justify-between bg-white bg-opacity-75 rounded-lg m-4">
	<div
		class="py-3 px-4"
	>
		<a class="transition duration-500 text-lg {data.pathname == '/' ? '':'font-semibold hover:bg-white focus:bg-white'}" href="/">
			{data.siteName}
		</a>
	</div>
	<div class="py-3 px-4 flex flex-wrap gap-3">
		{#each navs as item }
			<a
				class="transition duration-500 text-lg {data.pathname.startsWith(item.path) ? 'border-b border-current':'font-semibold hover:bg-white focus:bg-white'}"
				href={item.path}
			>
				{item.text}
			</a>
		{/each}
	</div>
</div>

<div class="mx-4">
	{@render children()}
</div>

<div class="my-4 mr-4 ml-auto flex flex-wrap justify-end bg-white bg-opacity-75 rounded-lg w-fit">
	<p class="py-3 px-4">
		<span class="font-medium">
			Made by Antigravity, Teerapat Anantarattanachai<br>
			Something breaks, needs upgrade. Let me know
		</span>
	</p>
</div>