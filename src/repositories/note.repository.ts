import { Model } from 'mongoose';
import { INote, INoteRepository } from '../interfaces/note.interface';
import Note, { NoteDocument } from '../schemas/note.schema';

export class NoteRepository implements INoteRepository {

  constructor(private readonly noteModel: Model<NoteDocument>) { }

  async findAll(): Promise<INote[]> {
    const notes = await this.noteModel.find().exec();
    return notes.map((note) => new Note(note));
  }

  async findById(id: string): Promise<INote | null> {
    const note = await this.noteModel.findById(id).exec();
    return note ? new Note(note) : null;
  }

  async create(note: INote): Promise<INote> {
    const createdNote = await this.noteModel.create(note);
    return new Note(createdNote);
  }

  async update(id: string, note: INote): Promise<INote | null> {
    const updatedNote = await this.noteModel.findByIdAndUpdate(id, note, {
      new: true,
    }).exec();
    return updatedNote ? new Note(updatedNote) : null;
  }

  async delete(id: string): Promise<boolean> {
    const deletedNote = await this.noteModel.findByIdAndDelete(id).exec();
    return Boolean(deletedNote);
  }
}