'use client';

import css from '../../components/NotesPage/NotesPage.module.css';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import SearchBox from '../../components/SearchBox/SearchBox';
import Pagination from '../../components/Pagination/Pagination';
import NoteList from '../../components/NoteList/NoteList';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';

interface NotesClientProps {
  tag: string | undefined;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTag, setCurrentTag] = useState(tag);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const { data, isSuccess } = useQuery({
    queryKey: ['notes', page, search, currentTag],
    queryFn: () => fetchNotes({ search, page, currentTag }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess && data?.notes?.length === 0) {
      toast.error('No notes found for your request');
    }
  }, [isSuccess, data]);

  const totalPages = data?.totalPages ?? 0;

  const handlePagination = ({ selected }: { selected: number }) =>
    setPage(selected + 1);

  const handleSearchBox = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentTag(undefined);
      setPage(1);
      setSearch(e.target.value);
    },
    1000
  );

  const handleNoteForm = () => {
    setSearch('');
    closeModal();
  };

  return (
    <div className={css.app}>
      <Toaster position="top-center" />
      <div className={css.toolbar}>
        <SearchBox onChange={e => handleSearchBox(e)} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            onChange={handlePagination}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </div>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSuccess={handleNoteForm} />
        </Modal>
      )}
    </div>
  );
}
