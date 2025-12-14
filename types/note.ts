
export type NoteTag = 'Work' | 'Todo'| 'Personal' | 'Meeting' | 'Shopping';

export interface Note {
    id: string;
    title: string;
    content: string;
    tag: NoteTag;
    createdAt: string; 
    updatedAt: string;
};