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
    <div style={{ display: "flex", justifyContent: "end" }}>
      {!storeUser ? (
        <div>
          <Input
            onChange={(value) => setUser(value)}
            onClick={onSetUser}
            value={user}
            style={{ padding: 3, marginRight: 2 }}
            placeholder="Enter your name"
          />
          <Button
            onClick={onSetUser}
            text="Set Name"
            style={{ padding: 3, borderRadius: 5 }}
          />
        </div>
      ) : (
        <div>
          <span style={{ marginRight: 10, textTransform: "capitalize" }}>
            Hello, {storeUser}
          </span>
          <Button
            onClick={() => {
              dispatch(editUser(""));
            }}
            text="Exit"
            style={{ padding: 3, borderRadius: 5 }}
          />
        </div>
      )}
    </div>
  );
};

export default User;
