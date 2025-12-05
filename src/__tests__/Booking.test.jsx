// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Booking from "../views/Booking";

/* Sätter upp min user */

describe("Booking Component - Tester för User Story 1 & Felhantering", () => {
  const setup = () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );
    return { user };
  };

  it("User Story 1: Ska kunna fylla i all data korrekt", async () => {
    const { user } = setup();

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
  /* Felmeddelanden */

  it("Error: Ska visa felmeddelande om fält saknas", async () => {
    const { user } = setup();

    await user.click(screen.getByText("strIIIIIike!"));

    expect(
      screen.getByText("Alla fälten måste vara ifyllda")
    ).toBeInTheDocument();
  });

  it("Error: Ska visa felmeddelande om antalet skor inte matchar antalet spelare", async () => {
    const { user } = setup();

    await user.type(screen.getByLabelText(/Date/i), "2023-12-24");
    await user.type(screen.getByLabelText(/Time/i), "18:00");
    await user.type(screen.getByLabelText(/Number of lanes/i), "1");

    await user.type(screen.getByLabelText(/Number of awesome bowlers/i), "2");

    await user.click(screen.getByText("+"));

    await user.type(screen.getByLabelText(/Shoe size \/ person 1/i), "42");

    await user.click(screen.getByText("strIIIIIike!"));

    expect(
      screen.getByText("Antalet skor måste stämma överens med antal spelare")
    ).toBeInTheDocument();
  });

  it("Error: Ska visa felmeddelande om man lagt till skor men missat fylla i storlek", async () => {
    const { user } = setup();

    await user.type(screen.getByLabelText(/Date/i), "2023-12-24");
    await user.type(screen.getByLabelText(/Time/i), "18:00");
    await user.type(screen.getByLabelText(/Number of lanes/i), "1");
    await user.type(screen.getByLabelText(/Number of awesome bowlers/i), "1");

    await user.click(screen.getByText("+"));

    await user.click(screen.getByText("strIIIIIike!"));

    expect(
      screen.getByText("Alla skor måste vara ifyllda")
    ).toBeInTheDocument();
  });

  it("Error: Ska visa felmeddelande om man bokar för många spelare per bana", async () => {
    const { user } = setup();

    await user.type(screen.getByLabelText(/Date/i), "2023-12-24");
    await user.type(screen.getByLabelText(/Time/i), "18:00");

    await user.type(screen.getByLabelText(/Number of awesome bowlers/i), "5");
    await user.type(screen.getByLabelText(/Number of lanes/i), "1");

    const addShoeBtn = screen.getByText("+");
    for (let i = 0; i < 5; i++) {
      await user.click(addShoeBtn);
    }

    const shoeInputs = screen.getAllByLabelText(/Shoe size/i);
    for (const input of shoeInputs) {
      await user.type(input, "40");
    }

    await user.click(screen.getByText("strIIIIIike!"));

    expect(
      screen.getByText("Det får max vara 4 spelare per bana")
    ).toBeInTheDocument();
  });
});
