import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import useDispatch from "../../hooks/useDispatch";
import useSelector from "../../hooks/useSelector";
import TaskForm from "../../componentS/TaskForm";
import styles from "./EditTask.module.scss";

function EditTaskPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Tìm task theo ID từ URL
    const taskFromStore = useSelector((state) =>
        state.taskLists.find((t) => t.id === parseInt(id))
    );

    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(!taskFromStore);
    const [task, setTask] = useState(taskFromStore);

    //Update State vào Input
    useEffect(() => {
        if (taskFromStore) {
            setTask(taskFromStore);
        } else {
            const fetchTask = async () => {
                try {
                    const response = await fetch(
                        `http://localhost:3001/tasks/${id}`
                    );

                    if (!response.ok) {
                        throw new Error("Task not found");
                    }
                    const fetchedTask = await response.json();
                    setTask(fetchedTask);
                } catch (error) {
                    console.error("Error fetching task:", error);
                    navigate("/");
                } finally {
                    setIsLoading(false);
                }
            };

            fetchTask();
        }
    }, [id, navigate, taskFromStore]);

    const handleUpdateTask = async (newTaskName) => {
        setIsSaving(true);
        const updatedTask = { ...task, name: newTaskName };

        try {
            const response = await fetch(`http://localhost:3001/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTask),
            });

            if (!response.ok) {
                throw new Error("Failed to update task on the server.");
            }

            const savedTask = await response.json();

            dispatch({
                type: "UPDATE_TASK",
                payload: savedTask,
            });
            // Chuyển hướng về trang trước đó
            navigate("/");
        } catch (error) {
            console.error("Error updating task:", error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className={styles.wrapper}>
                <h2>Loading Task...</h2>
            </div>
        );
    }

    // Nếu Task không hợp lệ
    if (!task && !isLoading) {
        return (
            <div className={styles.wrapper}>
                <h2>Task Not Found</h2>
                <p>The task with ID "{id}" does not exist.</p>
                <button onClick={() => navigate("/")}>Go Back to List</button>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <h1>Edit Task</h1>
            <TaskForm
                initialData={task}
                onSubmit={handleUpdateTask}
                submitText="Save Changes"
                isSubmitting={isSaving}
            />
        </div>
    );
}

export default EditTaskPage;
