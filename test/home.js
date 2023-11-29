import { Selector, ClientFunction } from "testcafe";

fixture`Home Page`.page`http://localhost:5173`;

test("Get Started", async (t) => {
  const getStartedBtn = Selector("main a.btn");

  await t.click(getStartedBtn);

  const getPath = ClientFunction(() => window.location.pathname);
  await t.expect(getPath()).eql("/counter");
});
