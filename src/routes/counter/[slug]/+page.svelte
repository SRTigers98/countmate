<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { PageData } from "./$types";
  import type { Counter, AtomicCounter } from "$lib/types";
  import { PlusIcon } from "$lib/icons";
  import { createAddAtomicCounterModal } from "$lib/modals";
  import { AtomicCounterCard } from "$lib/components";
  import { localStorageStore, getModalStore } from "@skeletonlabs/skeleton";

  export let data: PageData;

  const modalStore = getModalStore();

  const countersStore: Writable<Counter[]> = localStorageStore("counters", []);
  let counter = $countersStore.find((e) => e.id === data.id);

  const atomicCountersStore: Writable<AtomicCounter[]> = localStorageStore(
    `atomic-counters-${counter?.id}`,
    []
  );
  $: totalCount = $atomicCountersStore.reduce((prev, curr) => prev + curr.count, 0);

  const addCounterModal = createAddAtomicCounterModal((atomicCounter) => {
    atomicCountersStore.update((c) => [...c, atomicCounter]);
  });

  function updateAtomicCounter(event: CustomEvent<AtomicCounter>) {
    atomicCountersStore.update((counters) =>
      counters.map((c) => (c.id === event.detail.id ? event.detail : c))
    );
  }

  function deleteAtomicCounter(event: CustomEvent<string>) {
    atomicCountersStore.update((counters) => counters.filter((c) => c.id !== event.detail));
  }
</script>

<h1 class="h1">
  <span class="text-primary-500">Counter {counter?.name || ""}</span>
</h1>

<div class="card variant-glass-primary">
  <section class="p-4">Total Count: <strong>{totalCount}</strong></section>
</div>

{#each $atomicCountersStore as atomicCounter}
  <AtomicCounterCard
    {atomicCounter}
    on:update={updateAtomicCounter}
    on:delete={deleteAtomicCounter}
  />
{/each}

<section class="grid gap-4 grid-rows-2">
  <button class="btn variant-ghost-primary" on:click={() => modalStore.trigger(addCounterModal)}>
    <span>
      <PlusIcon />
    </span>
    <span>Add Counter</span>
  </button>

  <button class="btn variant-ghost-secondary" on:click={() => history.back()}>Back</button>
</section>
