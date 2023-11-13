import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const Settings = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Settings");
  }
  return (
    <div className="p-5 ">
      <h1>Settings</h1>
      <div className="mt-4 bg-white p-5 rounded lg:w-1/2">
        <p>{session?.user.name}</p>
        <p>{session?.user?.email}</p>
        <p>{session?.user?.role}</p>
      </div>
    </div>
  );
};

export default Settings;
