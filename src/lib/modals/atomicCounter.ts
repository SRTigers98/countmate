import type { AtomicCounter } from "$lib/types";
import type { ModalSettings } from "@skeletonlabs/skeleton";
import { v4 as uuid } from "uuid";

export function createAddAtomicCounterModal(
  add: (atomicCounter: AtomicCounter) => void
): ModalSettings {
  return createModal(add);
}

export function createEditAtomicCounterModal(
  atomicCounter: AtomicCounter,
  edit: (atomicCounter: AtomicCounter) => void
): ModalSettings {
  return createModal(edit, atomicCounter);
}

function createModal(
  update: (atomicCounter: AtomicCounter) => void,
  atomicCounter: AtomicCounter | undefined = undefined
): ModalSettings {
  const modal: ModalSettings = {
    type: "prompt",
    title: `${atomicCounter?.name ? "Edit" : "Add"} Atomic Counter`,
    body: "Please enter a name for the atomic counter:",
    value: atomicCounter?.name || "",
    valueAttr: { type: "text", minlength: 3, required: true },
    response: updateAtomicCounter,
  };

  function updateAtomicCounter(name: string) {
    if (!name) {
      return;
    }

    const newAtomicCounter: AtomicCounter = {
      id: atomicCounter?.id || uuid(),
      name,
      count: atomicCounter?.count || 0,
    };

    update(newAtomicCounter);
  }

  return modal;
}

export function createDeleteAtomicCounterModal(
  atomicCounter: AtomicCounter,
  remove: (id: string) => void
): ModalSettings {
  return {
    type: "confirm",
    title: "Delete Atomic Counter",
    body: `Are you sure you want to delete the atomic counter ${atomicCounter.name}?`,
    response: (confirmation) => {
      if (confirmation) {
        remove(atomicCounter.id);
      }
    },
  };
}
