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
    type: "component",
    component: "atomicCounter",
    title: `${atomicCounter?.name ? "Edit" : "Add"} Atomic Counter`,
    value: {
      name: atomicCounter?.name,
      value: atomicCounter?.value,
    },
    body: "Please enter details for the atomic counter:",
    response: updateAtomicCounter,
  };

  function updateAtomicCounter(data: { name: string; value?: number }) {
    if (!data) {
      return;
    }

    const newAtomicCounter: AtomicCounter = {
      id: atomicCounter?.id || uuid(),
      name: data.name,
      count: atomicCounter?.count || 0,
      value: data.value,
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
