<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { CounterEntry } from "$lib/types";
  import { PlusIcon } from "$lib";
  import { localStorageStore, getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  import { base } from "$app/paths";
  import { v4 as uuid } from "uuid";

  const modalStore = getModalStore();
  const countersStore: Writable<CounterEntry[]> = localStorageStore("counters", []);

  const newCounterModal: ModalSettings = {
    type: "prompt",
    title: "Create New Counter",
    body: "Please enter a name for the counter:",
    valueAttr: { type: "text", minlength: 3, required: true },
    response: createNewCounter,
  };

  function createNewCounter(name: string) {
    if (!name) {
      return;
    }

    const counter: CounterEntry = {
      id: uuid(),
      name,
    };

    countersStore.update((counters) => [...counters, counter]);
  }
</script>

<h1 class="h1">Counters</h1>

{#each $countersStore as counter}
  <a href="{base}/counter/{counter.id}" class="card p-4">
    <span class="mx-4">{counter.name}</span>
  </a>
{/each}

<button class="btn variant-filled" on:click={() => modalStore.trigger(newCounterModal)}>
  <span>
    <PlusIcon />
  </span>
  <span>New Counter</span>
</button>
