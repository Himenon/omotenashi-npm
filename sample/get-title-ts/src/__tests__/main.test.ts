import { getTitle } from "../main";

describe("getSiteTitleのテスト", () => {
  test("https://github.com/", async () => {
    const title = await getTitle("https://github.com/");
    expect(title).toEqual(
      "The world’s leading software development platform · GitHub"
    );
  });

  test("http://example.com/", async () => {
    const title = await getTitle("http://example.com/");
    expect(title).toEqual("Example Domain");
  });
});
