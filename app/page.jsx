import TicketCard from "./(components)/TicketCard";

const Dashboard = () => {
  return (
    <main className="p-5">
      <div className="lg:grid grid-cols-2 xl:grid-cols-4">
        <TicketCard />
        <TicketCard />
        <TicketCard />
        <TicketCard />
      </div>
    </main>
  );
};

export default Dashboard;
