export interface Database {
  public: {
    Tables: {
      events: {
        Row: Event;
        Insert: Omit<Event, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Event, "id" | "created_at" | "updated_at">>;
      };
    };
  };
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  location: string;
  event_date: string;
  day_of_week: string;
  image_url: string | null;
  tags: string[];
  link: string | null;
  created_at: string;
  updated_at: string;
}
