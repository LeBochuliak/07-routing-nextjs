'use client';

import css from '../../../../components/NotePreview/NotePreview.module.css';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Modal from '../../../../components/Modal/Modal';
import { useRouter } from 'next/navigation';

export default function NotePreview() {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const closeModal = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={closeModal}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
          <p className={css.tag}>{note.tag}</p>
        </div>
        <button type="button" className={css.backBtn} onClick={closeModal}>
          Back
        </button>
      </div>
    </Modal>
  );
}
