import { useState, useRef, useEffect } from "react";
import { ITask } from "../types/data";
import { useAppDispatch, useAppSelector } from "../hooks";
import { removeTask, editTask } from "../store/tasksSlice";
import Button from "./Button";

const Task: React.FC<ITask> = (props) => {
  const { id, title, is_done, created_at, done_at, user } = props;
  const [isEditable, setEditable] = useState(false);
  const [value, setValue] = useState(title);
  const dispatch = useAppDispatch();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const storeUser = useAppSelector((state) => state.user.user);

  const getDate = (isoStr: string | undefined) => {
    if (!isoStr) return "";

    const date = new Date(isoStr);
    return date.toLocaleString();
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(props));
    e.dataTransfer.effectAllowed = "move";
    e.currentTarget.style.transform = "scale(.98)";
    e.currentTarget.style.opacity = "0.4";
  };
  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = "1";
    e.currentTarget.style.transform = "none";
  };

  useEffect(() => {
    if (isEditable && textareaRef.current) textareaRef.current.focus();
  }, [isEditable]);

  return (
    <div
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="cursor-grab active:cursor-grabbing flex justify-between border border-slate-100 shadow-inner rounded-md bg-slate-50 p-4 my-3 ease-in-out transition-all"
    >
      <div>
        <div className="mb-2 text-sm">
          {!is_done ? getDate(created_at) : getDate(done_at)}
          {user && <span className="capitalize"> - {user}</span>}
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
            className="me-1"
          />
          <span className="text-lg">{title}</span>
        </div>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ display: !isEditable ? "none" : "block" }}
          className="w-[300px] bg-slate-100 px-2 py-1 focus:ring-0 focus:outline-none resize-none rounded-md shadow-inner"
        ></textarea>
      </div>
      <div className="ms-2">
        {!isEditable && !is_done && (
          <Button
            onClick={() => setEditable(true)}
            text="Edit"
            className="button-card me-1 shadow-slate-200"
          />
        )}
        {!isEditable && (
          <Button
            onClick={() => dispatch(removeTask(id))}
            text="Delete"
            className="button-card shadow-slate-200"
          />
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
              className="button-card-confirm me-1"
            />
            <Button
              onClick={() => {
                setEditable(false);
                setValue(title);
              }}
              text="Cancel"
              className="button-card-confirm"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Task;
