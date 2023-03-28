import { Request, Response } from 'express';
import { INote } from '../interfaces/note.interface';
import { NoteService } from '../services/note.services';
import { INoteController } from './../interfaces/note.interface';

export class NoteController implements INoteController {
    constructor(private noteService: NoteService) {
    }

    getAllNotes = async (_req: Request, res: Response): Promise<void> => {
        try {
            const notes: INote[] = await this.noteService.getAllNotes();
            res.status(200).json(notes);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    getNoteById = async (req: Request, res: Response): Promise<void> => {
        try {
            const note: INote | null = await this.noteService.getNoteById(req.params.id);
            if (note) {
                res.status(200).json(note);
            } else {
                res.status(404).json({ message: `Note with id ${req.params.id} not found` });
            }
        } catch (error: any) {
            if (error.name === 'CastError') {
                res.status(400).json({ message: `Invalid value to param id: ${error.value}` });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async createNote(req: Request, res: Response): Promise<void> {
        try {
            const note: INote = await this.noteService.createNote(req.body);
            res.status(201).json(note);
        } catch (error: any) {
            if (error.name === 'ValidationError') {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async updateNoteById(req: Request, res: Response): Promise<void> {
        try {
            const updatedNote: INote | null = await this.noteService.updateNoteById(req.params.id, req.body);
            if (updatedNote) {
                res.status(200).json(updatedNote);
            } else {
                res.status(404).json({ message: `Note with id ${req.params.id} not found` });
            }
        } catch (error: any) {
            if (error.name === 'CastError') {
                res.status(400).json({ message: `Invalid value to param id: ${error.value}` });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async deleteNoteById(req: Request, res: Response): Promise<void> {
        try {
            const deletedNote: boolean | null = await this.noteService.deleteNoteById(req.params.id);
            if (deletedNote) {
                res.status(201).json(deletedNote);
            } else {
                res.status(404).json({ message: `Note with id ${req.params.id} not found` });
            }
        } catch (error: any) {
            if (error.name === 'CastError') {
                res.status(400).json({ message: `Invalid value to param id: ${error.value}` });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}
