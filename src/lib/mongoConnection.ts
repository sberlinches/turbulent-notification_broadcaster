import {MongoClient, MongoClientOptions} from 'mongodb';

/**
 * Mongo connection
 */
export class MongoConnection {

  private readonly _host: string;
  private readonly _port: number;
  private readonly _user: string;
  private readonly _password: string;
  private readonly _options: MongoClientOptions;
  private readonly _url: string;
  private _client: MongoClient;

  /**
   * Creates a MongoDB connection
   * @param {string} host
   * @param {number} port
   * @param {string} user
   * @param {string} password
   * @param {MongoClientOptions} options
   */
  constructor(host: string, port: number, user: string, password: string, options: MongoClientOptions) {
    this._host = host;
    this._port = port;
    this._user = user;
    this._password = password;
    this._options = options;
    this._url = this.prepareUrl();
  }

  /**
   * Prepares the URL string
   * @return {string}
   */
  private prepareUrl(): string {

    const authString = (this._user) ? `${this._user}:${this._password}@` : '';
    return `mongodb://${authString}${this._host}:${this._port}`;
  }

  /**
   * Connects to a MongoDB
   * @return {Promise<MongoClient>}
   */
  public async connect(): Promise<MongoClient> {

    return new Promise((resolve, reject) => {
      MongoClient.connect(this._url, this._options)
        .then((client) => {
          console.log('%o: Mongo connected to: %s', new Date(), this._url);
          this._client = client;
          resolve(client);
        })
        .catch((err) => {
          console.log('%o: Mongo failed to connect to: %s', new Date(), this._url);
          reject(err);
        });
    });
  }

  /**
   * Closes the MongoDB connection
   */
  public close(): void {
    if (this._client) {
      this._client.close()
        .then(() => {
          console.log('%o: Mongo connection closed', new Date());
        });
    }
  }
}
