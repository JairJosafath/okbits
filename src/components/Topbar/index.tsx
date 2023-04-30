import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  return (
    <div
      className="bg-blue-900 h-10 flex justify-between items-center
    px-5 text-white "
    >
      <p>OkBits</p>
      <p>{user.username}</p>
    </div>
  );
}
