<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { CounterEntry } from "$lib/types";
  import { localStorageStore } from "@skeletonlabs/skeleton";
  import { base } from "$app/paths";

  const countersStore: Writable<CounterEntry[]> = localStorageStore("counters", []);
</script>

<h1 class="h1">Counters</h1>

{#each $countersStore as counter}
  <a href="{base}/counter/{counter.id}" class="card p-4">
    {counter.name}
  </a>
{/each}

<button class="btn variant-filled">
  <span
    ><svg
      class="w-6 h-6 text-gray-800 text-white dark:text-black"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 18"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 1v16M1 9h16"
      />
    </svg>
  </span>
  <span>New Counter</span>
</button>
