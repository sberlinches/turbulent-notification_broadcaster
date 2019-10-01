import {MongoClient, Collection} from 'mongodb';

/**
 * Mongo collection
 */
export abstract class MongoCollection {

  protected readonly _mongoClient: MongoClient;
  protected abstract readonly _collection: Collection<any>;
  public abstract readonly dbName: string;
  public abstract readonly collectionName: string;

  /**
   * @param {MongoClient} mongoClient
   */
  protected constructor(mongoClient: MongoClient) {
    this._mongoClient = mongoClient;
  }
}
