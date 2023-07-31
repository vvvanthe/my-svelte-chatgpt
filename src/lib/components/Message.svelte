<script lang="ts">
  import { config } from '$lib/config';
  import { formatMessage } from '$lib/utils/formatMessage';
  import { Spinner } from 'flowbite-svelte';


  export let message: {
    role: string;
    content: string;
  };

  let formattedContent = '';

  $: {
    formattedContent = formatMessage(message.content);
  }
</script>
{#if message.role !== 'noti'}
<div class={`flex items-end ${message.role === 'user' ? 'justify-end' : ''} `}>
  <div
    class={`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${
      message.role === 'user' ? 'order-1 items-end' : 'order-2 items-start'
    }`}
  >
    <div>
      <span
        class={`px-4 py-2 rounded-lg inline-block shadow-md ${
          message.role === 'user'
            ? 'rounded-br-none bg-blue-600 text-white'
            : 'rounded-bl-none bg-white text-gray-600'
        }`}
      >
        {@html formattedContent}
      </span>
    </div>
  </div>
  <img
  src={message.role === 'user' ? config.senderImgSrc : config.receiverImgSrc}
  alt={message.role === 'user' ? 'Sender' : 'Receiver'}
  class={`w-6 h-6 rounded-full ${message.role === 'user' ? 'order-2' : 'order-1'}`}
/>
</div>
  {:else}

  <div class={`flex items-end '' `}>
    <div
      class={`flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start`}
    >
      <div>
        <span
          class={`px-4 py-2 rounded-lg inline-block shadow-md rounded-bl-none bg-white text-gray-600`}
        >
          <p class="italic">Thinking &nbsp<Spinner color="green" size={4} /></p>
          

        </span>
      </div>
    </div>
    <img
    src={config.receiverImgSrc}
    alt={'Receiver'}
    class={`w-6 h-6 rounded-full order-1`}
  />
  </div>

 
  
  {/if}


