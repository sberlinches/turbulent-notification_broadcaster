import {HttpServer} from './lib/httpServer';
import {EventsManagerDb} from './databases/eventsManager/eventsManager.db';
import {EventUpdateWatcher} from './watchers/eventUpdate.watcher';

HttpServer.start()
  .then(() => EventsManagerDb.connect())
  .then(() => EventUpdateWatcher.watch())
  .catch(() => {
    HttpServer.stop();
    EventsManagerDb.close();
  });
