"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Dropdown from "./Dropdown";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNavicon,
  faSignOutAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const AdminNav = () => {
  const { data: session } = useSession({
    required: true,
  });

  const [openAdminNav, setOpenAdminNav] = useState(false);
  const dropdownRef = useRef(null);

  const handleOpen = () => {
    setOpenAdminNav(!openAdminNav);
  };

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenAdminNav(false);
      }
    };

    if (openAdminNav) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openAdminNav]);

  const menuItems = [];

  if (session) {
    menuItems.push(
      <Link href="/api/auth/signout?callbackUrl=/">
        <FontAwesomeIcon
          icon={faSignOutAlt}
          className="text-black text-xl mr-2"
        />
        <span className="" key="logout">
          Logout
        </span>
      </Link>
    );
    menuItems.unshift(
      <Link href="/CreateUser">
        <FontAwesomeIcon
          icon={faUserPlus}
          className="text-black text-xl mr-2"
        />
        <span className="">Create user</span>
      </Link>
    );
  }

  return (
    <div>
      <Dropdown
        open={openAdminNav}
        trigger={
          <button onClick={handleOpen} className="text-white flex items-center">
            {session?.user?.email}
            <FontAwesomeIcon
              icon={faNavicon}
              className="text-white text-xl ml-2"
            />
          </button>
        }
        menu={menuItems}
        ref={dropdownRef}
      />
    </div>
  );
};

export default AdminNav;
