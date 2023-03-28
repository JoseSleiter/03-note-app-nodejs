import { NoteController } from '../src/controllers/note.controller';
import { INote, INoteService } from '../src/interfaces/note.interface';
import { NoteService } from '../src/services/note.services';
import noteMock from '../__mock__/note.mock';

describe('NoteController', () => {
    let noteController: NoteController;
    const res = {
        send: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
    };

    beforeEach(() => {
        const mockNoteService: INoteService = {
            getAllNotes: jest.fn(async () => { return [noteMock] }),
            getNoteById: jest.fn(async (id) => {
                const [findNote] = [noteMock].filter(ele => id === ele.id)
                return findNote ? findNote : null
            }),
            createNote: jest.fn(async () => { return noteMock }),
            updateNoteById: jest.fn(async () => { return noteMock }),
            deleteNoteById: jest.fn(async () => { return true }),
        };
        noteController = new NoteController(mockNoteService as NoteService);


    });

    describe('getAllNotes', () => {
        it('should return an array of notes', async () => {
            const mockNotes: INote[] = [noteMock];
            const req = {};

            await noteController.getAllNotes(req as any, res as any);
            expect(res.json).toHaveBeenCalledWith(mockNotes);
        });
    });

    describe('getNoteById', () => {
        it('should call getNoteById and return a object', async () => {
            const mockNote: INote = noteMock;
            const req = { params: { id: '1' } };

            await noteController.getNoteById(req as any, res as any);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockNote);
        });
    });

    describe('getNoteById', () => {
        it('should call getNoteById and return a msg like not found', async () => {
            const req = { params: { id: '2' } };

            await noteController.getNoteById(req as any, res as any);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ "message": `Note with id ${req.params.id} not found` });
        });
    });

    describe('createNote', () => {
        it('should call createNote and return empty object', async () => {
            const mockNote: INote = noteMock;
            const req = { body: mockNote };

            await noteController.createNote(req as any, res as any);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockNote);
        });
    });


    describe('deleteNoteById', () => {
        it('should call deleteNoteById and return true like success delete', async () => {
            const req = { params: { id: '1' } };

            await noteController.deleteNoteById(req as any, res as any);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(true);
        });
    });


});