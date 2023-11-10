import React from "react";

const FilterCheckbox = ({ label, checked, onChange }) => {
  return (
    <label className="block mb-2">
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
};

export default FilterCheckbox;
