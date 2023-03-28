import { Router } from 'express';

import { NoteController } from '../../controllers/note.controller';
import { NoteRepository } from '../../repositories/note.repository';
import { NoteService } from '../../services/note.services';

// schema
import Note from '../../schemas/note.schema';

const noteRoute: Router = Router();
const noteRepository = new NoteRepository(Note);
const noteService = new NoteService(noteRepository);
const noteController = new NoteController(noteService);

noteRoute.get('/notes', noteController.getAllNotes.bind(noteController));
noteRoute.get('/notes/:id', noteController.getNoteById.bind(noteController));
noteRoute.post('/notes', noteController.createNote.bind(noteController));
noteRoute.put('/notes/:id', noteController.updateNoteById.bind(noteController));
noteRoute.delete('/notes/:id', noteController.deleteNoteById.bind(noteController));

export default noteRoute;
