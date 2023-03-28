import { Router } from 'express';

import { NoteController } from '../../controllers/note.controller';

const noteRoute: Router = Router();
const noteController = new NoteController();

noteRoute.get('/notes', noteController.getAllNotes.bind(noteController));
noteRoute.get('/notes/:id', noteController.getNoteById.bind(noteController));
noteRoute.post('/notes', noteController.createNote.bind(noteController));
noteRoute.put('/notes/:id', noteController.updateNoteById.bind(noteController));
noteRoute.delete('/notes/:id', noteController.deleteNoteById.bind(noteController));

export default noteRoute;
