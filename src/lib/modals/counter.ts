import type { Counter } from "$lib/types";
import type { ModalSettings } from "@skeletonlabs/skeleton";
import { v4 as uuid } from "uuid";

export function createNewCounterModal(add: (counter: Counter) => void): ModalSettings {
  return createModal(add);
}

export function createEditCounterModal(
  counter: Counter,
  edit: (counter: Counter) => void
): ModalSettings {
  return createModal(edit, counter);
}

function createModal(
  update: (counter: Counter) => void,
  counter: Counter | undefined = undefined
): ModalSettings {
  const modal: ModalSettings = {
    type: "component",
    component: "counter",
    title: `${counter ? "Edit" : "Create New"} Counter`,
    body: "Please enter details for the counter:",
    value: {
      name: counter?.name,
      unit: counter?.unit,
    },
    response: updateCounter,
  };

  function updateCounter(data: { name: string; unit?: string }) {
    if (!data) {
      return;
    }

    const newCounter: Counter = {
      id: counter?.id || uuid(),
      name: data.name,
      unit: data.unit,
    };

    update(newCounter);
  }

  return modal;
}

export function createDeleteCounterModal(
  counter: Counter,
  remove: (id: string) => void
): ModalSettings {
  return {
    type: "confirm",
    title: "Delete Counter",
    body: `Are you sure you want to delete the counter ${counter.name}?`,
    response: (confirmation) => {
      if (confirmation) {
        remove(counter.id);
      }
    },
  };
}
