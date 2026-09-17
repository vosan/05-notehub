import ReactPaginateModule from 'react-paginate';
import css from './Pagination.module.css';

// The package's UMD export can retain a default wrapper in Vite's dev bundle.
const ReactPaginate =
  (ReactPaginateModule as unknown as { default?: typeof ReactPaginateModule })
    .default ?? ReactPaginateModule;

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <nav aria-label="Notes pages">
      <ReactPaginate
        pageCount={totalPages}
        forcePage={currentPage - 1}
        onPageChange={({ selected }: { selected: number }) =>
          onPageChange(selected + 1)
        }
        containerClassName={css.pagination}
        activeClassName={css.active}
        previousLabel="←"
        nextLabel="→"
        breakLabel="…"
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        renderOnZeroPageCount={null}
      />
    </nav>
  );
}
