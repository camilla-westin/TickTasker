"use client";
import React, { useState, useEffect } from "react";
import getTickets from "@/app/api/Tickets/getTickets";
import TicketColumn from "@/app/(components)/TicketColumn";
import FilterModule from "./(components)/FilterModule";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { motion, useCycle } from "framer-motion";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [typeFilters, setTypeFilters] = useState([]);
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [openFilterModule, cycleFilterModule] = useCycle(false, true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTickets();

      const uniqueTypesSet = new Set(data.tickets.map(({ type }) => type));
      const uniqueTypes = Array.from(uniqueTypesSet);

      setTickets(data.tickets || []);
      setUniqueTypes(uniqueTypes);
    };

    fetchData();
  }, []);

  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.4,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.4,
        staggerDirection: 1,
      },
    },
  };
  const itemVariants = {
    closed: {
      opacity: 0,
    },
    open: { opacity: 1 },
  };

  function toggleTypeFilter(typ) {
    if (typeFilters.includes(typ)) {
      setTypeFilters(typeFilters.filter((type) => type !== typ));
    } else {
      setTypeFilters([...typeFilters, typ]);
    }
  }

  const filterTicketsByStatus = (status) =>
    filteredTickets.filter((ticket) => ticket.status === status);

  const filteredTickets =
    typeFilters.length > 0
      ? tickets.filter((ticket) => typeFilters.includes(ticket.type))
      : tickets;

  return (
    <main>
      <div className="flex">
        <motion.aside
          initial={{
            width: 0,
            opacity: 0,
            height: "100vh",
            backgroundColor: "white",
            left: "-350px",
            position: "relative",
          }}
          animate={{
            width: openFilterModule ? 350 : 0,
            opacity: openFilterModule ? 1 : 0,
            left: "0",
          }}
          exit={{
            width: 0,
            opacity: 0,
            transition: { delay: 0.7, duration: 0.3 },
          }}
        >
          <motion.div
            className="container"
            initial="closed"
            animate={openFilterModule ? "open" : "closed"}
            exit="closed"
            variants={sideVariants}
          >
            <FilterModule
              typeFilters={typeFilters}
              setTypeFilters={setTypeFilters}
              uniqueTypes={uniqueTypes}
              toggleTypeFilter={toggleTypeFilter}
              variants={itemVariants}
            />
          </motion.div>
        </motion.aside>

        <div className="">
          <div className="w-full h-14 block p-6">
            <button
              onClick={cycleFilterModule}
              className="bg-white py-2 px-3 rounded-3xl text-black flex items-center shadow"
            >
              <FontAwesomeIcon
                icon={faFilter}
                className="text-black text-xl mr-2"
              ></FontAwesomeIcon>
              Filter
            </button>
          </div>
          <div className="lg:grid grid-cols-2 xl:grid-cols-3 p-5">
            <TicketColumn
              title="To do"
              tickets={filterTicketsByStatus("To do")}
              sorting={true}
            />
            <TicketColumn
              title="Doing"
              tickets={filterTicketsByStatus("Doing")}
              sorting={false}
            />
            <TicketColumn
              title="Done"
              tickets={filterTicketsByStatus("Done")}
              sorting={false}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
