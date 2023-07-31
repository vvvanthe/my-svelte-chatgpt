<script lang="ts">

  import Profile from '$lib/components/Profile.svelte';
  import SubmitButton from '$lib/components/SubmitButton.svelte';
  import Message from '$lib/components/Message.svelte';
  import { location } from '$lib/components/stores';
  import { onMount, afterUpdate  } from "svelte";
  import { Button, Modal, P } from 'flowbite-svelte'
  import axios from "axios";
  

  let messageContainer: HTMLElement | null = null;

  let open = false;
  let color;
  let locationList = []
  let messageList = []

  let inputText = ''

 
  $: {
    if (messageList) {
      scrollToBottom();
      
    }
  }

 
  function scrollToBottom() {
    if (messageContainer) {
      messageContainer.scroll({
        top: messageContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  }

  async function handleSubmit(sendmessage) {
    inputText = ''
    messageList=[...messageList, { content:sendmessage, role:'user' }];

    let formData = {
      query : sendmessage,
      loc_name : $location

    };
    messageList=[...messageList, { content:'Thinking', role:'noti' }];

    try {
      const response = await axios.post("https://chatbotbe.ap.ngrok.io/location/chat", new URLSearchParams(formData).toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        maxRedirects: 0, // Disable redirects
      });
      messageList = messageList.filter((user) => user.role !== 'noti');
     
      // console.log("Server Response:", response.data.response.response);
      messageList=[...messageList, { content:response.data.response.response, role:'assistant' }];
  
     

      // Handle the response data as needed
    } catch (error) {
      
      console.error("Error uploading files:", error);
      
      // Handle the error
    }

    
    
  }




  afterUpdate(() => {
		if (messageList) {
      scrollToBottom();
      
    }
  });
  
  onMount(async () => {
    if ($location==='')
    {
      try {
            const response = await fetch("https://chatbotbe.ap.ngrok.io/location/get_alllocation")
            const data = await response.json();
            locationList = data.data;
              if (locationList.length ===0)
              {
                color="red"
                open = true
              }
              else
              {
                location.update(locationList[0][0])
              }
            }catch (error) {
                  console.error('Error fetching data:', error);
                }
            }
    
   
  });

  
</script>
<div class="text-6xl font-bold text-center pt-10 pb-10">
  {$location}
</div>
<svelte:head>
  <title>Aivision</title>
</svelte:head>

<Modal title="Warning" bind:open {color} >

  <div class="text-base leading-relaxed">
    No location data. Please upload location data first!
  </div>
  <svelte:fragment slot='footer'>
    <Button href="/upload">I accept</Button>

  </svelte:fragment>
</Modal>
<!-- 
<Modal title="Warning Form" bind:open={defaultModal} color autoclose>
  No location data. Please upload location data first!

  <div class="text-base leading-relaxed">
    
  </div>
 
</Modal> -->




<div
  class="flex-1 p-6 justify-between flex flex-col  border-2 border-white bg-slate-300 rounded-2xl h-full"
  >
  <Profile />

  <div
    bind:this={messageContainer}
    class="max-h-[50vh] flex flex-col space-y-4 p-3 overflow-y-scroll scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch mt-auto"
  >
    {#each messageList as message}
      <Message {message} />
    {/each}
  </div>

  <div class="  px-4 pt-4 mb-2 sm:mb-0">
    <div class="relative flex">
      <form class="w-full relative" on:submit={()=>handleSubmit(inputText)}>
        <textarea
            on:keydown={(e) => {
              const shiftEnter = e.shiftKey && e.key === 'Enter';

              if (shiftEnter) {
                e.stopPropagation();
              } else if (e.key === 'Enter') {
                e.preventDefault();
            

                if (e.target instanceof HTMLTextAreaElement) {
                  e?.target?.form?.requestSubmit();
                }
              }
            }}
            bind:value={inputText}
            name="message"
            autocomplete="off"
            placeholder="Write your message!"
            class="w-full max-h-[200px] pr-32 resize-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-md py-3"
          />
                  <SubmitButton  disabled={inputText.length===0 ||$location===''}/>
      </form>
    </div>
  </div>
</div>

<style lang="postcss">
  .scrollbar-w-2::-webkit-scrollbar {
    @apply w-1 h-1;
  }

  .scrollbar-track-blue-lighter::-webkit-scrollbar-track {
    @apply bg-slate-200;
  }

  .scrollbar-thumb-blue::-webkit-scrollbar-thumb {
    @apply bg-slate-400;
  }

  .scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
    @apply rounded;
  }
</style>
