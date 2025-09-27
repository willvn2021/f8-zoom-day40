// import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import clsx from "clsx";
import useDispatch from "../../hooks/useDispatch";
import useSelector from "../../hooks/useSelector";
import styles from "./DemoReduxReact.module.scss";

function DemoReduxReact() {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.taskLists);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Handle Thêm Task
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            dispatch({
                type: "ADD_TASK",
                payload: {
                    id: Date.now(),
                    name: inputValue,
                    completed: false,
                },
            });

            setInputValue("");
        }
    };

    // Handle Load Tasks
    const handleLoadTasks = () => {
        // Dữ liệu fake để load vào store
        const sampleTasks = [
            { id: 101, name: "Học HTML & CSS", completed: true },
            { id: 102, name: "Học JavaScript", completed: true },
            { id: 103, name: "Học ReactJS", completed: false },
            { id: 104, name: "Làm project cuối khóa", completed: false },
        ];

        dispatch({
            type: "SET_TASKS",
            payload: sampleTasks,
        });
    };

    // Handle Update Task
    const handleUpdateTask = (task) => {
        dispatch({
            type: "UPDATE_TASK",
            payload: {
                ...task,
                completed: !task.completed,
            },
        });
    };

    // Handle Delete Task
    const handleDeleteTask = (taskId) => {
        dispatch({
            type: "DELETE_TASK",
            payload: taskId,
        });
    };

    return (
        <div className={styles.wrapper}>
            <h1>Task Manager</h1>
            <p>Demo React & Redux | From F8 Width Love ❤️</p>
            <form className={styles.taskForm} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="task-name"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Add new task..."
                />
                <button type="submit">Add</button>
                <button type="button" onClick={handleLoadTasks}>
                    Load Tasks
                </button>
            </form>

            <ul className={styles.taskList}>
                {tasks.map((task) => {
                    return (
                        <li
                            key={task.id}
                            className={clsx(styles.taskItem, {
                                [styles.completed]: task.completed,
                            })}
                        >
                            <input
                                id={`task-${task.id}`}
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleUpdateTask(task)}
                            />
                            <label
                                htmlFor={`task-${task.id}`}
                                className={styles.taskName}
                            >
                                {task.name}
                            </label>
                            <button
                                className={styles.deleteButton}
                                onClick={() => handleDeleteTask(task.id)}
                            >
                                Delete
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default DemoReduxReact;
