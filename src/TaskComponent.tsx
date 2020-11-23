import React from "react";
import Button from "react-bootstrap/esm/Button";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {Task} from "./DataService";

type RemoveCallback = (task: Task) => void;

export function TaskComponent({task, removeCallback}: {task: Task, removeCallback: RemoveCallback}) {

    const dateFormatter = new Intl.DateTimeFormat('ru');

    function onRemoveButtonClicked() {
        removeCallback(task);
    }

    function formatDate(date: number): string {
        return dateFormatter.format(date);
    }

    return (
        <Row className={"mb-1"}>
            <Col md={"3"} xs={"12"} sm={"12"}>
                <span>{formatDate(task.creationDate)}</span>
            </Col>
            <Col md={"7"} xs={"12"} sm={"12"}>
                <span className={"ml-1"}>{task.description}</span>
            </Col>
            <Col md={"2"} xs={"12"} sm={"12"}>
                <Button style={{"width": "100%"}}
                        className={"float-right"}
                        variant={"danger"} onClick={() => onRemoveButtonClicked()}>Удалить</Button>
            </Col>
        </Row>
    );
}
