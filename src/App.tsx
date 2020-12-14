
import './App.css';
import React from 'react';
import 'react-calendar/dist/Calendar.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import HomeComponent from "./HomeComponent";
import {LoginComponent} from "./LoginComponent";


// React.Component<Props, State>
export default class App extends React.Component<{}, {}> {


    constructor(props: Readonly<{}> | {}) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <LoginComponent/>
                    </Route>

                    <Route exact path="/home">
                        <HomeComponent/>
                    </Route>
                </Switch>
            </Router>
        );
    }

}
