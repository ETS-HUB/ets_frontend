export interface EventCardData {
  id: string;
  date: {
    day: string;
    dayOfWeek: string;
  };
  title: string;
  location: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  imageAlt?: string;
  event_date: string;
}

export interface EventsByMonth {
  [month: string]: EventCardData[];
}
