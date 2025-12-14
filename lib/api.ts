import axios from 'axios'
import type {Note, NoteTag} from '../types/note'

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
};

interface CreateNoteProps {
    title: string, 
    content: string | null, 
    tag: NoteTag
}

interface FetchNotesProps {
    search?: string,
    page: number, 
}

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN

axios.defaults.headers.common['Authorization'] = `Bearer ${myKey}`;

export async function fetchNotes({search, page }: FetchNotesProps): Promise<FetchNotesResponse>{ 
    
    const perPage: number = 12;
    const response = await axios.get<FetchNotesResponse>(
        'https://notehub-public.goit.study/api/notes',
        {
            params: {
                search,   
                page,
                perPage,
            }
        }
    );
    
    return response.data;
};

export async function createNote({title, content, tag}: CreateNoteProps): Promise<Note> {
    
    const normalizedContent = content ?? "";

    const response = await axios.post<Note>(
      'https://notehub-public.goit.study/api/notes',
      {
        title,
        content: normalizedContent,
        tag,
      }
    );
    
    return response.data;
}

export async function deleteNote( id : string): Promise<Note> {
    const response = await axios.delete<Note>(
      `https://notehub-public.goit.study/api/notes/${id}`
    );

    return response.data;
};

export async function fetchNoteById(id: string): Promise<Note> {
    const response = await axios.get<Note>(
      `https://notehub-public.goit.study/api/notes/${id}`
    );
    
    return response.data;
}