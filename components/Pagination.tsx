import { Button } from '@/components/ui/button';

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-8 space-y-2">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="rounded-l-md"
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        >
          First
        </Button>
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <span className="px-4 py-2 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
        <Button
          variant="outline"
          className="rounded-r-md"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          Last
        </Button>
      </div>
    </div>
  )
}

