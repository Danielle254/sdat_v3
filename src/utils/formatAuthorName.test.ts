import formatAuthorName from "./formatAuthorName";

test("isolates just first name from provided author name", () => {
  expect(formatAuthorName("Danielle Lindblom")).toBe("Danielle");
});
