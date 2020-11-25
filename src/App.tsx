import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import {FormControl, InputGroup} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {InputWithButton} from "./InputWithButton";
import {TaskComponent} from "./TaskComponent";
import {dataService} from "./DataService";

export interface Task {

    id?: number;

    description: string;

    creationDate: number;

}

interface AppState {

    tasks: Task[];

}


// React.Component<Props, State>
export default class App extends React.Component<{}, AppState> {

    static KEY_DATA: string = "_taskit_data";

    constructor(props: Readonly<{}> | {}) {
        super(props);

        dataService.getAll().then(value => {
            this.setState({
                ...this.state,
                tasks: value
            })
        });

        this.state = {
            tasks: []
        };
    }

    async addNewTask(textInput: string) {
        let newTask = {
            id: 0,
            description: textInput,
            creationDate: new Date().getTime()
        };

        let savedObject = await dataService.saveTask(newTask);

        let newTasks = [...this.state.tasks, savedObject];

        this.setState({
            tasks: newTasks
        });
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
