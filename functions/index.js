const functions = require('firebase-functions');

// we will interact with different services like authentication & firestore
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// create the notifications collection and add a new notification in it
const createNotification = (notification) => {
  return admin.firestore().collection('notifications') // firestore add the collection if it's not exist
    .add(notification)
    .then(doc => console.log('notification added', doc))
}

// interact with firestore
exports.projectCreated = functions.firestore
  // whatever a project is created inside the projects collection
  // then we want to fire the callback function after doc => {}
  .document('projects/{projectId}')
  .onCreate(doc => {
    
    const project = doc.data(); // get the data
    const notification = {
      content: 'Added a new project',
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp() // time the notification is created
    }
    // add this object as a document inside a notifications collection in firestore database

    return createNotification(notification)
});

// now we interact with auth not firestore
exports.userJoined = functions.auth.user()
  .onCreate(user => { // the user that has just signed up

    // when a new user sign up in the app, they sign up using the auth service
    // then we create a document for them inside the collection,
    // so we get a reference for that document, 
    // means that we can recieve the data from that document including the name
    return admin.firestore().collection('users')
      .doc(user.uid).get().then(doc => {

        const newUser = doc.data();
        const notification = {
          content: 'Joined the party! ',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        }
    // add this object as a document inside a notifications collection in firestore database

      return createNotification(notification) // this the reason we create this function globally

      })

  })



exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello From Our First Cloud Function!");
});
