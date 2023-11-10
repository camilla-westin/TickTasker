"use client";
import React, { useState, useEffect } from "react";
import getTickets from "@/app/api/Tickets/getTickets";
import FilterCheckbox from "@/app/(components)/FilterCheckbox";
import TicketColumn from "@/app/(components)/TicketColumn";

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
    <main className="">
      <div className="flex">
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
        <div className="lg:grid grid-cols-2 xl:grid-cols-3 p-5 w-4/5">
          <TicketColumn
            title="To do"
            tickets={filterTicketsByStatus("To do")}
          />
          <TicketColumn
            title="Doing"
            tickets={filterTicketsByStatus("Doing")}
          />
          <TicketColumn title="Done" tickets={filterTicketsByStatus("Done")} />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
