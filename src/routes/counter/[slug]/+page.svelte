<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { PageData } from "./$types";
  import type { CounterEntry, Counter } from "$lib/types";
  import { PlusIcon } from "$lib/icons";
  import { createAddAtomicCounterModal } from "$lib/modals";
  import { AtomicCounter } from "$lib/components";
  import { localStorageStore, getModalStore } from "@skeletonlabs/skeleton";

  export let data: PageData;

  const modalStore = getModalStore();

  const counters: Writable<CounterEntry[]> = localStorageStore("counters", []);
  let counterEntry = $counters.find((e) => e.id === data.id);

  const counter: Writable<Counter> = localStorageStore(`counter-${counterEntry?.id}`, {
    atomicCounters: [],
  });
  let totalCount = $counter.atomicCounters?.reduce((prev, curr) => prev + curr.count, 0);

  const addCounterModal = createAddAtomicCounterModal(counter);
</script>

<h1 class="h1">
  <span class="text-primary-500">Counter {counterEntry?.name || ""}</span>
</h1>

<div class="card variant-glass-primary">
  <section class="p-4">Total Count: <strong>{totalCount}</strong></section>
</div>

{#each $counter.atomicCounters as atomicCounter}
  <AtomicCounter counter={atomicCounter} on:update={() => counter.update((c) => c)} />
{/each}

<button class="btn variant-ghost-primary" on:click={() => modalStore.trigger(addCounterModal)}>
  <span>
    <PlusIcon />
  </span>
  <span>Add Counter</span>
</button>
