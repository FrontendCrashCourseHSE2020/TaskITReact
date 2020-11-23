import React, {useState} from "react";
import {FormControl, InputGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";

type InputWithButtonCallback = (value: string) => void;

export function InputWithButton({callback}: { callback: InputWithButtonCallback }) {
    let [inputValue, changeInputValue]: [string, React.Dispatch<React.SetStateAction<string>>] = useState("Example task");

    function onAddButtonClicked() {
        callback(inputValue);
        changeInputValue("");
    }

    return (
        <InputGroup className="mb-3">
            <FormControl
                placeholder="Введите задачу"
                onChange={(event) => {changeInputValue(event.target.value)}}
                value={inputValue}
            />
            <InputGroup.Append>
                <Button variant="outline-secondary" onClick={() => onAddButtonClicked()}>Добавить</Button>
            </InputGroup.Append>
        </InputGroup>
    )
}
