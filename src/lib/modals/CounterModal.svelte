<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import { getModalStore } from "@skeletonlabs/skeleton";

  export let parent: SvelteComponent;

  const modalStore = getModalStore();

  let form: HTMLFormElement;
  const data = {
    name: $modalStore[0].value.name,
    unit: $modalStore[0].value.unit,
  };

  function onFormSubmit(): void {
    if (!form.reportValidity()) {
      return;
    }

    if ($modalStore[0].response) {
      $modalStore[0].response(data);
    }

    modalStore.close();
  }
</script>

{#if $modalStore[0]}
  <div class="card p-4 w-modal shadow-xl space-y-4">
    <header class="text-2xl font-bold">{$modalStore[0].title ?? "(title missing)"}</header>
    <article>{$modalStore[0].body ?? "(body missing)"}</article>
    <form bind:this={form} class="border border-surface-500 p-4 space-y-4 rounded-container-token">
      <label class="label">
        <span>Name</span>
        <input class="input" type="text" bind:value={data.name} minlength="3" required />
      </label>
      <label class="label">
        <span>Unit</span>
        <input class="input" type="text" bind:value={data.unit} />
      </label>
    </form>
    <footer class={parent.regionFooter}>
      <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}
        >{parent.buttonTextCancel}</button
      >
      <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Submit</button>
    </footer>
  </div>
{/if}
