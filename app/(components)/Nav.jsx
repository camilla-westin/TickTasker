import { faTicket, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon" />
          <span className="text-white pl-2">Home</span>
        </Link>
        <Link href="/TicketPage/new">
          <FontAwesomeIcon icon={faTicket} className="icon" />
          <span className="text-white pl-2">New ticket</span>
        </Link>
      </div>
      <div>
        <p className="text-white">camilla@gmail.com</p>
      </div>
    </nav>
  );
};

export default Nav;
