<script lang="ts">
  import type { AtomicCounter } from "$lib/types";
  import { createEditAtomicCounterModal } from "$lib/modals";
  import { getModalStore } from "@skeletonlabs/skeleton";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const modalStore = getModalStore();

  export let atomicCounter: AtomicCounter;

  $: editModal = createEditAtomicCounterModal(atomicCounter, (c) => dispatch("update", c));

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
    <button class="btn variant-filled-tertiary" on:click={() => modalStore.trigger(editModal)}
      >Edit</button
    >
    <button class="btn variant-filled-error" on:click={() => dispatch("delete", atomicCounter.name)}
      >Delete</button
    >
  </footer>
</div>
