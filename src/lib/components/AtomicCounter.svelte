<script lang="ts">
  import type { AtomicCounter } from "$lib/types";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let atomicCounter: AtomicCounter;

  function increment() {
    dispatch("update", {
      ...atomicCounter,
      count: atomicCounter.count + 1,
    } satisfies AtomicCounter);
  }

  function decrement() {
    dispatch("update", {
      ...atomicCounter,
      count: atomicCounter.count - 1,
    } satisfies AtomicCounter);
  }
</script>

<div class="card variant-glass-tertiary">
  <header class="card-header text-xl"><strong>{atomicCounter.name}</strong></header>
  <section class="p-4 text-5xl">{atomicCounter.count}</section>
  <footer class="card-footer grid gap-4 grid-cols-2 grid-rows-2">
    <button class="btn variant-filled-primary" on:click={increment}>Inc</button>
    <button class="btn variant-filled-secondary" on:click={decrement}>Dec</button>
    <button class="btn variant-filled-tertiary">Edit</button>
    <button class="btn variant-filled-error">Delete</button>
  </footer>
</div>
