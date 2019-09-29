import {Request} from 'express';
import {Server} from 'ws';
import {EventUpdateWatcher} from '../watchers/eventUpdate.watcher';

export class EventController {

  /**
   * Subscribe scheduled events
   * The subscribed client will receive the next scheduled events
   * @param {Server} wss — WebSocket server
   * @param {Request} req — HTTP request argument
   */
  public static subscribeScheduledEvents = (wss: Server, req: Request): void => {

    console.log('%o: %s client(s) listening to: %s', new Date(), wss.clients.size, req.originalUrl);
    EventUpdateWatcher.subscribe(wss.clients);
  }
}
