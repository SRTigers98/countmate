<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { CounterEntry } from "$lib/types";
  import { PlusIcon } from "$lib/icons";
  import { createNewCounterModal } from "$lib/modals";
  import { localStorageStore, getModalStore } from "@skeletonlabs/skeleton";
  import { base } from "$app/paths";

  const modalStore = getModalStore();
  const countersStore: Writable<CounterEntry[]> = localStorageStore("counters", []);

  const newCounterModal = createNewCounterModal(countersStore);
</script>

<h1 class="h1">
  <span class="text-primary-500">Counter</span>
</h1>

{#each $countersStore as counter}
  <a href="{base}/counter/{counter.id}" class="card card-hover counter variant-glass-tertiary">
    <section class="p-4 text-secondary-500">{counter.name}</section>
  </a>
{/each}

<button class="btn variant-ghost-primary" on:click={() => modalStore.trigger(newCounterModal)}>
  <span>
    <PlusIcon />
  </span>
  <span>New Counter</span>
</button>

<style>
  .counter {
    width: 100%;
    max-width: 25rem;
  }
</style>
