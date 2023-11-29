import { Selector, ClientFunction } from "testcafe";

fixture`Counter Overview Page`.page`http://localhost:5173/counter`;

test("New Counter", async (t) => {
  const newCounterBtn = Selector("main button.btn.variant-ghost-primary");

  await t.wait(1000);
  await t.click(newCounterBtn);

  const modalInput = Selector("div.modal input.modal-prompt-input");
  const modalSubmit = Selector("div.modal button.btn.variant-filled");

  await t.typeText(modalInput, "Test");
  await t.click(modalSubmit);

  const counterCard = Selector("main div.card");
  await t.expect(counterCard.exists).ok();
}).before(() => ClientFunction(() => window.localStorage.clear())());
