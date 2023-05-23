import React, { useState } from "react";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";


const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input type="checkbox" checked={props.isSelected} onChange={() => null} />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const categoriesOptions = [
  { value: "Surveys and Forms", label: "Surveys and Forms" },
  { value: "Digital Marketing", label: "Digital Marketing" },
  { value: "Platform News and Updates", label: "Platform News and Updates" },
  { value: "Tips and Best Practise", label: "Tips and Best Practise" },
  { value: "Data Management", label: "Data Management" },
  { value: "Marketing Analytics", label: "Marketing Analytics" },
  { value: "Landing Pages", label: "Landing Pages" },
  { value: "Ecommerce", label: "Ecommerce" },
  { value: "Email Marketing", label: "Email Marketing" },
  { value: "Marketing Automation", label: "Marketing Automation" }
];


const FilterMultiSelect = () => {
  const [ selectValue, setSelectValue ] = useState([]);
  
  const handleChange = (selected) => {
    setSelectValue(selected);
  };

  return (
    <span className="dropdown">
      <ReactSelect
        options={categoriesOptions}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{
          Option,
        }}
        onChange={handleChange}
        allowSelectAll={true}
        value={selectValue}
      />
    </span>
  );
}

export default FilterMultiSelect;