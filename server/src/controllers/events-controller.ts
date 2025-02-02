import { createArticle } from './articles-controller';
import { Request, Response } from 'express';
import { prisma } from '../config/prismaClient';
// import validator from 'validator';


// export type UserEventWhereInput = {
//     id?: String | string;
//     user_id?: String | string;
//     user_email?: String | string; 
//     event_id?: String | string;
//     rsvp?: Boolean | boolean;
//   };

// TODO - log operations (user_id, event_id, operation, timestamp)


// GET /api/events/ - Get all events
export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany(); 
        res.json(events);
    } catch (error) {
        console.log("error getting all events", error);
        res.status(500).json({ message: "Server Error: could not fetch events", error: error });
    } finally {
        await prisma.$disconnect(); 
    }
}   

// GET /api/events/:id - Get a single event by ID
export const getEventById = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { event_id } = req.params;
        const event = await prisma.event.findUnique({
            where: { event_id: event_id }
        });

        if (!event) {
            res.status(404).json({ error: 'Event not found in the database' });
            return;
        }

        res.status(200).json(event);
        return;

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error: Article could not be fetched' });
        return;
    }
}

// GET /api/events/me - Get user rsvp events
export const getMyEvents = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        // if (!validator.isEmail(email)) {
        //     return res.status(400).json({ error: 'Invalid email format' });
        // }

        const userEventsId = await prisma.userEvent.findMany({
            where: { user_email: email} as any,                     // had to cast as any, prisma client was not recognizing the type
            select: {
                event_id: true
            }
        });

        if (!userEventsId) {
            res.status(404).json({ error: 'User has no rsvp events' });
            return;
        }

        let userEvents = await prisma.event.findMany({
            where: { event_id: { in: userEventsId.map(eventId => eventId.event_id) }}
        });

        res.status(200).json(userEvents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error: Events could not be fetched' });
        return;
    }
}

// GET /api/events/host/ - Get all events hosted by a user
export const getEventsByHost = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        let userHostedEvents = await prisma.event.findMany({
            where: { host: email }
        });

        if (!userHostedEvents) {
            res.status(404).json({ error: 'User has no hosted events' });
            return;
        }

        res.status(200).json(userHostedEvents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error: Events could not be fetched' });
        return;
    }
}

// GET /api/events/:id/attendees - Get all attendees for an event
export const getEventAttendees = async (req: Request, res: Response) => {
    try {
        const eventId = req.params;
        const eventAttendees = await prisma.event.findMany({
            where: { event_id: eventId },
            select: {
                current_attendees: true
            }
        }); 
        
        if (!eventAttendees) {
            res.status(404).json({ error: 'Event has no attendees' });
            return;
        }

        res.status(200).json(eventAttendees);
    } catch (error) {
        console.log("error getting event attendees", error);
        res.status(500).json({ message: "Server Error: could not fetch event attendees", error: error });
    }
};

// POST: /api/events/ - Create new event
export const createEvent = async (req: Request, res: Response) => {
    try {
        const { name, date, location, 
            audience, host, contact, 
            capacity, current_attendees } = req.body;

        const newEvent = await prisma.event.create({
            data: {
                name: name,
                date: date,
                location: location,
                audience: audience,
                host: host,
                contact: contact,
                capacity: capacity,
                current_attendees: current_attendees ? current_attendees : 0
            }
        });

        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Server: event creation route. ', error);
        res.status(500).json({ error: 'Internal server error: Event could not be created' });
        return;
    }
}