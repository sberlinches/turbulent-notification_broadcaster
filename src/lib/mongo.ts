import {MongoClient, MongoClientOptions} from 'mongodb';
import {EventModel} from '../models/event.model';
import config from 'config';

export class Mongo {

  private static readonly host: string = config.get('mongo.host');
  private static readonly port: number = config.get('mongo.port');
  private static readonly user: string; // config.get('mongo.user');
  private static readonly password: string; // config.get('mongo.password');
  private static readonly options: MongoClientOptions = config.get('mongo.clientOptions');
  private static client: MongoClient;
  private static models;

  /**
   * Connects to a Mongo DB
   * @return {Promise<void>}
   */
  public static async connect(): Promise<void> {

    return new Promise((resolve, reject) => {
      MongoClient.connect(this.url, this.options)
        .then((client) => {
          console.log('%o: Mongo connected to: %s', new Date(), this.url);
          this.client = client;
        })
        .catch((err) => {
          console.log('%o: Mongo failed to connect to: %s', new Date(), this.url);
          reject();
        })
        .then(() => this.loadModels())
        .then(() => resolve())
        .catch(() => reject());
    });
  }

  /**
   * Prepares the URL string
   */
  private static get url(): string {

    let url = 'mongodb://';

    if (this.user)
      url += `${this.user}:${this.password}@`;

    return url + `${this.host}:${this.port}`;
  }

  /**
   * Loads the models
   */
  private static async loadModels(): Promise<void[]> {

    const event = new EventModel(this.client);

    this.models = { event };

    return new Promise((resolve, reject) => {
      Promise.all([
        event.createCollection(),
      ]).then(() => resolve())
        .catch(() => {
          console.log('%o: Mongo failed to create the collections', new Date());
          reject();
        });
    });
  }

  /**
   * Returns the loaded models
   */
  public static get model() {
    return this.models;
  }

  /**
   * Closes the Mongo DB connection
   */
  public static close(): void {
    if (this.client) {
      console.log('%o: Mongo connection closed', new Date());
      this.client.close();
    }
  }
}
