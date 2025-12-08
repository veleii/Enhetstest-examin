// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import Booking from "../views/Booking";
import Confirmation from "../views/Confirmation";

describe("Booking Component - Tester kopplade till User Stories", () => {
  const setup = () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );
    return { user };
  };

  it("US1 AC1-3: Ska kunna boka datum, tid, antal spelare och banor", async () => {
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

  it("US1 VG: Ska visa felmeddelande om fält saknas vid bokning", async () => {
    const { user } = setup();
    await user.click(screen.getByText("strIIIIIike!"));
    expect(
      screen.getByText("Alla fälten måste vara ifyllda")
    ).toBeInTheDocument();
  });

  it("US1 VG: Ska visa felmeddelande om man bokar för många spelare per bana", async () => {
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

  it("US2 AC1-3: Ska kunna lägga till skor och välja storlek", async () => {
    const { user } = setup();
    const addShoeBtn = screen.getByText("+");
    await user.click(addShoeBtn);
    const shoeInputs = screen.getAllByLabelText(/Shoe size/i);
    expect(shoeInputs).toHaveLength(1);
    await user.type(shoeInputs[0], "42");
    expect(shoeInputs[0].value).toBe("42");
  });

  it("US2 VG: Ska visa felmeddelande om antalet skor inte matchar antalet spelare", async () => {
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

  it("US2 VG: Ska visa felmeddelande om man lagt till skor men missat fylla i storlek", async () => {
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

  it("US3 AC1-3: Ska kunna ta bort ett skofält", async () => {
    const { user } = setup();
    const addShoeBtn = screen.getByText("+");
    await user.click(addShoeBtn);
    expect(screen.getAllByLabelText(/Shoe size/i)).toHaveLength(1);
    const removeShoeBtn = screen.getByText("-");
    await user.click(removeShoeBtn);
    const remainingShoes = screen.queryAllByLabelText(/Shoe size/i);
    expect(remainingShoes).toHaveLength(0);
  });

  it("US4 AC1-3 & US5 AC1: Ska kunna boka, navigera och spara data", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(
      [
        { path: "/", element: <Booking /> },
        { path: "/confirmation", element: <Confirmation /> },
      ],
      { initialEntries: ["/"] }
    );
    render(<RouterProvider router={router} />);

    await user.type(screen.getByLabelText(/Date/i), "2023-12-24");
    await user.type(screen.getByLabelText(/Time/i), "18:00");
    await user.type(screen.getByLabelText(/Number of awesome bowlers/i), "2");
    await user.type(screen.getByLabelText(/Number of lanes/i), "1");

    const addShoeBtn = screen.getByText("+");
    await user.click(addShoeBtn);
    await user.click(addShoeBtn);

    const shoeInputs = screen.getAllByLabelText(/Shoe size/i);
    await user.type(shoeInputs[0], "42");
    await user.type(shoeInputs[1], "44");

    const bookButton = screen.getByText("strIIIIIike!");
    await user.click(bookButton);

    await waitFor(() => {
      expect(screen.getByText(/see you soon/i)).toBeInTheDocument();
    });

    expect(screen.getByDisplayValue(/STR8882/i)).toBeInTheDocument();
  });
});
