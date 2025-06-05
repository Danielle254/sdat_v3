import NavLinksList from "./NavLinksList";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("NavLinksList", () => {
  beforeEach(() => {
    render(<NavLinksList />);
  });

  test("Login/Logout is a button", () => {
    expect(
      screen.getByRole("button", { name: "Login with Google" })
    ).toBeInTheDocument();
  });

  test("all other items in the nav list are link elements", () => {
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "About this App" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Keyboard Navigation" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Service Dog Laws" })
    ).toBeInTheDocument();
  });

  test("link elements have correct hrefs", () => {
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/"
    );
    expect(
      screen.getByRole("link", { name: "About this App" })
    ).toHaveAttribute("href", "/info");
    expect(
      screen.getByRole("link", { name: "Keyboard Navigation" })
    ).toHaveAttribute("href", "/keyboardnavigation");
    expect(
      screen.getByRole("link", { name: "Service Dog Laws" })
    ).toHaveAttribute("href", "https://www.ada.gov/topics/service-animals/");
  });

  test("Service Dog Laws link should open in a new window", () => {
    expect(
      screen.getByRole("link", { name: "Service Dog Laws" })
    ).toHaveAttribute("target", "_blank");
  });

  test("decorative icons are hidden from screen readers", () => {
    expect(screen.getByTestId("GoogleIcon")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
    expect(screen.getByTestId("MapIcon")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
    expect(screen.getByTestId("InfoIcon")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
    expect(screen.getByTestId("KeyboardIcon")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
    expect(screen.getByTestId("GavelIcon")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  test("list is keyboard navigable for accessibility", async () => {
    const loginButton = screen.getByRole("button");
    loginButton.focus();
    await userEvent.tab();
    expect(screen.getByRole("link", { name: "Home" })).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(loginButton).toHaveFocus();
  });
});
