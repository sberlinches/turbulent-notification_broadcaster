import config from 'config';
import * as http from 'http';
import express from 'express';
import expressWs from 'express-ws';

export const e = expressWs(express());
import {router} from '../controllers/router';
e.app.use(router);

export default class Server {

  private static server;

  /**
   * Creates and starts a HTTP server
   */
  public static async start(): Promise<http.Server> {
    return new Promise((resolve, reject) => {
      this.server = e.app.listen(config.get('node.port'), config.get('node.host'), (err) => {
        if (err) {
          return reject(err);
        }

        // tslint:disable-next-line:no-console
        console.log('Server listening on: %s:%s (%s)',
          config.get('node.host'),
          config.get('node.port'),
          e.app.get('env'),
        );

        resolve(this.server);
      });
    });
  }

  /**
   * Closes the HTTP server
   */
  public static close(): void {
    if (this.server) {
      // tslint:disable-next-line:no-console
      console.log('Server closed');
      this.server.close();
    }
  }
}
