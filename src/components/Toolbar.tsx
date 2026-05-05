import type { FilterState } from '../types';

interface ToolbarProps {
  filter: FilterState;
  onChange: (next: FilterState) => void;
}

export function Toolbar({ filter, onChange }: ToolbarProps) {
  return (
    <div className="toolbar">

      <input
        type="search"
        placeholder="Sök kontakter..."
        value={filter.search}
        onChange={e => onChange({ ...filter, search: e.target.value })}
      />

      <select
        value={filter.sortBy}
        onChange={e => onChange({ ...filter, sortBy: e.target.value as FilterState['sortBy'] })}
      >
        <option value="name">Sortera på namn</option>
        <option value="email">Sortera på e-post</option>
        <option value="company">Sortera på företag</option>
      </select>

      <select
        value={filter.sortOrder}
        onChange={e => onChange({ ...filter, sortOrder: e.target.value as FilterState['sortOrder'] })}
      >
        <option value="asc">A → Ö</option>
        <option value="desc">Ö → A</option>
      </select>

    </div>
  );
}