<script lang="ts">
  import type { AtomicCounter } from "$lib/types";
  import { createDeleteAtomicCounterModal, createEditAtomicCounterModal } from "$lib/modals";
  import { getModalStore } from "@skeletonlabs/skeleton";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const modalStore = getModalStore();

  export let atomicCounter: AtomicCounter;
  export let unit: string | undefined = undefined;

  $: editModal = createEditAtomicCounterModal(atomicCounter, (c) => dispatch("update", c));
  $: deleteModal = createDeleteAtomicCounterModal(atomicCounter, (id) => dispatch("delete", id));

  function increment() {
    dispatch("update", {
      ...atomicCounter,
      count: atomicCounter.count + 1,
    } satisfies AtomicCounter);
  }

  function decrement() {
    if (atomicCounter.count == 0) {
      return;
    }

    dispatch("update", {
      ...atomicCounter,
      count: atomicCounter.count - 1,
    } satisfies AtomicCounter);
  }
</script>

<div class="card variant-glass-tertiary">
  <header class="card-header text-xl"><strong>{atomicCounter.name}</strong></header>
  <section class="p-4 text-5xl">
    {#if atomicCounter.value}
      {atomicCounter.count} / {atomicCounter.count * atomicCounter.value}{unit || ""}
    {:else}
      {atomicCounter.count}
    {/if}
  </section>
  <footer class="card-footer grid gap-4 grid-cols-2 grid-rows-2">
    <button class="btn variant-filled-primary" on:click={increment}>Inc</button>
    <button class="btn variant-filled-secondary" on:click={decrement}>Dec</button>
    <button class="btn variant-filled-tertiary" on:click={() => modalStore.trigger(editModal)}
      >Edit</button
    >
    <button class="btn variant-filled-error" on:click={() => modalStore.trigger(deleteModal)}
      >Delete</button
    >
  </footer>
</div>
