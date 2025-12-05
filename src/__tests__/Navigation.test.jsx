// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";

describe("Navigation Component", () => {
  it("Ska kunna öppna och stänga menyn (Hamburgare)", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const navElement = screen.getByRole("navigation");
    expect(navElement).not.toHaveClass("show-menu");

    const icon = screen.getByRole("img");
    await user.click(icon);
    expect(navElement).toHaveClass("show-menu");

    await user.click(icon);
    expect(navElement).not.toHaveClass("show-menu");
  });

  it("Ska klicka på länkarna i menyn för att navigera", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    const icon = screen.getByRole("img");
    await user.click(icon);

    const bookingLink = screen.getByText("Booking");
    await user.click(bookingLink);

    await user.click(icon);

    const confirmLink = screen.getByText("Confirmation");
    await user.click(confirmLink);
  });
});
