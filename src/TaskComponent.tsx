import {Task} from "./HomeComponent";
import React from "react";
import Button from "react-bootstrap/esm/Button";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {formatUnixTime} from "./Utils";

type RemoveCallback = (task: Task) => void;

export function TaskComponent({task, removeCallback}: {task: Task, removeCallback: RemoveCallback}) {

    function onRemoveButtonClicked() {
        removeCallback(task);
    }

    return (
        <Row className={"mb-1"}>
            <Col md={"3"} xs={"12"} sm={"12"}>
                <span>{formatUnixTime(task.creationDate)}</span>
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
