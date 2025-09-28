import { useState } from "react";
import { useNavigate } from "react-router";
import TaskForm from "../../components/TaskForm";
import useDispatch from "../../hooks/useDispatch";

import styles from "./NewTask.module.scss";

function NewTask() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleAddTask = async (taskName) => {
        setIsSubmitting(true);
        setError(null);

        const newTask = {
            name: taskName,
            completed: false,
        };

        try {
            const response = await fetch("http://localhost:3001/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            });

            if (!response.ok)
                throw new Error("Failed to create task. Please try again.");

            const createTask = await response.json();

            dispatch({
                type: "ADD_TASK",
                payload: createTask,
            });
            // Trả về trang chủ sau khi thêm mới
            navigate("/");
        } catch (error) {
            console.error("Failed to create task:", error);
            setError("Failed to create task. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <h1>Add New Task</h1>
            {error && <p className={styles.errorText}>{error}</p>}

            <TaskForm
                onSubmit={handleAddTask}
                submitText="Add Task"
                isSubmitting={isSubmitting}
            />
        </div>
    );
}
export default NewTask;
