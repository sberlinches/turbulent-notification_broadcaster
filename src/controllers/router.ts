import {Router} from 'express';
import {e} from '../lib/server';
import {EventController} from './event.controller';

export const router = Router();

router.ws('/events', (ws, req) => {
  // @ts-ignore
  const wss = e.getWss('/events');
  EventController.test(wss, ws, req);
});
