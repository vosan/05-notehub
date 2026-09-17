import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote, getErrorMessage } from '../../services/noteService';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
  onDeleted: () => void;
}

export default function NoteList({ notes, onDeleted }: NoteListProps) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: async () => {
      onDeleted();
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <>
      {deleteMutation.isError && (
        <p role="alert">{getErrorMessage(deleteMutation.error)}</p>
      )}
      <ul className={css.list}>
        {notes.map((note) => (
          <li className={css.listItem} key={note.id}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button
                type="button"
                className={css.button}
                disabled={deleteMutation.isPending}
                aria-label={`Delete ${note.title}`}
                onClick={() => deleteMutation.mutate(note.id)}
              >
                {deleteMutation.isPending &&
                deleteMutation.variables === note.id
                  ? 'Deleting…'
                  : 'Delete'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
