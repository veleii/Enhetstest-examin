// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Confirmation from "../views/Confirmation";

describe("Confirmation Component - Tester kopplade till User Stories", () => {
  it("US4 AC2-4: Ska visa bokningsdetaljer och totalsumma om de skickas via state", () => {
    const mockBooking = {
      when: "2023-10-31T18:00",
      people: "2",
      lanes: "1",
      bookingId: "STR1234",
      price: 340,
    };

    render(
      <MemoryRouter
        initialEntries={[{ state: { confirmationDetails: mockBooking } }]}
      >
        <Confirmation />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/When/i)).toHaveValue("2023-10-31 18:00");
    expect(screen.getByLabelText(/Who/i)).toHaveValue("2");
    expect(screen.getByLabelText(/Lanes/i)).toHaveValue("1");
    expect(screen.getByLabelText(/Booking number/i)).toHaveValue("STR1234");
    expect(screen.getByText(/340 sek/i)).toBeInTheDocument();
  });

  it('US5 AC2: Ska visa "Inga bokning gjord!" om ingen information finns', () => {
    sessionStorage.clear();

    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );

    expect(screen.getByText("Inga bokning gjord!")).toBeInTheDocument();
  });

  it("US5 AC3: Ska visa bokningsdetaljer från sessionStorage om state saknas", () => {
    const mockBooking = {
      when: "2023-11-01T19:00",
      people: "4",
      lanes: "1",
      bookingId: "STR9999",
      price: 580,
    };

    sessionStorage.setItem("confirmation", JSON.stringify(mockBooking));

    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Booking number/i)).toHaveValue("STR9999");

    sessionStorage.removeItem("confirmation");
  });
});
