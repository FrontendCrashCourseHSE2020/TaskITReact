import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {dataService} from "./DataService";
import {Alert} from "react-bootstrap";

export function LoginComponent() {
    let [login, changeLogin] = useState("");
    let [password, changePassword] = useState("");
    let [showAlert, changeShowAlert] = useState(false);

    const history = useHistory();

    async function onLoginClicked() {
        changeShowAlert(false);

        let authorized = await dataService.login(login, password);
        if (authorized) {
            history.push("/home");
        } else {
            changeShowAlert(true);
        }
    }

    return (
        <form className="form-signin">

            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

            {
                showAlert && <Alert variant={"danger"}>
                    Wrong login or password
                </Alert>
            }

            <label htmlFor="inputLogin" className="sr-only">Login</label>
            <input value={login} onChange={event => changeLogin(event.target.value)} id="inputLogin"
                   className="form-control" placeholder="Login"/>

            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input value={password} onChange={event => changePassword(event.target.value)} type="password"
                   id="inputPassword" className="form-control" placeholder="Password"/>

            <div className="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me"/> Remember me
                </label>
            </div>
            <button onClick={onLoginClicked} type={"button"} className="btn btn-lg btn-primary btn-block">Sign in
            </button>
            <p className="mt-5 mb-3 text-muted">© 2020</p>
        </form>
    );
}
