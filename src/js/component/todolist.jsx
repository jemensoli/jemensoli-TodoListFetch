import React, { useEffect, useState } from "react";

let urlBase = "https://playground.4geeks.com/apis/fake/todos/user/jemensoli";

const TodoList = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    const getTask = async () => {
        try {
            let response = await fetch(urlBase);
            let data = await response.json();

            if (response.ok) {
                setTodos(data);
            } else if (response.status === 404) {
                await createUser();
                getTask();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTask();
    }, []);

    const createUser = async () => {
        try {
            let response = await fetch(urlBase, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify([]),
            });
            if (response.ok) {
                console.log("Usuario creado con éxito.");
                getTask();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async (index) => {
        try {
            let updatedTodos = [...todos];
            updatedTodos.splice(index, 1);

            let response = await fetch(urlBase, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTodos),
            });

            if (response.ok) {
                console.log("Tarea eliminada con éxito");
                getTask();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const createTask = async () => {
        try {
            const newTask = { label: inputValue, done: false };

            let response = await fetch(urlBase, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify([...todos, newTask]),
            });

            if (response.ok) {
                console.log("Tarea creada con éxito.");
                setInputValue("");
                getTask();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteAll = async () => {
        try {
            let response = await fetch(urlBase, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log("Todas las tareas han sido eliminadas con éxito");
                getTask();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h1>Todo List</h1>
            <ul>
                <li>
                    <input
                        type="text"
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                createTask();
                            }
                        }}
                        placeholder="Agregar una tarea"
                    />
                </li>

                {todos.map((item, index) => (
                    <li key={index}>
                        {item.label}
                        <i
                            className="fas fa-trash-alt"
                            onClick={() => deleteTask(index)}
                        ></i>
                    </li>
                ))}
            </ul>
            <button onClick={deleteAll}>Borrar todo</button>
        </div>
    );
};

export default TodoList;