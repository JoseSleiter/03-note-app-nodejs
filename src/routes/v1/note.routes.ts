import { Router } from 'express';

import { NoteController } from '../../controllers/note.controller';
import { NoteRepository } from '../../repositories/note.repository';
import { NoteService } from '../../services/note.services';
import { ValidateRequiredBodyFields } from '../../middlewares/validate-required-fields.middleware';

// schema
import Note from '../../schemas/note.schema';

// Controller
const noteRepository = new NoteRepository(Note);
const noteService = new NoteService(noteRepository);
const noteController = new NoteController(noteService);

// Middlewares
const validateRequiredBodyFields = new ValidateRequiredBodyFields()

//  Routes
const noteRoute: Router = Router();
noteRoute.get('/notes', noteController.getAllNotes.bind(noteController));
noteRoute.get('/notes/:id', noteController.getNoteById.bind(noteController));
noteRoute.post('/notes', [
    validateRequiredBodyFields.check(['title', 'content']),
    noteController.createNote.bind(noteController)
]);
noteRoute.put('/notes/:id', noteController.updateNoteById.bind(noteController));
noteRoute.delete('/notes/:id', noteController.deleteNoteById.bind(noteController));

export default noteRoute;
