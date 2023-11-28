<script lang="ts">
  import type { AtomicCounter } from "$lib/types";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let counter: AtomicCounter;

  function increment() {
    counter.count++;
    dispatch("update");
  }

  function decrement() {
    counter.count--;
    dispatch("update");
  }
</script>

<div class="card variant-glass-tertiary">
  <header class="card-header text-xl"><strong>{counter.name}</strong></header>
  <section class="p-4 text-5xl">{counter.count}</section>
  <footer class="card-footer grid gap-4 grid-cols-2 grid-rows-2">
    <button class="btn variant-filled-primary" on:click={increment}>Inc</button>
    <button class="btn variant-filled-secondary" on:click={decrement}>Dec</button>
    <button class="btn variant-filled-tertiary">Edit</button>
    <button class="btn variant-filled-error">Delete</button>
  </footer>
</div>
