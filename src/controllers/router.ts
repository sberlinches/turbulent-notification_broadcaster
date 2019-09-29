import {Router} from 'express';
import {expressWS} from '../lib/httpServer';
import {EventController} from './event.controller';

export const router = Router();

// WS routes
router.ws('/events.subscribeScheduledEvents', (ws, req) => {
  EventController.subscribeScheduledEvents(
    // @ts-ignore
    expressWS.getWss('/events.subscribeScheduledEvents'),
    req,
  );
});
