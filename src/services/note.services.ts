
import { CreateNoteDTO, INote, INoteService, UpdateNoteDTO } from "../interfaces/note.interface";
import { NoteRepository } from "../repositories/note.repository";
import Note from '../schemas/note.schema';

export class NoteService implements INoteService {

    constructor(private readonly repository: NoteRepository) { }

    async getAllNotes(): Promise<INote[]> {
        return this.repository.findAll();
    }

    async getById(id: string): Promise<INote | null> {
        return this.repository.findById(id);
    }

    async createNote(data: CreateNoteDTO): Promise<INote> {
        const note: INote = new Note(data);
        return this.repository.create(note);
    }

    async updateNoteById(id: string, data: UpdateNoteDTO): Promise<INote | null> {
        const note = await this.repository.findById(id);
        if (!note) {
            return null;
        }

        if (data.title !== undefined) {
            note.title = data.title;
        }

        if (data.content !== undefined) {
            note.content = data.content;
        }

        return this.repository.update(id, note);
    }

    async deleteNoteById(id: string): Promise<boolean> {
        return this.repository.delete(id);
    }
}