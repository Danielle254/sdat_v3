import NavBar from "./NavBar";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("NavBar", () => {
  beforeEach(() => {
    render(<NavBar />);
  });

  test("page title is h1 and contains link to home page", () => {
    expect(screen.getByText("Service Dogs Around Town")).toContainHTML("h1");
    expect(
      screen.getByRole("link", { name: "Service Dogs Around Town" })
    ).toHaveAttribute("href", "/");
  });

  test("logo is hidden from screen readers", () => {
    expect(screen.getByTestId("logo")).toHaveAttribute("alt", "");
  });

  test("element that opens menu has is a button and has an accessible name", () => {
    expect(
      screen.getByRole("button", { name: "open menu" })
    ).toBeInTheDocument();
  });

  test("drawer is closed by default", () => {
    expect(screen.queryByText("Home")).toBeNull();
  });

  test("button opens the menu", async () => {
    await userEvent.click(screen.getByRole("button", { name: "open menu" }));
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  test("element that closes the menu is a button and has an accessible name", async () => {
    await userEvent.click(screen.getByRole("button", { name: "open menu" }));
    expect(
      screen.getByRole("button", { name: "close menu" })
    ).toBeInTheDocument();
  });

  test("button closes the menu", async () => {
    await userEvent.click(screen.getByRole("button", { name: "open menu" }));
    expect(screen.getByText("Home")).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("close-menu"));
    await waitFor(() => {
      expect(screen.queryByText("Home")).toBeNull();
    });
  });

  test("is keyboard navigable", async () => {
    await userEvent.tab();
    expect(
      screen.getByRole("link", { name: "Service Dogs Around Town" })
    ).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByRole("button", { name: "open menu" })).toHaveFocus();
    await userEvent.keyboard("[Enter]");
    expect(screen.getByText("Home")).toBeInTheDocument();
    await userEvent.tab();
    expect(screen.getByRole("button", { name: "close menu" })).toHaveFocus();
    await userEvent.keyboard("[Enter]");
    await waitFor(() => {
      expect(screen.queryByText("Home")).toBeNull();
    });
  });
});
