import React from 'react';
import logo from './logo.svg';
import './App.css';

class Task {

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

    textInput: string;

}


// React.Component<Props, State>
export default class App extends React.Component<{}, AppState> {

    static CURRENT_ID: number = 0;

    constructor(props: Readonly<{}> | {}) {
        super(props);

        this.state = {
            tasks: [new Task(1, "Buy some milk", new Date())],
            textInput: ""
        };

        // let numbers = [1, 2, 3, 4];
        // let doubled = numbers.map(el => {
        //     return el * 2;
        // })
        // console.log(doubled);
    }

    addNewTask() {
        let id = App.CURRENT_ID++;
        let date = new Date();
        let newTask = new Task(id, this.state.textInput, date);

        this.setState({
            ...this.state,
            textInput: ''
        });

        this.setState({
            tasks: [...this.state.tasks, newTask]
        });
    }

    onTaskNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            textInput: event.target.value
        });
    }

    render() {
        return (
            <main className="py-md-3 pl-md-5">
                <div className="container">
                    <div className="input-group mb-3">

                        <input type="text"
                               value={this.state.textInput}
                               onChange={event => {this.onTaskNameChange(event)}}
                               className="form-control" placeholder="Введите задачу"/>

                        <div className="input-group-append">

                            <button className="btn btn-outline-secondary"
                                type="button" onClick={() => this.addNewTask()}>
                                Добавить
                            </button>

                        </div>
                    </div>
                </div>

                {
                    this.state.tasks.map(task => {
                        return (
                            <div>
                                {task.description}
                            </div>
                        );
                    })
                }

            </main>
        );
    }

}
