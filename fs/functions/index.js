const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true })

admin.initializeApp();

exports.addDog = functions.https.onRequest(async (req, res) => {
    // const name = req.query.name;
    // const age = req.query.age;
    const name = req.body.name;
    const age = req.body.age;
    const img_url = req.body.img_url;
    // const snapshot = await admin.database().ref('/dogs').push({original: original});
    // res.redirect(303, snapshot.ref.toString());
    const writeResult = await admin.firestore().collection('dogs').add({ name, age, img_url });
    res.json({ result: `Dog with ID: ${writeResult.id} added`})

});

exports.deleteDog = functions.https.onRequest(async (req, res) => {
    const dogToDelete = req.query.id;

    const deletedDog = await admin.firestore().collection('dogs').doc(dogToDelete).delete();
    res.json({ deletedDog: `dog with id.... deleted`})
});

exports.getDogs = functions.https.onRequest((req, res) => {
    cors(req, res, () => { return admin.firestore().collection('dogs').get()
    .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data())
        return res.json({ data })
    })})
   
});

exports.updateDog = functions.https.onRequest(async (req, res) => {
    const dogId = req.query.id;
    const body = req.body;
    const updatedDog = await admin.firestore().collection('dogs').doc(dogId).update(body);
    res.json({ updatedDog: `dog with id: ${dogId} updated`})
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
