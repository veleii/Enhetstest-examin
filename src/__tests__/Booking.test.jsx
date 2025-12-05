// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Booking from "../views/Booking";

describe("Booking Components", () => {
  const setup = () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );
    return { user };
  };

  it("User Story - Användaren ska kunna fylla i datum, tid, antal spelare och banor", async () => {
    const { user } = setup();

    // NU funkar detta eftersom label och input sitter ihop via ID!
    const dateInput = screen.getByLabelText(/Date/i);
    const timeInput = screen.getByLabelText(/Time/i);
    const peopleInput = screen.getByLabelText(/Number of awesome bowlers/i);
    const lanesInput = screen.getByLabelText(/Number of lanes/i);

    await user.type(dateInput, "2023-12-24");
    await user.type(timeInput, "18:00");
    await user.type(peopleInput, "2");
    await user.type(lanesInput, "1");

    expect(dateInput.value).toBe("2023-12-24");
    expect(timeInput.value).toBe("18:00");
    expect(peopleInput.value).toBe("2");
    expect(lanesInput.value).toBe("1");
  });
});
