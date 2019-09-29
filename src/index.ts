import {HttpServer} from './lib/httpServer';
import {Mongo} from './lib/mongo';
import {EventUpdateWatcher} from './watchers/eventUpdate.watcher';

HttpServer.start()
  .then(() => Mongo.connect())
  .then(() => EventUpdateWatcher.watch())
  .catch(() => {
    HttpServer.stop();
    Mongo.close();
  });
