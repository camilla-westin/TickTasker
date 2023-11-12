import {
  faAdd,
  faGripLinesVertical,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import AdminNav from "./AdminNav";

const Nav = async () => {
  const session = await getServerSession(options);
  return (
    <nav className="flex justify-between bg-nav p-5">
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center">
          <FontAwesomeIcon icon={faGripVertical} className="icon" />
          <span className="text-white pl-2">Board</span>
        </Link>
        <Link href="/TicketPage/new" className="flex items-center">
          <FontAwesomeIcon icon={faAdd} className="icon" />
          <span className="text-white pl-2">New ticket</span>
        </Link>
        {/* <Link href="/ClientMember">
          <FontAwesomeIcon icon={faTicket} className="icon" />
          <span className="text-white pl-2">Client member</span>
        </Link>
        <Link href="/Member">
          <FontAwesomeIcon icon={faTicket} className="icon" />
          <span className="text-white pl-2">Member</span>
        </Link> */}
      </div>
      <div>
        {session ? null : (
          <Link href="/api/auth/signin">
            <span className="text-white pl-2">Login</span>
          </Link>
        )}
      </div>
      <AdminNav />
    </nav>
  );
};

export default Nav;
