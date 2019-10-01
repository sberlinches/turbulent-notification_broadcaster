import config from 'config';
import {Collection, MongoClient, ObjectID} from 'mongodb';
import {MongoCollection} from '../../../lib/mongoCollection';

/**
 * Event entity
 */
export interface Event {
  readonly _id?: ObjectID;
  title: string;
  scheduledAt: Date;
}

/**
 * Event model
 */
export class EventsCollection extends MongoCollection {

  _collection: Collection<Event>;
  dbName: string;
  collectionName: string;

  constructor(mongoClient: MongoClient) {
    super(mongoClient);

    this.dbName = config.get('databases.mongoEventsManager.dbName');
    this.collectionName = config.get('databases.mongoEventsManager.collections.events.collectionName');
    this._collection = this.createCollection();
  }

  /**
   * Creates the collection
   */
  private createCollection(): Collection<Event> {
      return this._mongoClient
        .db(this.dbName)
        .collection(this.collectionName);
  }

  /**
   * @return {Collection<Event>}
   */
  public get collection(): Collection<Event> {
    return this._collection;
  }

  /**
   * Gets the events after the current date
   * @return {Promise<Array<Event>>} — A list of events
   */
  public async getNonExpiredEvents(): Promise<Array<Event>> {
    return this._collection
      .find({ scheduledAt: { $gte: new Date() } })
      .sort({ scheduledAt: 1 })
      .toArray();
  }
}
