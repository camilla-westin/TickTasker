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
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTickets();

      const uniqueCategoriesSet = new Set(
        data.tickets.map(({ category }) => category)
      );
      const uniqueCategories = Array.from(uniqueCategoriesSet);

      setTickets(data.tickets || []);
      setUniqueCategories(uniqueCategories);
    };

    fetchData();
  }, []);

  function toggleCatFilter(cat) {
    if (categoryFilters.includes(cat)) {
      setCategoryFilters(
        categoryFilters.filter((category) => category !== cat)
      );
    } else {
      setCategoryFilters([...categoryFilters, cat]);
    }
  }

  const filterTicketsByStatus = (status) =>
    filteredTickets.filter((ticket) => ticket.status === status);

  const filteredTickets =
    categoryFilters.length > 0
      ? tickets.filter((ticket) => categoryFilters.includes(ticket.category))
      : tickets;

  return (
    <main className="">
      <div className="flex">
        <div className="mb-4 bg-white w-1/5 p-5 max-h-screen">
          <label className="mb-4 font-semibold">Filter by Categories:</label>
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={categoryFilters.length === 0}
              onChange={() => setCategoryFilters([])}
            />{" "}
            All
          </label>
          {uniqueCategories.map((uniqueCategory, categoryIndex) => (
            <label className="block mb-2" key={categoryIndex}>
              <input
                type="checkbox"
                checked={categoryFilters.includes(uniqueCategory)}
                onChange={() => toggleCatFilter(uniqueCategory)}
              />{" "}
              {uniqueCategory}
            </label>
          ))}
        </div>
        <div className="lg:grid grid-cols-2 xl:grid-cols-3 p-5 w-4/5">
          <div>
            <h3>To do</h3>
            {filterTicketsByStatus("To do").map((ticket, _index) => (
              <TicketCard id={_index} key={_index} ticket={ticket} />
            ))}
          </div>
          <div>
            <h3>Doing</h3>
            {filterTicketsByStatus("Doing").map((ticket, _index) => (
              <TicketCard id={_index} key={_index} ticket={ticket} />
            ))}
          </div>
          <div>
            <h3>Done</h3>
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
