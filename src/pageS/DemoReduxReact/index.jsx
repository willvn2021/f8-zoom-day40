// import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDispatch from "../../hooks/useDispatch";
import useSelector from "../../hooks/useSelector";
import TaskItem from "../../componentS/TaskItem";
import styles from "./DemoReduxReact.module.scss";

function DemoReduxReact() {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.taskLists);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("http://localhost:3001/tasks");
                const tasks = await response.json();
                dispatch({
                    type: "SET_TASKS",
                    payload: tasks,
                });
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, [dispatch]);

    // Handle Update Checkbox Task
    const handleUpdateTask = async (task) => {
        const updatedTask = { ...task, completed: !task.completed };

        try {
            const response = await fetch(
                `http://localhost:3001/tasks/${task.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedTask),
                }
            );

            if (!response.ok) throw new Error("Failed to update task status.");

            const savedTask = await response.json();

            dispatch({
                type: "UPDATE_TASK",
                payload: savedTask,
            });
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // Handle Delete Task
    const handleDeleteTask = async (taskId) => {
        setDeletingId(taskId);
        try {
            const response = await fetch(
                `http://localhost:3001/tasks/${taskId}`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) {
                throw new Error("Failed to delete task.");
            }
            // Gọi API DELETE, sau đó dispatch DELETE_TASK
            dispatch({
                type: "DELETE_TASK",
                payload: taskId,
            });
        } catch (error) {
            console.error("Failed to delete task:", error);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className={styles.wrapper}>
            <h1>Task Manager</h1>
            <div className={styles.header}>
                <p>From F8 Width Love ❤️</p>
                <Link to="/add" className={styles.addButton}>
                    Add New Task
                </Link>
            </div>

            {isLoading ? (
                <p className={styles.loadingText}>Loading tasks...</p>
            ) : tasks.length > 0 ? (
                <ul className={styles.taskList}>
                    {tasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onUpdateStatus={handleUpdateTask}
                            onDelete={handleDeleteTask}
                            isDeleting={deletingId === task.id}
                        />
                    ))}
                </ul>
            ) : (
                <p className={styles.emptyText}>
                    No tasks found. Click "Load Tasks" to get started.
                </p>
            )}
        </div>
    );
}

export default DemoReduxReact;
