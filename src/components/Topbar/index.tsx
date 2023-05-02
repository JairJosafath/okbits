import { AuthContext } from "@/context/authContext";
import { useContext, useState } from "react";
import LabeledInput from "../LabeledInput";
import Button from "../Button";
import useAuth from "@/hooks/useAuth";

export default function Topbar() {
  const { user, setUser } = useContext(AuthContext);
  const { setSignout } = useAuth();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div
      className="bg-blue-900 h-10 flex justify-between items-center
    px-5 text-white "
    >
      <p>OkBits</p>
      <p
        className="hover:bg-blue-800 z-10 p-1 cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
      >
        {user.username}
      </p>
      {showMenu && (
        <menu
          className="absolute top-0 right-0 p-4 m-3 mt-12 z-10 bg-gray-200
      h-96 w-96 rounded-md shadow-lg
      "
        >
          {/* header */}
          <div className="flex justify-between ">
            <label className="text-gray-800 ">Account Settings</label>
            <Button
              label="Sign out"
              custom="bg-red-500 hover:bg-red-600"
              onClick={() => {
                setSignout(true);
                setShowMenu(false);
                setUser?.({ username: "", id: -1 });
              }}
            />
          </div>
          {/* account info */}
          {/* account settings */}
          {/* footer */}
        </menu>
      )}
    </div>
  );
}
