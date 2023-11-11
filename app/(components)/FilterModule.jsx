import React from "react";
import FilterCheckbox from "@/app/(components)/FilterCheckbox";
import { motion } from "framer-motion";

const FilterModule = ({
  typeFilters,
  setTypeFilters,
  uniqueTypes,
  toggleTypeFilter,
  togglePriorityFilter,
  priorityFilters,
  variants,
}) => {
  return (
    <div className="w-full p-5">
      <motion.a variants={variants}>
        <label className="mb-4 font-semibold">Type:</label>
      </motion.a>
      <motion.a variants={variants}>
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
      </motion.a>
      <motion.a variants={variants}>
        <label className="mt-6 mb-4 font-semibold block">Priority:</label>
      </motion.a>
      <motion.a variants={variants}>
        {[5, 4, 3, 2, 1].map((priority, priorityIndex) => (
          <FilterCheckbox
            label={`${priority}`}
            checked={priorityFilters.includes(priority)}
            onChange={() => togglePriorityFilter(priority)}
            key={priorityIndex}
          />
        ))}
      </motion.a>
    </div>
  );
};

export default FilterModule;
