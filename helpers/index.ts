import { EventCardData, EventsByMonth } from "@/types/event";

export const formatEventDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const dayOfWeek = date
    .toLocaleDateString("en-US", { weekday: "short" })
    .toUpperCase();
  const month = date
    .toLocaleDateString("en-US", { month: "long" })
    .toUpperCase();

  return { day, dayOfWeek, month };
};

export const groupEventsByMonth = (events: EventCardData[]): EventsByMonth => {
  return events.reduce((acc, event) => {
    const rawDate = event.event_date || event.date?.day;
    const date = new Date(rawDate);

    if (isNaN(date.getTime())) {
      console.warn("Invalid date found:", rawDate);
      return acc;
    }

    const month = date
      .toLocaleDateString("en-US", { month: "long" })
      .toUpperCase();

    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(event);

    return acc;
  }, {} as EventsByMonth);
};

export const sortMonthKeys = (monthKeys: string[]): string[] => {
  return monthKeys.sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA.getTime() - dateB.getTime();
  });
};
