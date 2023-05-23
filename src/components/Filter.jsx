import React from "react";

export const FilterInput = ({ column }) => {
    const { filterValue, setFilter } = column;

    return (
        <input
        style = {{ width: '100%' }}
        value={filterValue || ''}
        onChange={(e) => setFilter(e.target.value)}
        placeholder={`Filter ${column.Header}`}
        />
    );
};

export default FilterInput;