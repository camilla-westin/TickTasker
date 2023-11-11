import React, { forwardRef } from "react";

const Dropdown = forwardRef(({ open, trigger, menu }, ref) => {
  return (
    <div className="relative" ref={ref}>
      {trigger}
      {open ? (
        <ul className="absolute dropdown-position w-52 bg-white shadow">
          {menu.map((menuItem, index) => (
            <li
              key={index}
              className="bg-white text-black block py-3 px-3 border-b border-slate-100 hover:bg-slate-200 hover: cursor-pointer"
            >
              {menuItem}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
});
Dropdown.displayName = "Dropdown"; // Add a display name
export default Dropdown;
