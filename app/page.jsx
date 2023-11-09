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
  const [categoryFilter, setCategoryFilter] = useState(null);
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

  function handleCatFilter(cat) {
    setCategoryFilter(cat);
  }

  const filteredTickets = categoryFilter
    ? tickets.filter((ticket) => ticket.category === categoryFilter)
    : tickets;

  return (
    <main className="p-5">
      <div>
        <div className="mb-4 flex justify-end">
          <button
            className={`rounded-3xl border border-black border-solid inline-block bg-white mr-2 mb-4 px-3 py-1 ${
              categoryFilter === null ? "border-2" : ""
            }`}
            onClick={() => handleCatFilter(null)}
          >
            All
          </button>
          {uniqueCategories.map((uniqueCategory, categoryIndex) => (
            <button
              key={categoryIndex}
              onClick={() => handleCatFilter(uniqueCategory)}
              className={`rounded-3xl border border-black border-solid inline-block bg-white mr-2 mb-4 px-3 py-1 ${
                categoryFilter === uniqueCategory ? "border-2" : ""
              }`}
            >
              {uniqueCategory}
            </button>
          ))}
        </div>
        <div className="lg:grid grid-cols-2 xl:grid-cols-4">
          {filteredTickets.map((ticket, _index) => (
            <TicketCard id={_index} key={_index} ticket={ticket} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
