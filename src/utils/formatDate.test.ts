import formatDate from "./formatDate";

test("returns a traditionally (US) formatted MM/DD/YYYY date given a JS numerical date format", () => {
  expect(formatDate("2025 10 15")).toBe("10/15/2025");
});

test("drops leading zeros for single digit months", () => {
  expect(formatDate("2025 02 15")).toBe("2/15/2025");
});
