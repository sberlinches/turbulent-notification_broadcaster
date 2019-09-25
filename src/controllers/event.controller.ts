import {Request} from 'express';
import {EventUpdateWatcher} from '../watchers/eventUpdate.watcher';
import * as ws from 'ws';

export class EventController {

  /**
   * @param {ws.Server} wss — WebSocket server
   * @param {WebSocket} ws — Websocket connection
   * @param {Request} req — HTTP request argument
   */
  public static test = (wss: ws.Server, ws, req: Request): void => {
    EventUpdateWatcher.subscribe(wss.clients);
  }
}
