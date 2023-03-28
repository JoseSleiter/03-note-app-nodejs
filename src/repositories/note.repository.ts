import { Model } from 'mongoose';
import { INoteRepository } from '../interfaces/note.interface';
import { NoteDocument } from '../schemas/note.schema';

export class NoteRepository implements INoteRepository {

  constructor(private readonly noteModel: Model<NoteDocument>) { }

}