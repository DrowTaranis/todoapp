import './App.css';
import React, {useState} from "react";
import ListTodos from './components/ListTodos.js';
import LoginForm from './components/LoginForm.js';


const App = () => {
const [loginStatus, setLoginStatus] = useState('noLogin');

const handlerLogin =  () => {
  
 setLoginStatus("loggedIn");
  alert("You have successfully logged in.");
}


if (loginStatus === 'noLogin') {
return (
<LoginForm handlerLogin={handlerLogin}/>
)
}

else {
  return (
    <>
    <div className="container">
    <ListTodos />
    </div>    
    </>
  );

}

}

export default App;
