import axios, { type AxiosResponse } from 'axios';
import type { NewNote, Note } from '../types/note';

export interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
  signal?: AbortSignal;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN?.trim();
  if (!token) {
    throw new Error(
      'NoteHub is not configured. Add VITE_NOTEHUB_TOKEN to .env.local and restart the app.',
    );
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function fetchNotes({
  page,
  perPage = 12,
  search = '',
  signal,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const response: AxiosResponse<FetchNotesResponse> = await api.get('/notes', {
    params: { page, perPage, search },
    signal,
  });
  return response.data;
}

export async function createNote(note: NewNote): Promise<Note> {
  const response: AxiosResponse<Note> = await api.post('/notes', note);
  return response.data;
}

export async function deleteNote(id: Note['id']): Promise<Note> {
  const response: AxiosResponse<Note> = await api.delete(
    `/notes/${encodeURIComponent(id)}`,
  );
  return response.data;
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 403 || error.response?.status === 401) {
      return 'Your NoteHub token is invalid. Please check the app configuration.';
    }
    return 'Unable to reach NoteHub. Please try again.';
  }
  return error instanceof Error
    ? error.message
    : 'Something went wrong. Please try again.';
}
