import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import {InputWithButton} from "./InputWithButton";
import {TaskComponent} from "./TaskComponent";
import dataService, {Task} from "./DataService";

interface AppState {

    tasks: Task[];

}


// React.Component<Props, State>
export default class App extends React.Component<{}, AppState> {

    static CURRENT_ID: number = 0;

    static KEY_DATA: string = "_taskit_data";

    constructor(props: Readonly<{}> | {}) {
        super(props);

        dataService.getTasks().then(value => {
            value = value ? value : [new Task(1, "Buy some milk", new Date().getTime())];

            this.setState({
                tasks: value
            });
        });

        this.state = {
            tasks: []
        };
    }

    async addNewTask(textInput: string) {
        let id = App.CURRENT_ID++;
        let newTask = new Task(id, textInput, new Date().getTime());

        this.setState({
            ...this.state,
        });

        let newTasks = [...this.state.tasks, newTask];

        this.setState({
            tasks: newTasks
        });

        await dataService.saveItem(newTask);
    }

    clearData() {
        this.setState({
            ...this.state,
            tasks: []
        });
    }

    async removeTask(task: Task) {
        if (task.id != null) {
            await dataService.deleteItem(task.id);

            let index = this.state.tasks.findIndex(t => {
                return t.id === task.id;
            });

            this.state.tasks.splice(index, 1);

            this.setState({
                ...this.state,
                tasks: this.state.tasks
            })
        }
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
