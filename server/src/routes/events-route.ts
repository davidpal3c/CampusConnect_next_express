import express from 'express';
import { Request, Response } from 'express';
import { verifySession, validatePermissions } from '../middleware/user-middleware';
import { adminRoute } from '../middleware/user-middleware';
import { getAllEvents, getEventById, getMyEvents, getEventsByHost, getEventAttendees, 
    createEvent, registerForEvent, updateEvent, updateEventFull, deleteEvent, 
    unregisterForEvent } from '../controllers/events-controller';

const router = express.Router();

// GET /api/events/ - Get all events
router.get('/', verifySession, getAllEvents);

// GET /api/events/:id - Get event by ID
router.get('/:id', verifySession, getEventById);   

// GET /api/events/me - Get user rsvp events
router.get('/me', verifySession, getMyEvents);

// GET /api/events/host/ - Get all events by host
router.get('/host/', verifySession, getEventsByHost);

// GET /api/events/:id/attendees - Get all attendees(data) for an event
router.get('/:id/attendees', verifySession, adminRoute, getEventAttendees);

// POST: /api/events/ - Create a new event
router.post('/', verifySession, adminRoute, validatePermissions(['Read-Write', 'Full Access']), createEvent);

// POST: /api/events/:id/attendees - Register user for an event
router.post('/:id/attendees', verifySession, registerForEvent);

// PATCH /api/events/:id - Update an event by ID. This is a partial update
router.patch('/:id', verifySession, adminRoute, validatePermissions(['Read-Write', 'Full Access']), updateEvent);

// PUT /api/events/:id - Update an event by ID. This is a full update
router.put('/:id', verifySession, adminRoute, validatePermissions(['Full Access']), updateEventFull);

// DELETE /api/events/:id - Delete an event by ID
router.delete('/:id', verifySession, adminRoute, validatePermissions(['Full Access']), deleteEvent);

// DELETE /api/events/:id/attendee - Unregister attendee from an event
router.delete('/:id/attendee', verifySession, unregisterForEvent);

export default router;