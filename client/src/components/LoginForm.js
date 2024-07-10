import React, { useState, useEffect } from "react";

const userData = require("./usersdata.json");
let trackMatch = 0;

const LoginForm = (props) => {

    const [userNameText, setUserName] = useState("");
    const [passwordText, setPassword] = useState(""); 
    const [usersNum, setUsersNum] = useState(userData.users.length);     
    const [newUserId, setNewUserId] = useState(usersNum);
    const [allUsers, setUsers] = useState(userData.users);


    const sanitiseString = (input) => {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            "/": '&#x2F;',
            "`": '&grave;'
        };
        const reg = /[&<>"'/]/ig;
        return input.replace(reg, (match)=>(map[match]));
      }

     

    const handleLogin = (event) => {
        event.preventDefault();
        let userArrayA = allUsers;
        for (let i = 0; i < userArrayA.length; i++) {
            // console.log(userArrayA[i].username);
            // console.log(userNameText);
            if (userArrayA[i].username === userNameText && userArrayA[i].password === passwordText) {
                props.handlerLogin();
                break;
            } 
            
        }
        alert("Invalid details, please try again");
    };

    const handleRegister = (event) => {
        event.preventDefault();
if(userNameText.length < 8) {
    alert("The username must be at least eight characters long. Please try again.");
    window.location = "/";
}
if(passwordText.length < 10) {
    alert("The password must be at least 10 characters long. Please try again.");
    window.location = "/";
}

else {

        let trackUser = 0;
        let userArray = allUsers;
        for (let i = 0; i < userArray.length; i++) {
            if (userArray[i].username === userNameText) {
                trackUser = 1;
                break;
            }
        }
        if (trackUser === 1 || userNameText === "") {
            alert("Invalid details.");
            trackUser = 0;
            
        }
        else {
            let newId = newUserId + 1;
           setNewUserId(newId);
           let newUserNum = usersNum + 1;
          setUsersNum(newUserNum);
          
        }
    }
            };


useEffect(()=>{
    if(newUserId > 6) {
 //   console.log(newUserId);
 // console.log("Number of users: " + usersNum);
 alert("You have successfully registered and will be redirected to the todo app when you close this alert.");
addUser();
    }
}, [newUserId]);


            const addUser =  () => {
                
let newUser = {
    "userid": newUserId,
    "username": userNameText,
    "password": passwordText
}

console.log(`The new user name is ${userNameText}, their id number is ${newUserId}`);


let userArrayT = allUsers;
userArrayT[usersNum-1] = newUser;
setUsers(userArrayT);
// console.log(userArrayT);
props.handlerLogin();
            };

            

    const changeUserName = (event) => {
        let inputVal = sanitiseString(event.target.value);
        setUserName(inputVal);
    }

    const changePassword = (event) => {
        setPassword(event.target.value);
    }

    return (
        <form className="container border border-secondary border-3 rounded mt-4 p-3 form-group form-group-lg w-50" >
            <h4 className="mx-auto mb-2">To-Do List App Login and registration</h4>

            <label htmlFor="username" className="mr-2">Username:&nbsp;&nbsp;</label>
            <input type="text" role="textbox" aria-autocomplete="none" onChange={changeUserName} name="username" minLength={8} id="username" className="mb-2 ml-2 col-7"
                required={true} placeholder="Input password here." maxLength={60}></input><br />

            <label htmlFor="password" className="mt-2" >Password:&nbsp;&nbsp;&nbsp;</label>
            <input type="password" aria-autocomplete="none" onChange={changePassword} name="password" minLength={10} id="password" className="ml-2 col-7"
                required={true} placeholder="Input password here." maxLength={60}></input>
                
            <br />  <br />
            <p>
                Please avoid the following special characters: &, &lt;, &gt;, ", ', /, and `.
                </p>
                <p>
                Also please make your password at least 10 characters long and include a mix of uppercase and lowercase letters, 
                at least one number and one special character other than the ones listed above.
                </p>
              

            <div className="col-12">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                    <label className="form-check-label" htmlFor="invalidCheck">
                        Agree to terms and conditions
                    </label>
                    <div className="invalid-feedback">
                        You must agree before submitting.
                    </div>
                </div>
            </div>
            <button className="btn btn-secondary m-3" onClick={handleLogin}>Login</button>
            <button className="btn btn-secondary m-3" onClick={handleRegister}>Register</button>        
        </form>
    )
}

export default LoginForm;
