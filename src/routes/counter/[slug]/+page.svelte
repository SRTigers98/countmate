<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { PageData } from "./$types";
  import type { CounterEntry, Counter, AtomicCounter } from "$lib/types";
  import { localStorageStore, getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  import { PlusIcon } from "$lib/icons";

  export let data: PageData;

  const modalStore = getModalStore();
  const addCounterModal: ModalSettings = {
    type: "prompt",
    title: "Add Atomic Counter",
    body: "Please enter a name for the atomic counter:",
    valueAttr: { type: "text", minlength: 3, required: true },
    response: addAtomicCounter,
  };

  const countersStore: Writable<CounterEntry[]> = localStorageStore("counters", []);
  let counter = $countersStore.find((e) => e.id === data.id);

  const counterStore: Writable<Counter> = localStorageStore(`counter-${counter?.id}`, {
    counters: [],
  });
  let totalCount = $counterStore.counters.reduce((prev, curr) => prev + curr.count, 0);

  function addAtomicCounter(name: string) {
    if (!name) {
      return;
    }

    counterStore.update((c) => {
      const newCounter: AtomicCounter = {
        name,
        count: 0,
      };

      const newCounters = [...c.counters, newCounter];

      return { ...c, counters: newCounters };
    });
  }
</script>

<h1 class="h1">
  <span class="text-primary-500">Counter {counter?.name || ""}</span>
</h1>

<div class="card variant-glass-primary">
  <section class="p-4">Total Count: <strong>{totalCount}</strong></section>
</div>

{#each $counterStore.counters as c}
  <div class="card variant-glass-tertiary">
    <header class="card-header"><strong>{c.name}</strong></header>
    <section class="p-4">(content)</section>
    <footer class="card-footer">(footer)</footer>
  </div>
{/each}

<button class="btn variant-ghost-primary" on:click={() => modalStore.trigger(addCounterModal)}>
  <span>
    <PlusIcon />
  </span>
  <span>Add Counter</span>
</button>
