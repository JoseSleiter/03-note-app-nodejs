import { Request, Response } from 'express';
import { INote } from '../interfaces/note.interface';
import { NoteService } from '../services/note.services';
import { INoteController } from './../interfaces/note.interface';

export class NoteController implements INoteController {
    constructor() {
    }

    getAllNotes = async (_req: Request, res: Response): Promise<void> => {

    }

    getNoteById = async (req: Request, res: Response): Promise<void> => {

    }

    async createNote(req: Request, res: Response): Promise<void> {

    }

    async updateNoteById(req: Request, res: Response): Promise<void> {

    }

    async deleteNoteById(req: Request, res: Response): Promise<void> {

    }
}
