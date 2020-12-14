import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import {InputWithButton} from "./InputWithButton";
import {TaskComponent} from "./TaskComponent";
import {dataService} from "./DataService";
import 'react-calendar/dist/Calendar.css';
import {DatePickerComponent} from "./DatePickerComponent";

export interface Task {

    id?: number;

    description: string;

    creationDate: number;

}

interface HomeState {

    tasks: Task[];

    date: Date;

}


// React.Component<Props, State>
export default class HomeComponent extends React.Component<{}, HomeState> {

    constructor(props: Readonly<{}> | {}) {
        super(props);

        this.loadData();

        this.state = {
            tasks: [],
            date: new Date()
        };
    }

    private loadData(time?: number) {
        let loadPromise;

        if (time) {
            loadPromise = dataService.getByUnixTime(time);
        } else {
            loadPromise = dataService.getAll();
        }

        loadPromise.then(value => {
            this.setState({
                ...this.state,
                tasks: value
            });
        });
    }

    async addNewTask(textInput: string) {
        let date = new Date();
        date.setHours(0);
        date.setMilliseconds(0);
        date.setMinutes(0);
        date.setSeconds(0);

        let newTask = {
            id: 0,
            description: textInput,
            creationDate: date.getTime()
        };

        let savedObject = await dataService.saveTask(newTask);

        let newTasks = [...this.state.tasks, savedObject];

        this.setState({
            tasks: newTasks
        });
    }

    clearData() {
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
    }

    onDateChange(date: Date) {
        this.setState({
            ...this.state,
            date: date
        })

        this.loadData(date.getTime());
    }

    render() {
        return (
            <div className="py-md-3 pl-md-5">
                <Container>
                    <Button className={"col-md-12 mb-3"} variant={"danger"} onClick={() => this.clearData()}>Clear</Button>

                    <DatePickerComponent
                        onChange={e => this.onDateChange(e)}
                        value={this.state.date}
                    />

                    {/*59.927104, 30.343612*/}

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
