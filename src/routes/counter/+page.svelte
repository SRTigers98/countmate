<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { Counter } from "$lib/types";
  import { PlusIcon } from "$lib/icons";
  import { CounterCard } from "$lib/components";
  import { createNewCounterModal } from "$lib/modals";
  import { localStorageStore, getModalStore } from "@skeletonlabs/skeleton";

  const modalStore = getModalStore();
  const countersStore: Writable<Counter[]> = localStorageStore("counters", []);

  const newCounterModal = createNewCounterModal((counter) => {
    countersStore.update((c) => [...c, counter]);
  });

  function updateCounter(event: CustomEvent<Counter>) {
    countersStore.update((counters) =>
      counters.map((c) => (c.id === event.detail.id ? event.detail : c))
    );
  }

  function deleteCounter(event: CustomEvent<string>) {
    countersStore.update((counters) => counters.filter((c) => c.id !== event.detail));
    localStorage.removeItem(`atomic-counters-${event.detail}`);
  }
</script>

<h1 class="h1">
  <span class="text-primary-500">Counter</span>
</h1>

{#each $countersStore as counter}
  <CounterCard {counter} on:update={updateCounter} on:delete={deleteCounter} />
{/each}

<button class="btn variant-ghost-primary" on:click={() => modalStore.trigger(newCounterModal)}>
  <span>
    <PlusIcon />
  </span>
  <span>New Counter</span>
</button>
