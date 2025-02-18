import { createArticle } from './articles-controller';
import { Request, Response } from 'express';
import { prisma } from '../config/prismaClient';
import { connect } from 'http2';
// import validator from 'validator';

export interface AuthenticatedRequest extends Request {
    user?: any; 
}
// export type UserEventWhereInput = {
//     id?: String | string;
//     user_id?: String | string;
//     user_email?: String | string; 
//     event_id?: String | string;
//     rsvp?: Boolean | boolean;
//   };

// TODO - email confirmations / notification middleware post event creation
// TODO - log operations (user_id, event_id, operation, timestamp)
// TODO - complete validation on all routes

// GET /api/events/ - Get all events
export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany(); 

        if(events.length === 0) {
            res.status(404).json({ error: 'No events found in the database (array)' });
            return;
        }

        if (!events) {
            res.status(404).json({ error: 'No events found in the database' });
            return;
        }

        res.json(events);
    } catch (error) {
        console.log("error getting all events", error);
        res.status(500).json({ message: "Server Error: could not fetch events", error: error });
    } finally {
        await prisma.$disconnect(); 
    }
}   

// GET /api/events/:id - Get event by ID
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
export const getMyEvents = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { email } = req.user.decodedClaims;

        const userEvents = await prisma.userEvent.findMany({
            where: { user_email: email} as any,                     // had to cast as any, prisma client was not recognizing the type
            include: {
                Event: true
            }
        });

        if (!userEvents) {
            res.status(404).json({ error: 'User has no rsvp events' });
            return;
        }

        res.status(200).json(userEvents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error: Events could not be fetched' });
        return;
    }
}

// GET /api/events/host/ - Get all events own by a user
export const getEventsByHost = async (req: Request, res: Response) => {
    try {

        const { host } = req.body;

        if (!host) {
            res.status(400).json({ error: 'Host not provided in request body.' });
            return;
        }

        const eventsByHost = await prisma.event.findMany({
            where: { host: host }   
        })

        if (!eventsByHost) {
            res.status(404).json({ error: 'Host has no events' });
            return;
        }

        res.status(200).json(eventsByHost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error: Events could not be fetched' });
        return;
    }
}

// GET /api/events/:id/attendees-data - Get all attendees(data) for an event
export const getEventAttendees = async (req: Request, res: Response) => {
    try {
        const eventId = req.params;

        const attendees = await prisma.userEvent.findMany({
            where: { event_id: eventId, rsvp: true },
            include: {
                User: true
            }
        }); 
        
        if (attendees.length === 0) {
            res.status(404).json({ error: 'Event has no attendees' });
            return;
        }

        res.status(200).json(attendees);
    } catch (error) {
        console.log("error getting event attendees", error);
        res.status(500).json({ message: "Server Error: could not fetch event attendees", error: error });
    }
};

// POST: /api/events/ - Create new event
export const createEvent = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { name, date, location, 
            audience, host, contact, 
            capacity, current_attendees } = req.body;

        const { email } = req.user.decodedClaims;
        const { userId } = req.user;

        const newEvent = await prisma.event.create({
            data: {
                name: name,
                date: date,
                location: location,
                audience: audience,
                host: host,
                contact: contact,
                capacity: capacity,
                current_attendees: current_attendees ? current_attendees : 0,
            }
        });

        await prisma.userEvent.create({
            data: {
                user_id: userId,
                event_id: newEvent.event_id,
                user_email: email,
                rsvp: false,
                owned: true,
            } as any
        });

        // send email to user confirming event creation (ownership)

        res.status(201).json({ message: 'Event created successfully' });
    } catch (error) {
        console.error('Server: event creation route. ', error);
        res.status(500).json({ error: 'Internal server error: Event could not be created' });
        return;
    }
}

