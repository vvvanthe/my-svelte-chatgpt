<script>
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import './styles.css';
  import { username } from '$lib/components/stores';
  import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte';
  let formModal = true;
  import { onMount, afterUpdate  } from "svelte";
  import { Section, Register } from 'flowbite-svelte-blocks';

  afterUpdate(async () => {
    formModal=true
    
   
  });

</script>
{#if $username.length===0}
<div class="flex flex-col min-h-screen">
  <Header />

  <main class="flex-grow flex flex-col p-4 w-full max-w-4xl mx-auto font-sans">
    <slot />
  </main>

  <Footer />
</div>
{:else}
<div class="flex-grow flex flex-col p-4 w-full max-w-4xl mx-auto font-sans items-center justify-center min-h-screen m-10">

  <Register >
    
    <div class="p-6 space-y-4 md:space-y-6 lg:p-8" >
      <form class="flex flex-col space-y-6" action="/">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0 text-center">Login in</h3>
        <Label class="space-y-2">
          <span>Your email</span>
          <Input type="email" name="email" placeholder="name@company.com" required />
        </Label>
        <Label class="space-y-2">
          <span>Your password</span>
          <Input type="password" name="password" placeholder="••••••" required />
        </Label>
        <!-- <div class="flex items-start">
          <Checkbox>Remember me</Checkbox>
          <a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >Forgot password?</a
          >
        </div> -->
        <Button type="submit" class="w-full1">Sign in</Button>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet? <a
            href="/"
            class="font-medium text-primary-600 hover:underline dark:text-primary-500">Please contact admin</a
          >
        </p>
      </form>
    </div>
  </Register>

</div>

{/if}