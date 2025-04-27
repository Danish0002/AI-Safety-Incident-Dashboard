type Props = {
  filter: string;
  setFilter: (val: string) => void;
  sortOrder: string;
  setSortOrder: (val: string) => void;
};

const FilterControls = ({ filter, setFilter, sortOrder, setSortOrder }: Props) => {
  return (
    <div className="flex gap-4 mb-4">
      <select className="border p-2 rounded" value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All Severities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select className="border p-2 rounded" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="Newest">Newest First</option>
        <option value="Oldest">Oldest First</option>
      </select>
    </div>
  );
};

export default FilterControls;
