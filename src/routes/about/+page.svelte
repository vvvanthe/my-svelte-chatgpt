<svelte:head>
  <title>Home</title>
  <meta name="description" content="About this app" />
</svelte:head>

<script>

	let files;

	$: if (files) {
		// Note that `files` is of type `FileList`, not an Array:
		// https://developer.mozilla.org/en-US/docs/Web/API/FileList
		console.log(files);

		for (const file of files) {
			console.log(`${file.name}: ${file.size} bytes`);
		}
	}

  // onMount(async () => {
  //   getModal().open();
  // });
</script>



<!-- <Modal>
  <div class="shadow-card flex flex-col rounded-xl bg-white bg-clip-border">
    <div class="text-secondary flex-1 p-6">
      <a>
        <h2 class="font-bold font-sans text-3xl text-blue-900 align-center">
          Please add your ID
        </h2>
      </a>
      <p class="mb-3 opacity-60">
        <input
          class="border rounded border-indigo-300 w-full py-2 px-4 text-lg"
          placeholder="user ID"
          type="text"

          on:keydown={(e) => {
            if (e.key === "Enter") {
              
            }
          }}
        />
      </p>
      <button
        class="middle none center rounded-lg bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        data-ripple-light="true"

      >
        Oke
      </button>
    </div>
  </div>
</Modal> -->

<label  for="many">Upload multiple files of any type:</label>
<input bind:files class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple />

{#if files}
	<h2>Selected files:</h2>
	{#each Array.from(files) as file}
		<p>{file.name} ({file.size} bytes)</p>
	{/each}
{/if}


<!-- 
<div class="text-column">
  <h1 class="mb-8">List of Position</h1>

  <p>
    This is a <a href="https://kit.svelte.dev">SvelteKit</a> app with built-in support for
    <a href="https://openai.com/api/">ChatGPT</a> and
    <a href="https://tailwindcss.com">TailwindCSS</a>. You can make your own by typing the following
    into your command line and following the prompts:
  </p>

  <pre class="my-8">npx create-svelte-chatgpt@latest</pre>

  <p>
    The page you're looking at is purely static HTML, with no client-side interactivity needed.
    Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening
    the devtools network panel and reloading.
  </p>

  <h2 class="mt-4 mb-4 font-bold">ChatGPT</h2>
  <p>
    ChatGPT is a powerful language model developed by OpenAI. This app leverages ChatGPT to provide
    AI-powered conversation and content generation capabilities. To interact with ChatGPT, we're
    using the
    <a href="https://github.com/vercel-labs/ai">AI</a> package by Vercel. Read more about their SDK
    <a href="https://sdk.vercel.ai/docs">here</a>.
  </p>

  <h2 class="mt-4 mb-4 font-bold">TailwindCSS</h2>
  <p>
    TailwindCSS is a utility-first CSS framework that allows you to build custom designs quickly and
    easily. It comes preconfigured in this app, allowing you to use its utility classes to style
    your components.
  </p>
</div> -->
