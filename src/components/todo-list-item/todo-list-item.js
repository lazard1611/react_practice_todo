import React, {Component} from "react";

import './todo-list-item.css';
import ButtonItem from "../todo-list-item-button/todo-list-item-button";

export default class TodoListItem extends Component {

    render() {
        let btnState = true;
        let classNames = 'todo_item';

        const { label,
            onDeleted,
            onToggleDone,
            onToggleImportant,
            done,
            important } = this.props;

        if (done && btnState) {
            classNames += ' done';
        }

        if (important) {
            classNames += ' important';
        }

        return (
            <div className = {classNames}>
                <div
                    onClick={ onToggleDone }
                    className= 'todo_item__text'
                >
                    { label }
                </div>
                <div className="todo_item__buttons_wrap">
                    <ButtonItem
                        label= '#trash'
                        clickBtn = { onDeleted }
                    />
                    <ButtonItem
                        label= '#excalmation'
                        clickBtn= { onToggleImportant }
                    />
                </div>
            </div>
        );
    }
};
