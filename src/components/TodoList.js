import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo
} from "../services/TodoService";
import { isAuthenticated } from "../services/AuthService";

function TodoList() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        // Check if user is authenticated
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }
        loadTodos();
    }, [navigate]);

    const loadTodos = () => {
        getAllTodos()
            .then(res => setTodos(res.data))
            .catch(err => {
                console.error(err);
                // If unauthorized, redirect to login
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            });
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2>Todo List (CRUD)</h2>
                <button 
                    onClick={handleLogout}
                    style={{ 
                        padding: "10px 20px", 
                        backgroundColor: "#dc3545", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "5px", 
                        cursor: "pointer" 
                    }}
                >
                    Logout
                </button>
            </div>


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
