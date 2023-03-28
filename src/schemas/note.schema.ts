import mongoose, { Schema, Document } from 'mongoose';

export interface NoteDocument extends Document {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const NoteSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<NoteDocument>('Note', NoteSchema);