import React, { useState, useEffect} from 'react';
import EditTodo from './EditTodo';
import InputTodo from './InputTodo';

const ListTodos = () => {

const [todos, setTodos] = useState([]);

// deleteTodo function

const deleteTodo = async (id) => {
    try {
        const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {method: "DELETE"});

        // console.log(deleteTodo);
        setTodos(todos.filter(todo => todo.todo_id !== id));
    }
    catch(err) {
        console.error(err.message);
    }
};


    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();

           // console.log(jsonData);
           setTodos(jsonData);
        } catch(err) {
            console.error(err.message);
        }
    }
useEffect(() => {
    getTodos();
}, []);

// console.log(todos);


return (
        <>
        {" "}
        <InputTodo reRender={getTodos}/>
        <table className="table">      
        <thead>
            <tr>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {/* 
            <tr>
                <td>John</td>
                <td>Doe</td>
                <td>johndoe@wowmail.com</td>
            </tr>
            
            */}
                 {todos.map(todo => (
                    <tr key={todo.todo_id}>
                    <td>{todo.description}</td>
                    <td><EditTodo todo={todo}/></td>
                    <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                 </tr>))} 
        </tbody>
</table>
</>
    )
}

export default ListTodos;