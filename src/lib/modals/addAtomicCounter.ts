import type { Counter, AtomicCounter } from "$lib/types";
import type { ModalSettings } from "@skeletonlabs/skeleton";
import type { Writable } from "svelte/store";

export default function (store: Writable<Counter>): ModalSettings {
  const modal: ModalSettings = {
    type: "prompt",
    title: "Add Atomic Counter",
    body: "Please enter a name for the atomic counter:",
    valueAttr: { type: "text", minlength: 3, required: true },
    response: addAtomicCounter,
  };

  function addAtomicCounter(name: string) {
    if (!name) {
      return;
    }

    store.update((c) => {
      const newCounter: AtomicCounter = {
        name,
        count: 0,
      };

      const newCounters = [...c.counters, newCounter];

      return { ...c, counters: newCounters };
    });
  }

  return modal;
}
