const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
const serviceAccount = require('./permissions.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

const db = admin.firestore();

const body = (collection, req) => ({
  "pets": {
    name: req.body.name,
    species: req.body.species
  },
  "people": {
    name: req.body.name,
    job: req.body.job
  }
})[collection];

app.use(cors({ origin: true }));

// create
app.post('/api/:collection/create', (req, res) => {
  (async () => {
    try {
      const collection = req.params.collection
      await db.collection(collection).doc(`/${req.body.id}/`).create(
        body(collection, req)
      );
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// read single
app.get('/api/:collection/read/:id', (req, res) => {
  (async () => {
    try {
      const collection = req.params.collection
      const document = db.collection(collection).doc(req.params.id);
      let doc = await document.get();
      let response = doc.data();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// read all
app.get('/api/:collection/read', (req, res) => {
  (async () => {
    try {
      const collection = req.params.collection
      let query = db.collection(collection);
      let response = [];
      await query.get().then((querySnapshot) => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {
          const allDocs = {
            [doc.id]: {
              [collection]: doc.data()
            }
          };
          response.push(allDocs);
        }
        return console.log('Meaningless return statement, satisfying lint')
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// update
app.put('/api/:collection/update/:id', (req, res) => {
  (async () => {
    try {
      const collection = req.params.collection
      const document = db.collection(collection).doc(req.params.id);
      await document.update(
        body(collection, req)
      );
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// delete
app.delete('/api/:collection/delete/:id', (req, res) => {
  (async () => {
    try {
      const collection = req.params.collection
      const document = db.collection(collection).doc(req.params.id);
      await document.delete();
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

exports.app = functions.https.onRequest(app);
