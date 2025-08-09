<script>

  import { location } from '$lib/components/stores';
  import { Card, Button ,MenuButton,CloseButton ,Modal, Spinner} from "flowbite-svelte";
  import axios from "axios";
  import { onMount, afterUpdate  } from "svelte";

  let locationList=[]
  let flagLoading = false;
  let defaultModal = false;
  let messE = ''

  
  async function handleChatButton(loc_name) {
    location.update(loc_name)
  }

  async function handleDelete(loc_name_str) {
    flagLoading=true
    defaultModal=true
    location.reset
    let formData = {
      loc_name : loc_name_str,

    };
  

  try {
      const response = await axios.post("https://chatbotbe.ap.ngrok.io/location/delete", new URLSearchParams(formData).toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        maxRedirects: 0, // Disable redirects
      });
      flagLoading = false
      messE=''
      // console.log("Server Response:", response.data.data);
  
      locationList = locationList.filter((user) => user[0] !== loc_name_str);

      // Handle the response data as needed
    } catch (error) {
      flagLoading = false
      console.error("Error uploading files:", error);
      messE='Error'
      // Handle the error
    }

    
    
  }
  
  onMount(async () => {
    try {
    const response = await fetch("https://chatbotbe.ap.ngrok.io/location/get_alllocation")
    const data = await response.json();
    locationList = data.data; 

    }catch (error) {
          console.error('Error fetching data:', error);
        }
   
  });
  // afterUpdate(async () => {
  //   try {
  //   const response = await fetch("https://chatbotbe.ap.ngrok.io/location/get_alllocation")
  //   const data = await response.json();
  //   locationList = data.data; 

  //   }catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
   

  // })
</script>

<Modal title="Status Form" bind:open={defaultModal} autoclose>
  
  {#if flagLoading}
  <div class="flex items-center text-center justify-center w-full">
    
    <br>
    <p class="text-lg text-purple-700 font-bold">Deleting... &nbsp</p>
    <Spinner color="purple" />
  </div>
    {:else}

    {#if messE.length==0}

    <div class="flex items-center text-center justify-center w-full">
      <br>
      <p class="text-lg text-purple-700 font-bold">Done!</p>

    </div>

    {:else}

    <div class="flex items-center text-center justify-center w-full">
      <br>
      <p class="text-lg text-red-700 font-bold">{messE}</p>

    </div>

    {/if}


    {/if}

  <!-- <svelte:fragment slot='footer'>
    <Button color="alternative" disabled = {flagLoading}>Decline</Button>
  </svelte:fragment> -->
</Modal>




<div class="text-6xl font-bold text-center pt-10 pb-10 ">
  Location
</div>
<!-- <Button on:click={()=>handleDelete('bku2')}></Button> -->

<div class="grid grid-cols-2 gap-4 ">

  {#each locationList as loc_name (loc_name)}
  <div>
    

        
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      
      <div class='relative'>
        <div class="flex justify-end absolute  inset-x-0 z-100">
          <CloseButton  on:click={()=>handleDelete(loc_name[0])}>
            </CloseButton>
          
        </div>
        <!-- <img class="rounded-t-lg object-fill" src={loc_name[1]} alt="" /> -->

      </div>
          

      <div class="p-5">
        
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{loc_name[0]}</h5>
        
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 custom-font-size">{loc_name[2]}</p>
          <Button color="green" on:click={()=>handleChatButton(loc_name[0])}  href="/chat">
              Chat
              <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
          </Button>
      </div>
    </div>
  
  </div>
{/each}


</div>

<style>
  .custom-font-size {
    font-size: 12px;
  }
  /* img {

max-height: 200px;
width: 100%;
} */
</style>