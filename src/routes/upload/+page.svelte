<svelte:head>
  <title>Home</title>
  <meta name="description" content="About this app" />
</svelte:head>

<script>
  import { Button, Modal ,GradientButton } from 'flowbite-svelte'
  import { Fileupload, Label, Listgroup, ListgroupItem,MenuButton, Toast,Spinner } from 'flowbite-svelte'
  
  let files=[];  // FileList type
  let defaultModal = false;
  import { Input } from 'flowbite-svelte';
  import axios from 'axios';
  let address
  let image_link
  let loc_name
  let flagLoading = false
  let messE=''
  

  // onMount(async () => {
  //   getModal().open();
  // });

  async function handleFileUpload() {
    flagLoading = true
    defaultModal = true
    const formData = new FormData();


    for (const file of files) {
      formData.append("files", file);
    }
    formData.append("loc_name", loc_name);
    formData.append("image_link", image_link);
    formData.append("address", address);

    try {
      const response = await axios.post("https://chatbotbe.ap.ngrok.io/location/uploadfiles/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        maxRedirects: 0, // Disable redirects
      });

      console.log("Server Response:", response.data);
      flagLoading = false
      messE=''
      // Handle the response data as needed
    } catch (error) {
      console.error("Error uploading files:", error);
      flagLoading = false
      messE = 'Cannot Upload'
      // Handle the error
    }
  }
</script>

<div class="text-6xl font-bold text-center pt-10">
  New Location
</div>
<!-- <Button on:click={() => defaultModal = true}>Default modal</Button> -->
<Modal title="Status Form" bind:open={defaultModal} autoclose>

  {#if flagLoading}
  <div class="flex items-center text-center justify-center w-full">
    
    <br>
    <p class="text-lg text-purple-700 font-bold">Uploading... &nbsp</p>
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

  <svelte:fragment slot='footer'>
    <Button color="alternative" disabled = {flagLoading}>Decline</Button>
  </svelte:fragment>
</Modal>


<form class="pt-10" on:submit={handleFileUpload}>
  <div class="grid gap-6 mb-6 md:grid-cols-2">
    <div>
      <Label class="pb-2" for='multiple_files' >Upload multiple files</Label>
      <Fileupload id='multiple_files' multiple bind:files={files} required/>
      <div class="pt-1">
  
      </div>
 </div>
    <div>
      <Label for="location" class="mb-2">Location</Label>
      <Input type="text" id="location" placeholder="Bach Khoa Univeristy" required  bind:value={loc_name}/>
    </div>
    <div>
      <Label for="address" class="mb-2">Adress</Label>
      <Input type="text" id="address" placeholder="268 Lý Thường Kiệt St, District 10, Ho Chi Minh City" required  bind:value={address}/>
    </div>
    <div>
      <Label for="image_link" class="mb-2">Image link</Label>
      <Input type="text" id="image_link" placeholder="https://huongnghiep.hocmai.vn/2022/02/image1-92.png" required  bind:value={image_link}/>
    </div>
    

  </div>
  <Listgroup items={files} let:item class="mt-10">
    {#if item}
      {item.name} 
    {:else}
      <ListgroupItem>No files</ListgroupItem>
    {/if}
  </Listgroup>
  <div class="pt-4">
    <GradientButton shadow color="cyan"type="submit">Submit</GradientButton>
  </div>
  
</form>
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



