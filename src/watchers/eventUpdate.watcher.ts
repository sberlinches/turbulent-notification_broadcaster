import WebSocket from 'ws';
import schedule from 'node-schedule';
import {Mongo} from '../lib/mongo';
import {Event} from '../models/event.model';

// TODO: Create a scheduler module
export class EventUpdateWatcher {

  private static subscribers: Set<WebSocket>;

  /**
   * Watches the changes in the event collection
   * TODO: Watch multiple events inside the collection
   */
  public static watch(): void {

    Mongo.model.event.collection
      .watch()
      .on('change', async (event) => {

        console.log('%o: New Document scheduledAt: %o', new Date(), event.fullDocument.scheduledAt);

        // TODO: Limit the number of declared jobs
        Mongo.model.event.getNonExpiredEvents()
          .then((events) => {

            // Erases all the scheduled jobs
            // TODO: filter them by origin
            for (const job in schedule.scheduledJobs) {
              schedule.scheduledJobs[job].cancel();
            }

            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < events.length; i++) {
              this.emit(events[i]);
            }
          });
      });
  }

  /**
   * Subscribes a group of clients to the watcher
   * TODO: Accept multiple subscribers
   * @param {Set<WebSocket>} clients — A set of sockets
   */
  public static subscribe(clients: Set<WebSocket>): void {
    this.subscribers = clients;
  }

  /**
   * Emits the data to the subscribed clients
   * @param {Event} event — A string of data
   */
  private static emit(event: Event): void {

    schedule.scheduleJob(event.scheduledAt, () => {
      console.log('%o: %s client(s): Broadcasting: %s', new Date(), this.subscribers.size, event.title);
      this.subscribers.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(event.title);
        }
      });
    });
  }
}
