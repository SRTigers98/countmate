<script lang="ts">
  import { base } from "$app/paths";
  import { createDeleteCounterModal, createEditCounterModal } from "$lib/modals";
  import type { Counter } from "$lib/types";
  import { getModalStore } from "@skeletonlabs/skeleton";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const modalStore = getModalStore();

  export let counter: Counter;

  $: editModal = createEditCounterModal(counter, (c) => dispatch("update", c));
  $: deleteModal = createDeleteCounterModal(counter, (id) => dispatch("delete", id));
</script>

<div class="card variant-glass-tertiary w-full max-w-lg">
  <a href="{base}/counter/{counter.id}" class="block p-4 text-secondary-500 text-xl">
    {counter.name}
  </a>
  <footer class="card-footer grid gap-4 grid-cols-2">
    <button class="btn variant-filled-tertiary" on:click={() => modalStore.trigger(editModal)}
      >Edit</button
    >
    <button class="btn variant-filled-error" on:click={() => modalStore.trigger(deleteModal)}
      >Delete</button
    >
  </footer>
</div>
