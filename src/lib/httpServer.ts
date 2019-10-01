import config from 'config';
import express from 'express';
import expressWs from 'express-ws';

const app = express();
const expressWS = expressWs(app);

import {router} from '../controllers/router';
app.use(router);

/**
 * HTTP Server
 */
class HttpServer {

  private static readonly host: string = config.get('server.host');
  private static readonly port: number = config.get('server.port');
  private static server;

  /**
   * Creates and starts a HTTP server
   */
  public static async start(): Promise<void> {
    return new Promise((resolve, reject) => {

      const completeURL = `http://${this.host}:${this.port}`;
      let msg;

      this.server = app
        .listen(this.port, this.host, () => {
          msg = `Server running on: ${completeURL}`;
          console.log('%o: %s', new Date(), msg);
          resolve();
        })
        .on('error', (e) => {
          msg = `Server failed to run on: ${completeURL}`;
          console.log('%o: %s', new Date(), msg);
          reject();
        });
    });
  }

  /**
   * Closes the HTTP server
   */
  public static stop(): void {
    if (this.server) {
      console.log('%o: Server closed', new Date());
      this.server.close();
    }
  }
}

export {HttpServer, expressWS, app};
