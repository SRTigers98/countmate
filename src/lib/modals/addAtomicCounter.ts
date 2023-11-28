import type { AtomicCounter } from "$lib/types";
import type { ModalSettings } from "@skeletonlabs/skeleton";

export default function (add: (atomicCounter: AtomicCounter) => void): ModalSettings {
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

    const atomicCounter: AtomicCounter = {
      name,
      count: 0,
    };

    add(atomicCounter);
  }

  return modal;
}
