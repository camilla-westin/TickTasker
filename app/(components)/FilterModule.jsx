import React from "react";
import FilterCheckbox from "@/app/(components)/FilterCheckbox";

const FilterModule = ({
  typeFilters,
  setTypeFilters,
  uniqueTypes,
  toggleTypeFilter,
}) => {
  return (
    <div className="mb-4 bg-white w-1/5 p-5 max-h-screen">
      <label className="mb-4 font-semibold">Filter by type:</label>
      <FilterCheckbox
        label="All"
        checked={typeFilters.length === 0}
        onChange={() => setTypeFilters([])}
      />
      {uniqueTypes.map((uniqueType, typeIndex) => (
        <FilterCheckbox
          key={typeIndex}
          label={uniqueType}
          checked={typeFilters.includes(uniqueType)}
          onChange={() => toggleTypeFilter(uniqueType)}
        />
      ))}
    </div>
  );
};

export default FilterModule;
