const models = require('../models');
const Note = models.Note;

//RENDER PAGE
const notesPage = (req, res) => {
  Note.NoteModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('notes', { csrfToken: req.csrfToken(), notes: docs });
  });
};

//CREATE NEW NOTE
const makeNote = (req, res) => {
  if (!req.body.notetitle || !req.body.content) {
    return res.status(400).json({ error: 'Both title and content are required.' });
  }

  const noteData = {
    notetitle: req.body.notetitle,
    content: req.body.content,
    owner: req.session.account._id,
  };

  const newNote = new Note.NoteModel(noteData);

  const notePromise = newNote.save();

  notePromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Note already exists' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return notePromise;
};

module.exports.notesPage = notesPage;
module.exports.makeNote = makeNote;
