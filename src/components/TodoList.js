import React, { useEffect, useState } from "react";
import {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo
} from "../services/TodoService";

function TodoList() {
    const [todos, setTodos] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = () => {
        getAllTodos()
            .then(res => setTodos(res.data))
            .catch(err => console.error(err));
    };


    const handleSubmit = () => {
        const todoData = {
            title,
            description,
            isCompleted: false
        };


        if (editingId !== null) {
            updateTodo(editingId, todoData).then(() => {
                resetForm();
                loadTodos();
            });
        }

        else {
            createTodo(todoData).then(() => {
                resetForm();
                loadTodos();
            });
        }
    };


    const handleDelete = (id) => {
        deleteTodo(id).then(loadTodos);
    };


    const handleEdit = (todo) => {
        setEditingId(todo.id);
        setTitle(todo.title);
        setDescription(todo.description);
    };


    const toggleCompleted = (todo) => {
        updateTodo(todo.id, {
            ...todo,
            isCompleted: !todo.isCompleted
        }).then(loadTodos);
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setEditingId(null);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Todo List (CRUD)</h2>


            <input
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />

            <br /><br />

            <textarea
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />

            <br /><br />

            <button onClick={handleSubmit}>
                {editingId ? "Update Todo" : "Add Todo"}
            </button>

            {editingId && (
                <button onClick={resetForm} style={{ marginLeft: "10px" }}>
                    Cancel
                </button>
            )}

            <hr />


            <ul>
                {todos.map(todo => (
                    <li key={todo.id} style={{ marginBottom: "10px" }}>
                        <b>{todo.title}</b> — {todo.description}
                        <br />
                        Status: {todo.isCompleted ? "✅ Completed" : "❌ Pending"}

                        <br /><br />

                        <button onClick={() => toggleCompleted(todo)}>
                            Toggle Complete
                        </button>

                        <button
                            onClick={() => handleEdit(todo)}
                            style={{ marginLeft: "10px" }}
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => handleDelete(todo.id)}
                            style={{ marginLeft: "10px" }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
