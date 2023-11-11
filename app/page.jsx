"use client";
import React, { useState, useEffect } from "react";
import getTickets from "@/app/api/Tickets/getTickets";
import FilterCheckbox from "@/app/(components)/FilterCheckbox";
import TicketColumn from "@/app/(components)/TicketColumn";
import FilterModule from "./(components)/FilterModule";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [typeFilters, setTypeFilters] = useState([]);
  const [uniqueTypes, setUniqueTypes] = useState([]);

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
        <FilterModule
          typeFilters={typeFilters}
          setTypeFilters={setTypeFilters}
          uniqueTypes={uniqueTypes}
          toggleTypeFilter={toggleTypeFilter}
        />
        <div className="w-4/5">
          <div className="w-full h-14 block p-6">
            <button className="bg-white py-2 px-3 rounded-3xl text-black flex items-center shadow">
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
            />
            <TicketColumn
              title="Doing"
              tickets={filterTicketsByStatus("Doing")}
            />
            <TicketColumn
              title="Done"
              tickets={filterTicketsByStatus("Done")}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
