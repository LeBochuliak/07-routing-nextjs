import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
import NotesClient from './Notes.client';

type NotesByCategoryProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ page: number; search: string }>;
};

export default async function NotesByCategory({
  params,
  searchParams,
}: NotesByCategoryProps) {
  const queryClient = new QueryClient();

  const { slug } = await params;
  const { page, search } = await searchParams;

  const currentTag = slug[0] === 'all' ? undefined : slug[0];

  queryClient.prefetchQuery({
    queryKey: ['notes', page, search, currentTag],
    queryFn: () => fetchNotes({ page, search, currentTag }),
    staleTime: 1000 * 60,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={currentTag} />
    </HydrationBoundary>
  );
}
