import cityState from "./cityState";

test("isolates city and state from given Google Mapsaddress", () => {
  expect(cityState("6600 US-12, Lolo, MT 59847, USA")).toBe("Lolo, MT");
});
