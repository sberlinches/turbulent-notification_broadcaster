import {Router} from 'express';
import {expressWS} from '../lib/server';
import {EventController} from './event.controller';

export const router = Router();

router.ws('/events.subscribeScheduledEvents', () => {
  EventController.subscribeScheduledEvents(
    // @ts-ignore
    expressWS.getWss('/events.subscribeScheduledEvents'),
  );
});
