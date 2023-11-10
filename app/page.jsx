"use client";
import { useState, useEffect } from "react";
import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    console.log("Error: ", error);
  }
};

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
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={typeFilters.length === 0}
              onChange={() => setTypeFilters([])}
            />{" "}
            All
          </label>
          {uniqueTypes.map((uniqueType, typeIndex) => (
            <label className="block mb-2" key={typeIndex}>
              <input
                type="checkbox"
                checked={typeFilters.includes(uniqueType)}
                onChange={() => toggleTypeFilter(uniqueType)}
              />{" "}
              {uniqueType}
            </label>
          ))}
        </div>
        <div className="lg:grid grid-cols-2 xl:grid-cols-3 p-5 w-4/5">
          <div className="bg-white p-2 rounded h-screen m-2 shadow-lg">
            <h2 className="p-2 text-xl">To do</h2>
            {filterTicketsByStatus("To do").map((ticket, _index) => (
              <TicketCard id={_index} key={_index} ticket={ticket} />
            ))}
          </div>
          <div className="bg-white shadow-lg p-2 rounded h-screen m-2">
            <h2 className="p-2 text-xl">Doing</h2>
            {filterTicketsByStatus("Doing").map((ticket, _index) => (
              <TicketCard id={_index} key={_index} ticket={ticket} />
            ))}
          </div>
          <div className="bg-white shadow-lg p-2 rounded h-screen m-2">
            <h2 className="p-2 text-xl">Done</h2>
            {filterTicketsByStatus("Done").map((ticket, _index) => (
              <TicketCard id={_index} key={_index} ticket={ticket} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
