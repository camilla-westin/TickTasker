import React from "react";
import FilterCheckbox from "@/app/(components)/FilterCheckbox";
import { motion } from "framer-motion";

const FilterModule = ({
  typeFilters,
  setTypeFilters,
  uniqueTypes,
  toggleTypeFilter,
  variants,
}) => {
  return (
    <div className="w-full p-5">
      <motion.a variants={variants}>
        <label className="mb-4 font-semibold">Filter by type:</label>
      </motion.a>
      <motion.a variants={variants}>
        <FilterCheckbox
          label="All"
          checked={typeFilters.length === 0}
          onChange={() => setTypeFilters([])}
        />
      </motion.a>
      <motion.a variants={variants}>
        {uniqueTypes.map((uniqueType, typeIndex) => (
          <FilterCheckbox
            key={typeIndex}
            label={uniqueType}
            checked={typeFilters.includes(uniqueType)}
            onChange={() => toggleTypeFilter(uniqueType)}
          />
        ))}
      </motion.a>
    </div>
  );
};

export default FilterModule;
