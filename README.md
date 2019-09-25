# Notification broadcaster

## Installation

```bash
$ npm install
$ npm run build
```

## Convert a Standalone MongoDB instance to a Replica Set
This is a requirement to use the [Change Streams](https://docs.mongodb.com/manual/changeStreams/), a feature to watch real-time DB changes.

[Mongo documentation](https://docs.mongodb.com/v3.2/tutorial/convert-standalone-to-replica-set/)

### Summary:
```bash
$ sudo service mongod stop
$ sudo mkdir -p /data/db
$ sudo mongod --replSet "rs0"
// Keep this instance running
```
Open a new terminal
```bash
$ mongo
  > rs.initiate()
  > exit;
```

## Run
```bash
$ npm start
```

## Private socket
[ws://localhost:8080/events.subscribeScheduledEvents](ws://localhost:8080/events.subscribeScheduledEvents)
