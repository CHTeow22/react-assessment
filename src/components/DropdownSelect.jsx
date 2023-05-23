import React from 'react';
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

const DropdownSelect = ({ column: { filterValue = [], setFilter, preFilteredRows, id } }) => {
  const options = React.useMemo(() => {
    const allOptions = new Set();
    preFilteredRows.forEach((row) => {
      row.values[id].forEach((category) => {
        if (!allOptions.has(category)) {
          allOptions.add(category);
        }
      });
    });

    return Array.from(allOptions).map((option) => ({
      value: option,
      label: option,
    }));
  }, [id, preFilteredRows]);

  // ui working but not filtering
  const handleChange = (selected) => {
    const selectedOptions = selected.map(data => {
      return data.length ? data.value : data;
    })
    setFilter(selectedOptions);
  };

  // filtering working but not UI
  const handleSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    setFilter(selectedValues);
  };

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input type="checkbox" checked={props.isSelected} onChange={() => null} 
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

  return (
    <ReactSelect className='dropdown'
      options={options}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      value={filterValue}
      components={{
        Option,
      }}
      onChange={handleChange}
    />
  );
};

export default DropdownSelect;
