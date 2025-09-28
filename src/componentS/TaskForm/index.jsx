import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TaskForm.module.scss";

function TaskForm({
    initialData = { name: "" },
    onSubmit,
    submitText = "Submit",
    isSubmitting = false,
}) {
    const navigate = useNavigate();
    const [taskName, setTaskName] = useState(initialData.name);
    const [error, setError] = useState(null);
    const inputRef = useRef(null);

    // Auto focus vào input field khi component mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation: Title không được trống sau khi đã trim khoảng trắng thừa
        if (!taskName.trim()) {
            setError("Task name cannot be empty.");
            return;
        }
        setError(null);
        onSubmit(taskName);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {/* Hiển thị error message nếu validation có lỗi */}
            {error && <p className={styles.errorText}>{error}</p>}
            <label htmlFor="task-name">Task Name</label>
            <input
                id="task-name"
                ref={inputRef}
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                disabled={isSubmitting}
            />
            <div className={styles.buttons}>
                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : submitText}
                </button>
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className={styles.cancelButton}
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default TaskForm;
