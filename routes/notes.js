//const { json } = require('express/lib/response');
const fs = require('fs');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// GET Route for retrieving all the tips
router.get('/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
router.post('/notes', (req, res) => {

  // let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  // let newNote = req.body;
  // newNote.id = uuidv4();
  // let allNotes = [...notes, newNote];
  // fs.writeFileSync('./db/db.json', JSON.stringify(allNotes));
  // res.json(allNotes);
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding Note');
  }
});

// DELETE Route for a specific tip
router.delete('/notes/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  // readFromFile('./db/db.json')
  //   .then((data) => JSON.parse(data))
  //   .then((json) => {
  //     // Make a new array of all tips except the one with the ID provided in the URL
  //     const result = json.filter((note) => note.note_id !== noteId);

  //     // Save that array to the filesystem
  //     writeToFile('./db/db.json', result);

  //     // Respond to the DELETE request
  //     res.json(`Item ${noteId} has been deleted 🗑️`);
  //   });
  let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  let deleteNote = req.params.note_id;
  let updatedNotes = notes.filter((note) => note.note_id != deleteNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(updatedNotes));
  res.json(updatedNotes);

});

module.exports=router //allows export of file to import into server 
