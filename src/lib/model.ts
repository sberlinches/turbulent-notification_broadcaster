import {CollectionCreateOptions, MongoClient, Collection} from 'mongodb';

export abstract class Model {

  protected readonly _client: MongoClient;
  protected abstract _collection: Collection;
  public abstract dbName: string;
  public abstract collectionName: string;
  public abstract collectionOptions: CollectionCreateOptions;

  protected constructor(client: MongoClient) {
    this._client = client;
  }

  public abstract get collection(): Collection;
}
