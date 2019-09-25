import Mongo from './lib/mongo';
import Server from './lib/server';
import {EventUpdateWatcher} from './watchers/eventUpdate.watcher';

// Starts in parallel
Promise.all([
    Mongo.connect(),
    Server.start(),
  ])
  .then(() => {
    EventUpdateWatcher.watch();
  })
  .catch((err) => {
    console.error('fail', err);
    Mongo.close();
    Server.close();
  });
