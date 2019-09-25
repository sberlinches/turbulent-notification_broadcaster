import {MongoClient, MongoClientOptions} from 'mongodb';
import {EventModel} from '../models/event.model';
import config from 'config';

export default class Mongo {

  private static readonly host: string = config.get('mongo.host');
  private static readonly port: number = config.get('mongo.port');
  private static readonly user: string; // config.get('mongo.user');
  private static readonly password: string; // config.get('mongo.password');
  private static readonly options: MongoClientOptions = config.get('mongo.clientOptions');
  private static client: MongoClient;
  private static models;

  /**
   * Connects to a Mongo DB
   */
  public static async connect(): Promise<MongoClient> {

    return new Promise((resolve, reject) => {
      MongoClient.connect(this.url(), this.options)
        .then((client) => {
          // tslint:disable-next-line:no-console
          console.log(`Mongo connected on: ${ this.host }:${ this.port }`);
          this.client = client;
        })
        .then(() => this.loadModels())
        .then(() => resolve(this.client))
        .catch((err) => reject(err));
    });
  }

  /**
   * Prepares the URL string
   */
  private static url(): string {

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

    return Promise.all([
      event.createCollection(),
    ]);
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
      // tslint:disable-next-line:no-console
      console.log('Mongo closed');
      this.client.close();
    }
  }
}
