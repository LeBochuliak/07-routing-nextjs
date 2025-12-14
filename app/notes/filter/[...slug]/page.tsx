import { fetchNotes } from '../../../../lib/api';
import NoteList from '../../../../components/NoteList/NoteList';

type NotesByCategoryProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ page: number; search: string }>;
};

export default async function NotesByCategory({
  params,
  searchParams,
}: NotesByCategoryProps) {
  const { slug } = await params;
  const { page, search } = await searchParams;

  const tag = slug[0] === 'all' ? undefined : slug[0];
  const response = await fetchNotes({ page, search, tag });

  return (
    <>{response?.notes?.length > 0 && <NoteList notes={response.notes} />}</>
  );
}
