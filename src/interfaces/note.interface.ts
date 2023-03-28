import { Request, Response } from 'express';

export interface INote {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface INoteRepository {
    findAll(): Promise<INote[]>
    findById(id: string): Promise<INote | null>
    create(note: INote): Promise<INote>
    update(id: string, note: INote): Promise<INote | null>
    delete(id: string): Promise<boolean>
}

export type CreateNoteDTO = Omit<INote, 'id' | 'createdAt' | 'updatedAt'>
export interface UpdateNoteDTO {
    id: string;
    title?: string;
    content?: string;
}
export interface INoteService {
    getAllNotes(): Promise<INote[]>
    getNoteById(id: string): Promise<INote | null>
    createNote(data: CreateNoteDTO): Promise<INote>
    updateNoteById(id: string, data: UpdateNoteDTO): Promise<INote | null>
    deleteNoteById(id: string): Promise<boolean>
}

export interface INoteController {
    getAllNotes(req: Request, res: Response): Promise<void>
    createNote(req: Request, res: Response): Promise<void>
    updateNoteById(req: Request, res: Response): Promise<void>
    deleteNoteById(req: Request, res: Response): Promise<void>
}