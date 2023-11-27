import type { CounterEntry } from "$lib/types";
import type { ModalSettings } from "@skeletonlabs/skeleton";
import type { Writable } from "svelte/store";
import { v4 as uuid } from "uuid";

export default function (store: Writable<CounterEntry[]>): ModalSettings {
  const modal: ModalSettings = {
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

    store.update((counters) => [...counters, counter]);
  }

  return modal;
}
