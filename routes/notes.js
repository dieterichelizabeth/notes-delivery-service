const fs = require('fs');
const express = require('express')
const router = express.Router()
const db = require('../db/notes.json');
const path = require('path');

router.use(express.json());


// get the json file
router.get('/notes', (req, res) => {
    res.json( db.notes );
});

// save a new note
router.post('/notes', (req, res) => { 
    // adds unique id
    req.body.id = db.notes.length.toString();

    // send new note and db to addNote()
    const note = addNote(req.body, db);
    res.json(note);    
})

function addNote(body, db) {
    // save on the request body
    const notes = body;
  
    // add to the db.json file 
    db.notes.push(notes);
    fs.writeFileSync(
        path.join(__dirname, '../db/notes.json'),
        JSON.stringify({ notes: db.notes }, null, 2)
      );

    // return the new note to the client
    return notes;
  }
  
// delete a note
router.delete('/delete', (req, res) => {

})

module.exports = router