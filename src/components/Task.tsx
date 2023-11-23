import { useState } from "react";
import { ITask } from "../types/data";
import { useAppDispatch, useAppSelector } from "../hooks";
import { removeTask, editTask } from "../store/tasksSlice";
import Button from "./Button";

const Task: React.FC<ITask> = (props) => {
  const { id, title, is_done, created_at, done_at, user } = props;
  const [isEditable, setEditable] = useState(false);
  const [value, setValue] = useState(title);
  const dispatch = useAppDispatch();
  const storeUser = useAppSelector((state) => state.user.user);

  const getDate = (isoStr: string | undefined) => {
    if (!isoStr) return "";

    const date = new Date(isoStr);
    return date.toLocaleString();
  };

  return (
    <div
      style={{
        padding: 5,
        border: "1px solid #000",
        margin: "10px 20px",
        borderRadius: 5,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div style={{ marginBottom: 5 }}>
          {!is_done ? getDate(created_at) : getDate(done_at)}
          {user && (
            <span style={{ textTransform: "capitalize" }}> - {user}</span>
          )}
        </div>
        <div style={{ display: isEditable ? "none" : "block" }}>
          <input
            type="checkbox"
            checked={is_done}
            onChange={() =>
              dispatch(
                editTask({
                  ...props,
                  is_done: !is_done,
                  done_at: new Date().toISOString(),
                })
              )
            }
          />
          <span style={{ fontSize: 18 }}>{title}</span>
        </div>
        <div style={{ display: !isEditable ? "none" : "block" }}>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ width: 300 }}
          ></textarea>
        </div>
      </div>
      <div style={{ marginLeft: 10 }}>
        {!isEditable && !is_done && (
          <Button onClick={() => setEditable(true)} text="Edit" />
        )}
        {!isEditable && (
          <Button onClick={() => dispatch(removeTask(id))} text="Delete" />
        )}
        {isEditable && (
          <>
            <Button
              onClick={() => {
                dispatch(
                  editTask({
                    ...props,
                    title: value,
                    created_at: new Date().toISOString(),
                    user: storeUser,
                  })
                );
                setEditable(false);
              }}
              text="Save"
            />
            <Button
              onClick={() => {
                setEditable(false);
                setValue(title);
              }}
              text="Cancel"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Task;
