import axios from "axios";

const API_URL = process.env.REACT_APP_TODO_API_URL || "http://localhost:8080/api/v1/todo";

export const getAllTodos = () => axios.get(API_URL);

export const createTodo = (todo) => axios.post(API_URL, todo);

export const updateTodo = (id, todo) =>
    axios.put(`${API_URL}/${id}`, todo);

export const deleteTodo = (id) =>
    axios.delete(`${API_URL}/${id}`);
