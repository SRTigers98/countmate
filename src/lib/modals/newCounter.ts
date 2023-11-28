import type { Counter } from "$lib/types";
import type { ModalSettings } from "@skeletonlabs/skeleton";
import { v4 as uuid } from "uuid";

export default function (add: (counter: Counter) => void): ModalSettings {
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

    const counter: Counter = {
      id: uuid(),
      name,
    };

    add(counter);
  }

  return modal;
}
