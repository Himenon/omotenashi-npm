import main from "../main";

describe("getTitleのテスト", () => {
  test("https://github.com/", async () => {
    const title = await main.getTitle("https://github.com/");
    expect(title).toEqual("The world’s leading software development platform · GitHub");
  });

  test("http://example.com/", async () => {
    const title = await main.getTitle("http://example.com/");
    expect(title).toEqual("Example Domain");
  });
});
