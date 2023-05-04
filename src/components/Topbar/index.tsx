import { AuthContext } from "@/context/authContext";
import { useContext, useEffect, useState } from "react";
import LabeledInput from "../LabeledInput";
import Button from "../Button";
import useAuth from "@/hooks/useAuth";
import { UserI } from "@/util/types";
import useProfile from "@/hooksTanstack/useProfile";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const { user, setUser } = useContext(AuthContext);
  const { setSignout } = useAuth();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const router = useRouter();
  const {
    updateProfile,
    deleteProfile,
    useGetProfile: getProfile,
  } = useProfile();
  const { data: userdata, isSuccess } = getProfile(user.id.toString());
  const [updateUser, setUpdateUser] = useState<UserI>(user);

  useEffect(() => {
    if (userdata?.user) setUpdateUser(userdata?.user);
  }, [userdata?.user?.id]);
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
        {userdata?.user?.alias}
      </p>
      {showMenu && (
        <menu
          className="absolute top-0 right-0 p-4 m-3 mt-12 z-10 bg-gray-200
      h-96 w-96 rounded-md shadow-lg
      grid content-between 
      "
        >
          {/* header */}
          <div className="flex justify-between ">
            <label className="text-gray-800 ">Account Settings</label>
            <Button
              label="Sign out"
              custom="bg-gray-300 hover:bg-gray-200 text-gray-800"
              onClick={() => {
                setSignout(true);
                setShowMenu(false);
                setUser?.({ username: "", id: -1 });
              }}
            />
          </div>
          {/* account info */}
          <div className=" text-black grid content-between h-[200px] gap-5 p-2">
            <LabeledInput
              label="Username"
              value={user.username}
              custom="bg-gray-200 text-black"
              disabled
            />
            <LabeledInput
              label="Alias"
              value={updateUser?.alias}
              onChange={(e) =>
                setUpdateUser?.({ ...userdata?.user, alias: e.target.value })
              }
            />
            <Button
              label="save"
              custom="w-[100px] mx-auto "
              onClick={() => {
                updateProfile.mutate(updateUser);
              }}
            />
          </div>

          {/* account settings */}

          {/* footer */}
          <div className="flex justify-around mt-5">
            <Button
              label="delete account"
              custom="bg-red-500 hover:bg-red-600 "
              onClick={() => {
                deleteProfile.mutate(user.id.toString());
                setSignout(true);
                router.push("/auth");
              }}
            />
            <Button
              label="reset password"
              // custom="bg-orange-500 hover:bg-orange-600"
            />
          </div>
        </menu>
      )}
    </div>
  );
}
