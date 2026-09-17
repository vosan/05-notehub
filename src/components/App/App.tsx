import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes, getErrorMessage } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import css from './App.module.css';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const updateSearch = useDebouncedCallback((value: string) => {
    setSearch(value.trim());
    setPage(1);
  }, 300);
  const notesQuery = useQuery({
    queryKey: ['notes', search, page],
    queryFn: ({ signal }) => fetchNotes({ page, search, signal }),
  });

  function handleSearch(value: string) {
    setSearchInput(value);
    updateSearch(value);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchInput} onSearch={handleSearch} />
        {notesQuery.data && notesQuery.data.totalPages > 1 && (
          <Pagination
            totalPages={notesQuery.data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button
          type="button"
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>
      {notesQuery.isPending && <p role="status">Loading notes…</p>}
      {notesQuery.isError && (
        <div role="alert">
          <p>{getErrorMessage(notesQuery.error)}</p>
          <button type="button" onClick={() => void notesQuery.refetch()}>
            Try again
          </button>
        </div>
      )}
      {notesQuery.data && notesQuery.data.notes.length > 0 && (
        <NoteList
          notes={notesQuery.data.notes}
          onDeleted={() => {
            if (notesQuery.data.notes.length === 1 && page > 1)
              setPage(page - 1);
          }}
        />
      )}
      {notesQuery.isSuccess && notesQuery.data.notes.length === 0 && (
        <p role="status">
          {search
            ? 'No notes match your search.'
            : 'No notes yet. Create your first note.'}
        </p>
      )}
      {notesQuery.isFetching && !notesQuery.isPending && (
        <p role="status">Updating notes…</p>
      )}
      {isModalOpen && (
        <Modal label="Create note" onClose={closeModal}>
          <NoteForm onCancel={closeModal} onSuccess={closeModal} />
        </Modal>
      )}
    </div>
  );
}
