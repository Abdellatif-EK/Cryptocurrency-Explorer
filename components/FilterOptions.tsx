import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type FilterOptionsProps = {
  onFilterChange: (filterType: string, filterValue: string) => void;
  onToggleView: () => void; // Add this
  isListView: boolean; // Add this
};

export default function FilterOptions({
  onFilterChange,
  onToggleView,
  isListView,
}: FilterOptionsProps) {
  const [filterType, setFilterType] = useState("name");
  const [filterValue, setFilterValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filterType, filterValue);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-2 mb-4">
      <div className="flex-grow">
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="id">ID</SelectItem>
            <SelectItem value="symbol">Symbol</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="type">Type</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-grow">
        <Input
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Enter search term"
          className="w-full"
        />
      </div>
      <Button type="submit">Filter</Button>
      <Button
        type="button"
        onClick={onToggleView}
        className="ml-4"
      >
        {isListView ? "Switch to Grid View" : "Switch to List View"}
      </Button>
    </form>
  );
}
