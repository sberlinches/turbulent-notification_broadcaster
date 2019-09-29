import {Router} from 'express';
import {expressWS} from '../lib/httpServer';
import {EventController} from './event.controller';

export const router = Router();

router.ws('/events.subscribeScheduledEvents', () => {
  EventController.subscribeScheduledEvents(
    // @ts-ignore
    expressWS.getWss('/events.subscribeScheduledEvents'),
  );
});
