<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { PageData } from "./$types";
  import type { CounterEntry, Counter } from "$lib/types";
  import { localStorageStore } from "@skeletonlabs/skeleton";

  export let data: PageData;

  const countersStore: Writable<CounterEntry[]> = localStorageStore("counters", []);
  let counter = $countersStore.find((e) => e.id === data.id);

  const counterStore: Writable<Counter> = localStorageStore(`counter-${counter?.id}`, {
    counters: [],
  });
  let totalCount = $counterStore.counters.reduce((prev, curr) => prev + curr.count, 0);
</script>

<h1 class="h1">
  <span class="text-primary-500">Counter {counter?.name}</span>
</h1>

<div class="card variant-glass-primary">
  <section class="p-4">Total Count: <strong>{totalCount}</strong></section>
</div>