// POST: /api/events/:id/attendees - Register user for an event
export const registerForEvent = async (req: Request, res: Response) => {
    try {
        const { event_id, user_id, user_email } = req.body;

        // check if user is already registered for event
        const userEvent = await prisma.userEvent.findUnique({
            where: { event_id: event_id, user_email: user_email } as any
        });

        if (userEvent) {
            res.status(400).json({ error: 'User is already registered for event' });
            return;
        }

        const eventData = await prisma.event.findUnique({
            where: { event_id: event_id },
            select: {
                capacity: true,
                current_attendees: true
            }
        })

        if (!eventData) {
            res.status(404).json({ error: 'Event not found' });
            return;
        }

        if (eventData.current_attendees >= eventData.capacity) {
            res.status(400).json({ error: 'Event is at capacity' });
            return;
        }

        await prisma.userEvent.create({
            data: {
                user_id: user_id,
                event_id: event_id,
                rsvp: true,
                user_email: user_email,
            } as any
        });

        await prisma.event.update({
            where: { event_id: event_id},
            data: {
                current_attendees: eventData.current_attendees + 1
            }
        })

        // send email to user confirming registration

        res.status(201).json(userEvent);
    } catch (error) {
        console.error('Server: event registration route. ', error);
        res.status(500).json({ error: 'Internal server error: User could not be registered for event' });
        return;
    }
}

// PATCH /api/events/:id - Update an event by ID. This is a partial update
export const updateEvent = async (req: Request, res: Response) => {
    try {
        const { event_id } = req.params;
        const { name, date, location, 
            audience, host, contact, 
            capacity, current_attendees } = req.body;

        const updateData: any = {};

        if (name) updateData.name = name;
        if (date) updateData.date = date;
        if (location) updateData.location = location;
        if (audience) updateData.audience = audience;
        if (host) updateData.host = host;
        if (contact) updateData.contact = contact;
        if (capacity) updateData.capacity = capacity;
        if (current_attendees && current_attendees < capacity) updateData.current_attendees = current_attendees;        

        // console.log("Update data: ", updateData);

        const updatedEvent = await prisma.event.update({
            where: { event_id: event_id },
            data: updateData
        });

        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error('Server: event update route. ', error);
        res.status(500).json({ error: 'Internal server error: Event could not be updated' });
        return;
    }
}

// PUT /api/events/:id - Update an event by ID. This is a full update
export const updateEventFull = async (req: Request, res: Response) => {
    try {
        const { event_id } = req.params;
        const { name, date, location, 
            audience, host, contact, 
            capacity, current_attendees } = req.body;

        const updatedEvent = await prisma.event.update({
            where: { event_id: event_id },
            data: {
                name: name,
                date: date,
                location: location,
                audience: audience,
                host: host,
                contact: contact,
                capacity: capacity,
                current_attendees: current_attendees
            }
        });

        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error('Server: event update route. ', error);
        res.status(500).json({ error: 'Internal server error: Event could not be updated' });
        return;
    }
}

// DELETE /api/events/:id - Delete an event by ID
export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const { event_id } = req.params;

        const deletedEvent = await prisma.event.delete({
            where: { event_id: event_id }
        });

        if (!deletedEvent) {
            res.status(404).json({ error: 'Event not found' });
            return;
        }

        res.status(200).json(deletedEvent);
    } catch (error) {
        console.error('Server: event delete route. ', error);
        res.status(500).json({ error: 'Internal server error: Event could not be deleted' });
        return;
    }
}

// DELETE /api/events/:id/attendees - Unregister user for an event
export const unregisterForEvent = async (req: Request, res: Response) => {
    try {
        const { event_id, user_email } = req.body;

        const userEvent = await prisma.userEvent.findUnique({
            where: { event_id: event_id, user_email: user_email } as any
        });

        if (!userEvent) {
            res.status(404).json({ error: 'User not registered for event' });
            return;
        }

        await prisma.userEvent.delete({
            where: { event_id: event_id, user_email: user_email } as any
        });


        const eventAttendeeCount = await prisma.event.findUnique({
            where: { event_id: event_id },
            select: {
                current_attendees: true
            }
        });

        if (!eventAttendeeCount || eventAttendeeCount.current_attendees === 0) {
            res.status(404).json({ error: 'Event data not found' });
            return;
        }

        await prisma.event.update({
            where: { event_id: event_id },
            data: {
                current_attendees: eventAttendeeCount.current_attendees - 1
            }
        });

        res.status(200).json(userEvent);
    } catch (error) {
        console.error('Server: event unregister route. ', error);
        res.status(500).json({ error: 'Internal server error: User could not be unregistered for event' });
        return;
    }
}