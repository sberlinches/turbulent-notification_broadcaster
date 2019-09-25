import {Router} from 'express';
import {expressWS} from '../lib/server';
import {EventController} from './event.controller';

export const router = Router();

router.ws('/events.subscribeScheduledEvents', () => {
  // @ts-ignore
  EventController.subscribeScheduledEvents(expressWS.getWss('/events'));
});
