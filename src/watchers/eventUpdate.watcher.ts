import WebSocket from 'ws';
import {Watcher} from '../lib/watcher';
import Mongo from '../lib/mongo';

export class EventUpdateWatcher implements Watcher {

  private static subscribers: Set<WebSocket>;

  /**
   * Watches the changes in the event collection
   */
  public static watch(): void {

    Mongo.model.event.collection
      .watch()
      .on('change', async (event) => {
        console.log('%o: New Document scheduledAt: %o', new Date(), event.fullDocument.scheduledAt);

        this.emit('test');
      });
  }

  /**
   * Subscribes a group of clients to the watcher
   * TODO: Accept multiple subscribers
   * @param {} clients —
   */
  public static subscribe(clients: Set<WebSocket>): void {
    this.subscribers = clients;
  }

  /**
   * Emits the data to the subscribed clients
   * @param {string} data — A string of data
   */
  private static emit(data: string): void {

    console.log('%o: %s clients: Broadcasting: %s', new Date(), this.subscribers.size, data);

    this.subscribers.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }
}
