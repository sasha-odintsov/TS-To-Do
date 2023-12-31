import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { useAppDispatch, useAppSelector } from "../hooks";
import { editUser } from "../store/userSlice";

const User = () => {
  const [user, setUser] = useState("");
  const dispatch = useAppDispatch();
  const storeUser = useAppSelector((state) => state.user.user);

  const onSetUser = () => {
    if (user.trim().length) {
      dispatch(editUser(user));
      setUser("");
    }
  };

  return (
    <div className="border border-slate-100 md:w-1/2 md:mb-0 mb-4 rounded-lg p-7 flex bg-white shadow-lg shadow-slate-200">
      {!storeUser ? (
        <div className="flex w-full">
          <Input
            onChange={(value) => setUser(value)}
            onClick={onSetUser}
            value={user}
            placeholder="Enter your name"
            className="grow bg-slate-100 p-3 me-4 focus:ring-0 focus:outline-none shadow-inner"
            isFocused={true}
          />
          <Button
            onClick={onSetUser}
            text="Set Name"
            className="button-main"
          />
        </div>
      ) : (
        <div className="flex items-center justify-between w-full">
          <span className="capitalize me-4 text-lg text-gray-500">
            Hello, <span className="font-medium">{storeUser}</span>
          </span>
          <Button
            onClick={() => {
              dispatch(editUser(""));
            }}
            text="Exit"
            className="button-main"
          />
        </div>
      )}
    </div>
  );
};

export default User;
