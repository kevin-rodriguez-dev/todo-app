import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
/* Añadiendo CSS basico */
import "../assets/css/TodoList.css";

export const TodoList = () => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [tasks, setTasks] = useState([]);

    /* Obtener todas las tareas */
    const getTasks = async () => {
        const tasksCollection = await getDocs(collection(db, "tasks"));
        const data = tasksCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        console.log(data);
        setTasks(data);
    };

    /* Agregar una nueva tarea */
    const addTask = async (data) => {
        let res = await addDoc(collection(db, "tasks"), {
            title: data.title,
            completed: false,
        });

        console.log(res);
        reset();
        getTasks();
    };

    /* Actaulizar el estado de una tarea a "completo" */
    const updateTask = async (taskId) => {
        const taskRef = doc(db, "tasks", taskId);
        const task = tasks.find((t) => t.id === taskId);

        await updateDoc(taskRef, {
            completed: !task.completed,
        });

        getTasks();
    };

    /* Eliminar una tarea */
    const deleteTask = async (id) => {
        const taskRef = doc(db, "tasks", id);
        await deleteDoc(taskRef);

        reset();
        getTasks();
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <>
            <h2>TODO LIST</h2>

            <form onSubmit={handleSubmit(addTask)} className="todo-form">
                <section>
                    <label>New Task</label>
                    <input type="text" {...register("title", { required: true })} required className="todo-input" />
                </section>
                <button type="submit" className="todo-button">
                    Add Task
                </button>
            </form>

            <main>
                <ul className="task-list">
                    {tasks.map((task) => (
                        <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
                            <input type="checkbox" checked={task.completed} onChange={() => updateTask(task.id)} className="task-checkbox" />
                            <span className="task-title">{task.title}</span>
                            <button onClick={() => deleteTask(task.id)} className="delete-button">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </main>
        </>
    );
};
