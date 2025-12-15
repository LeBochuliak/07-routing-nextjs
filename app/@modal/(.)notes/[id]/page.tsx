import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '../../../../lib/api';
import NotePreviewClient from './NotePreview.client';

type NotePreviewProps = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: NotePreviewProps) {
  const queryClient = new QueryClient();

  const { id } = await params;

  queryClient.prefetchQuery({
    queryKey: ['notes', id],
    queryFn: () => fetchNoteById(id),
    staleTime: 1000 * 60,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
}
