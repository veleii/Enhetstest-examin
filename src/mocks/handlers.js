import { http, HttpResponse } from "msw";

export const handlers = [
  http.post(
    "https://731xy9c2ak.execute-api.eu-north-1.amazonaws.com/booking",
    () => {
      return HttpResponse.json({
        bookingDetails: {
          when: "2023-10-31T18:00",
          lanes: "1",
          people: "2",
          shoes: ["42", "43"],
          price: 340,
          bookingId: "STR8882",
          active: true,
        },
      });
    }
  ),
];
