type PerPageSelectorProps = {
  perPage: number
  onPerPageChange: (perPage: number) => void
}

export default function PerPageSelector({ perPage, onPerPageChange }: PerPageSelectorProps) {
  return (
    <div className="mb-4">
      <label htmlFor="perPage" className="mr-2">
        Coins per page:
      </label>
      <select
        id="perPage"
        value={perPage}
        onChange={(e) => onPerPageChange(Number(e.target.value))}
        className="border rounded p-1"
      >
        <option value={10}>10</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  )
}

