export type Event = {
    event_id: string;
    name: string;
    date: string;
    location: string;
    audience: any; // You can replace this with a more specific type if necessary
    host?: string;
    contact: string;
    capacity: number;
    current_attendees: number;
    form_id?: string;
    //Categories: EventCategory[];
    //UserEvents: UserEvent[];
    //form?: Form;
  };