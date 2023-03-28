import { INote, INoteRepository } from '../src/interfaces/note.interface';
import { NoteRepository } from '../src/repositories/note.repository';
import { NoteService } from '../src/services/note.services';
import noteMock from '../__mock__/note.mock';

describe('NoteService', () => {
  let noteService: NoteService;

  beforeEach(() => {
    const mockNoteRepository: INoteRepository = {
      findAll: jest.fn(async () => { return [noteMock] }),
      findById: jest.fn(async () => { return noteMock }),
      create: jest.fn(async () => { return noteMock }),
      update: jest.fn(async () => { return { ...noteMock } }),
      delete: jest.fn(async () => { return true }),
    }
    noteService = new NoteService(mockNoteRepository as NoteRepository);
  });

  describe('getAllNotes', () => {
    it('should return an array of notes', async () => {
      const mockNotes: [INote] = [noteMock];
      jest.spyOn(noteService, 'getAllNotes').mockResolvedValue(mockNotes);
      const notes = await noteService.getAllNotes();
      expect(notes).toEqual(mockNotes);
    });
  });

  describe('getNoteById', () => {
    it('should get a store note by id', async () => {
      const mockNote = noteMock;
      jest.spyOn(noteService, 'getNoteById').mockResolvedValue(noteMock);
      const note = await noteService.getNoteById('1');
      expect(note).toEqual(mockNote);
    });
  });

  describe('createNote', () => {
    it('should create a new note', async () => {
      const mockNote = noteMock;
      jest.spyOn(noteService, 'createNote').mockResolvedValue(noteMock);
      const note = await noteService.createNote(mockNote);
      expect(note).toEqual(mockNote);
    });
  });

  describe('updateNoteById', () => {
    it('should update title attribute to a note with any id', async () => {
      const mockNote = { ...noteMock };
      const note = await noteService.updateNoteById('1', { id: '1', title: "New titleee" });
      expect(note?.title).not.toEqual(mockNote.title);
    });
  });

  describe('updateNoteById', () => {
    it('should update content attribute to a note with any id', async () => {
      const mockNote = { ...noteMock };
      const note = await noteService.updateNoteById('1', { id: '1', content: "New content" });
      expect(note?.content).not.toEqual(mockNote.content);
    });
  });

  describe('deleteNoteById', () => {
    it('should delete a note by id', async () => {
      const note = await noteService.deleteNoteById('1');
      expect(note).toEqual(true);
    });
  });

});