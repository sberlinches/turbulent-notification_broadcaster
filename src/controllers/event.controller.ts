import {EventUpdateWatcher} from '../watchers/eventUpdate.watcher';
import * as ws from 'ws';

export class EventController {

  /**
   * Subscribe scheduled events
   * The subscribed client will receive the next scheduled events
   * @param {ws.Server} wss — WebSocket server
   */
  public static subscribeScheduledEvents = (wss: ws.Server): void => {
    EventUpdateWatcher.subscribe(wss.clients);
  }
}
