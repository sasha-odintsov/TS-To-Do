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
    if (isEditable && textareaRef.current) {
      const valueEnd = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(valueEnd, valueEnd);
      textareaRef.current.focus();
    }
  }, [isEditable]);

  return (
    <div
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="cursor-grab active:cursor-grabbing border border-slate-100 shadow-inner rounded-md bg-slate-50 p-4 my-3 ease-in-out transition-all"
    >
      <div className="flex justify-between mb-1">
        <div className="text-sm">
          {!is_done ? getDate(created_at) : getDate(done_at)}
          {user && <span className="capitalize"> - {user}</span>}
        </div>
        <div className="ms-2 shrink-0">
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
      <div style={{ display: isEditable ? "none" : "block" }}>
        <div className="flex items-center">
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
            className="hidden"
            id={`checkbox-${id}`}
          />
          <label
            htmlFor={`checkbox-${id}`}
            className="bg-gray-300 shadow-inner w-[32px] h-[19px] block rounded-full cursor-pointer relative before:absolute before:bg-white before:shadow before:w-[15px] before:h-[15px] before:rounded-full before:m-[2px] transition-all me-2 shrink-0"
          ></label>
          <span className="text-lg">{title}</span>
        </div>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ display: !isEditable ? "none" : "block" }}
        className="w-full md:w-2/3 bg-slate-100 px-2 py-1 focus:ring-0 focus:outline-none resize-none rounded-md shadow-inner"
      ></textarea>
    </div>
  );
};

export default Task;
