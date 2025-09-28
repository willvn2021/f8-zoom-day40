import { Link } from "react-router-dom";
import clsx from "clsx";
import styles from "./TaskItem.module.scss";

function TaskItem({ task, onUpdateStatus, onDelete, isDeleting }) {
    const handleDelete = () => {
        // Confirm trước khi xóa
        if (window.confirm("Bạn có chắc muốn xóa task này?")) {
            onDelete(task.id);
        }
    };

    return (
        <li
            className={clsx(styles.taskItem, {
                [styles.completed]: task.completed,
                [styles.deleting]: isDeleting,
            })}
        >
            <input
                id={`task-${task.id}`}
                type="checkbox"
                checked={task.completed}
                onChange={() => onUpdateStatus(task)}
                disabled={isDeleting}
            />
            <Link to={`/${task.id}/edit`} className={styles.taskLink}>
                <label htmlFor={`task-${task.id}`} className={styles.taskName}>
                    {task.name}
                </label>
            </Link>

            {/* Nút Edit */}
            <Link
                to={`/${task.id}/edit`}
                className={clsx(styles.editButton, {
                    [styles.disabled]: isDeleting,
                })}
            >
                Edit
            </Link>

            {/* Nút Delete */}
            <button
                className={styles.deleteButton}
                onClick={handleDelete}
                disabled={isDeleting}
            >
                {isDeleting ? "Deleting..." : "Delete"}
            </button>
        </li>
    );
}

export default TaskItem;
