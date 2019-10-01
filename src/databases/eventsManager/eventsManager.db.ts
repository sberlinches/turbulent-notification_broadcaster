import {MongoClient} from 'mongodb';
import {MongoConnection} from '../../lib/mongoConnection';
import {EventsCollection} from './collections/events.collection';
import config from 'config';

/**
 * Event Manager database
 */
export class EventsManagerDb {

  private static readonly _mongoEventsManager = new MongoConnection(
    config.get('databases.mongoEventsManager.host'),
    config.get('databases.mongoEventsManager.port'),
    config.get('databases.mongoEventsManager.user'),
    config.get('databases.mongoEventsManager.password'),
    config.get('databases.mongoEventsManager.clientOptions'),
  );

  // Collections
  public static events;

  /**
   * Connects to the database
   * @return {Promise<void>}
   */
  public static connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._mongoEventsManager.connect()
        .then((mongoClient) => {
          this.initialize(mongoClient);
          resolve();
        })
        .catch(reject);
    });
  }

  /**
   * Closes the database connection
   */
  public static close(): void {
    this._mongoEventsManager.close();
  }

  /**
   * Initializes the collections (collections)
   * @param {MongoClient} mongoClient
   */
  private static initialize(mongoClient: MongoClient): void {
    this.events = new EventsCollection(mongoClient);
  }
}
