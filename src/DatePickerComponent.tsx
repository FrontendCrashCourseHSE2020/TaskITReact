import React, {useState} from "react";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Calendar from "react-calendar";
import {formatDate} from "./Utils";

type OnChange = (newDate: Date) => void;

export function DatePickerComponent({value, onChange}: { value: Date, onChange: OnChange }) {
    let [showCalendar, changeShowCalendar] = useState(false);

    function onDateInCalendarChanged(date: Date | Date[]) {
        onChange(date as Date);
        hideCalendar();
    }

    function openCalendar() {
        changeShowCalendar(true);
    }

    function hideCalendar() {
        changeShowCalendar(false);
    }

    return (
        <>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Введите задачу"
                    disabled={true}
                    value={formatDate(value)}
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={() => openCalendar()}>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-calendar-date"
                             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                            <path
                                d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"/>
                        </svg>
                    </Button>
                </InputGroup.Append>
            </InputGroup>

            <Modal className={"calendar-modal"} show={showCalendar} onHide={hideCalendar}>
                <Modal.Header closeButton>
                    <Modal.Title>Select date</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Calendar
                        value={value}
                        onChange={e => onDateInCalendarChanged(e)}
                    />
                </Modal.Body>
            </Modal>
        </>
    )
}
