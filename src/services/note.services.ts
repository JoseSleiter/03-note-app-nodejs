
import { INoteService } from "../interfaces/note.interface";
import { NoteRepository } from "../repositories/note.repository";

export class NoteService implements INoteService {

    constructor(private readonly repository: NoteRepository) { }
}