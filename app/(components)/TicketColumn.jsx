import React from "react";
import TicketCard from "@/app/(components)/TicketCard";

const TicketColumn = ({ title, tickets, sorting }) => {
  if (sorting) {
    tickets.sort((a, b) => b.priority - a.priority);
  }

  return (
    <div className="bg-white p-2 rounded h-min-screen m-2 shadow-lg">
      <h2 className="p-2 text-xl">{title}</h2>
      {tickets.map((ticket, _index) => (
        <TicketCard id={_index} key={_index} ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketColumn;
