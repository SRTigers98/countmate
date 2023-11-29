import { Selector, ClientFunction } from "testcafe";

fixture`Base Layout`.page`http://localhost:5173`;

test("Home Link", async (t) => {
  const homeLink = Selector("div.app-bar-slot-lead a");

  await t.click(homeLink);

  const getPath = ClientFunction(() => window.location.pathname);
  await t.expect(getPath()).eql("/");
}).page("http://localhost:5173/counter");

test("GitHub", async (t) => {
  const githubBtn = Selector("header a.btn");

  await t.expect(githubBtn.getAttribute("href")).eql("https://github.com/srtigers98/deltacount");
  await t.expect(githubBtn.getAttribute("target")).eql("_blank");
});
