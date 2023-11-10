import { faTicket, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const Nav = async () => {
  const session = await getServerSession(options);
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
        <Link href="/CreateUser">
          <FontAwesomeIcon icon={faTicket} className="icon" />
          <span className="text-white pl-2">Create user</span>
        </Link>
        <Link href="/ClientMember">
          <FontAwesomeIcon icon={faTicket} className="icon" />
          <span className="text-white pl-2">Client member</span>
        </Link>
        <Link href="/Member">
          <FontAwesomeIcon icon={faTicket} className="icon" />
          <span className="text-white pl-2">Member</span>
        </Link>
        <Link href="/Public">
          <FontAwesomeIcon icon={faTicket} className="icon" />
          <span className="text-white pl-2">Public</span>
        </Link>
        {session ? (
          <Link href="/api/auth/signout?callbackUrl=/">
            <span className="text-white pl-2">Logout</span>
          </Link>
        ) : (
          <Link href="/api/auth/signin">
            <span className="text-white pl-2">Login</span>
          </Link>
        )}
      </div>
      <div>
        <p className="text-white">camilla@gmail.com</p>
      </div>
    </nav>
  );
};

export default Nav;
