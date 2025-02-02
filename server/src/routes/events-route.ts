import express from 'express';
import { Request, Response } from 'express';
import { verifySession, protectRoute } from '../middleware/user-middleware';

const router = express.Router();

// GET /api/events/ - Get all events
// router.get('/', verifySession, getAllEvents);

// GET /api/events/:id - Get a single event by ID
// router.get('/:id', verifySession, getEventById);   

// GET /api/events/me - Get user rsvp events
// router.get('/me', verifySession, getMyEvents);

// GET /api/events/host/ - Get all events hosted by a user
// router.get('/host/', verifySession, getEventsByHost);

// GET /api/events/:id/attendees - Get all attendees for an event
// router.get('/:id/attendees', verifySession, getEventAttendees);

// POST: /api/events/ - Create a new event
// router.post('/', verifySession, protectRoute(['Read-Write', 'Full Access']), createEvent);

// POST: /api/events/:id/attendees - Register user for an event
// router.post('/:id/attendees', verifySession, registerForEvent);

// PATCH /api/events/:id - Update an event by ID. This is a partial update
// router.patch('/:id', verifySession, protectRoute(['Read-Write', 'Full Access']), updateEvent);

// PUT /api/events/:id - Update an event by ID. This is a full update
// router.put('/:id', verifySession, protectRoute(['Full Access']), updateEvent);

// DELETE /api/events/:id - Delete an event by ID
// router.delete('/:id', verifySession, protectRoute(['Full Access']), deleteEvent);


export default router;