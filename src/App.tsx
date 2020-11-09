import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import {FormControl, InputGroup} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {InputWithButton} from "./InputWithButton";
import {TaskComponent} from "./TaskComponent";

export class Task {

    id: number;

    description: string;

    creationDate: Date;

    constructor(id: number, description: string, creationDate: Date) {
        this.id = id;
        this.description = description;
        this.creationDate = creationDate;
    }

}

interface AppState {

    tasks: Task[];

}


// React.Component<Props, State>
export default class App extends React.Component<{}, AppState> {

    static CURRENT_ID: number = 0;

    static KEY_DATA: string = "_taskit_data";

    constructor(props: Readonly<{}> | {}) {
        super(props);

        let savedJSONTasks: string | null = localStorage.getItem(App.KEY_DATA);

        let initialTasks: Task[] = [];

        if (savedJSONTasks) {
            initialTasks = JSON.parse(savedJSONTasks);
        }

        if (initialTasks.length === 0) {
            initialTasks = [new Task(1, "Buy some milk", new Date())];
        }

        this.state = {
            tasks: initialTasks
        };

        // let numbers = [1, 2, 3, 4];
        // let doubled = numbers.map(el => {
        //     return el * 2;
        // })
        // console.log(doubled);
    }

    addNewTask(textInput: string) {
        let id = App.CURRENT_ID++;
        let date = new Date();
        let newTask = new Task(id, textInput, date);

        this.setState({
            ...this.state,
        });

        let newTasks = [...this.state.tasks, newTask];

        this.setState({
            tasks: newTasks
        });

        let tasksJSONString = JSON.stringify(newTasks);
        localStorage.setItem(App.KEY_DATA, tasksJSONString);
    }

    clearData() {
        localStorage.setItem(App.KEY_DATA, '');
        this.setState({
            ...this.state,
            tasks: []
        });
    }

    removeTask(task: Task) {
        let index = this.state.tasks.findIndex(t => {
            return t.id === task.id;
        });

        this.state.tasks.splice(index, 1);

        this.setState({
            ...this.state,
            tasks: this.state.tasks
        })


        let tasksJSONString = JSON.stringify(this.state.tasks);
        localStorage.setItem(App.KEY_DATA, tasksJSONString);
    }

    render() {
        return (
            <div className="py-md-3 pl-md-5">
                <Container>
                    <Button className={"col-md-12 mb-3"} variant={"danger"} onClick={() => this.clearData()}>Clear</Button>

                    <InputWithButton callback={(text: string) => this.addNewTask(text)}/>

                    {
                        this.state.tasks.map(task => {
                            return (
                                <TaskComponent task={task} removeCallback={(task: Task) => this.removeTask(task)}/>
                            );
                        })
                    }
                </Container>

            </div>
        );
    }

}
