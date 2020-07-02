Firebase REST API
=================

This project provides a REST API that sits between a Firebase backend and the frontend. It is built using ExpressJS and the NodeJS Firebase SDK.

As of 2020-07-02, this project only interacts with Cloud Firestore. It can create, edit, and delete database entries, but cannot upload files or do anything with Authentication, Storage, etc.

System dependencies
-------------------

- NodeJS
- Firebase
- Firebase Tools (for testing)

You can install Firebase and Firebase Tools using Node Package Manager:

```shell
npm install -g firebase
npm install -g firebase-tools
```

Setup
-----

1. Create a Firebase project

This script does not currently have the capacity to initialise Firebase projects; so you will have to create one youself before getting started. (Instructions on creating an app is not in the scope of this readme, see https://firebase.google.com/ and click "Get started" for details.)

2. Add a `permissions.json` file to `../functions` directory.

Once you've created an app on Firebase, go to: `Users and permissions` -> `Service accounts` -> click on `Generate new private key` button. A key will be generated; save this as `../functions/permissions.json`. (See sample file, `permissions-dummy.json`. It should look exactly like this.)

3. Install project dependencies

Make sure you are in the `../functions` directory and run `npm install`.

Using this application
----------------------

1. [Optional] Start up Cloud Firestore emulator

This will prevent this application from reaching the live API for Firebase. Without the emulator, real changes will be made to whatever project is specified in `permissions.json`.

2. Start the service

In the `../functions` directory, run `npm run serve`. This will start the application. If all went well, you should see something to the effect of:

`✔  functions[app]: http function initialized (http://localhost:5001/some-app-abcd/us-central1/app).`

The URL specified here is the base URL to which requests will be sent.

3. Send requests to the application

The following represent endpoints. The strings here should be appended onto the base URL. When reached using the appopriate HTTP method, they will carry out the stated action.

- Create: `/api/:collection/create` (POST)
- Read single entry: `/api/:collection/read/:id` (GET)
- Read all entries: `/api/:collection/read` (GET)
- Update single entry: `/api/:collection/update/:id` (PUT)
- Delete single entry: `/api/:collection/delete/:id` (DELETE)

For example, running `curl -X GET http://localhost:5001/some-app-abcd/us-central1/app/api/animals/read` in a console will return list all of the entries in the `animals` collection. `curl -X POST http://localhost:5001/some-app-abcd/us-central1/app/api/animals/create -d "id=dog&name=Fido&species=Canine"` will create an entry with an ID of `dog` and the values name = `Fodo` and species = `Canine`.

For a brief explanation of HTTP methods, see https://www.restapitutorial.com/lessons/httpmethods.html.

Credits
-------

The first few commits use code taken from the tutorial, https://medium.com/better-programming/building-an-api-with-firebase-109041721f77.
