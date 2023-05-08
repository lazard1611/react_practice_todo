import React, { Component } from 'react';

import './app.css';
import AppHeader from '../app-header/app-header';
import ItemAddForm from '../item-add-form/item-add-form';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';

export default class App extends Component {

    minId = 100;

    state = {
        todoData:  [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome app'),
            this.createTodoItem('Have a lunch')
        ],
        term: '',
        filter: 'all'
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.minId++
        }
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newArr = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];
            return {
                todoData: newArr
            }
        })
    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({todoData}) => {
            const newArr = [
                ...todoData,
                newItem
            ]
            return {
                todoData: newArr
            }
        });
    }

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return  {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return  {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };

    filterSearch(items, term) {
        if (term.length === 0) return items;

        return items.filter((item) => {
            return item.label
                .toLowerCase()
                .indexOf(term) > -1;
        })
    }

    filterItems(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    };

    onSearchChange = (term) => {
        this.setState({ term })
    };

    onFilterChange = (filter) => {
        this.setState({ filter })
    };

    render () {
        const { todoData, term, filter } = this.state;
        const visibleItems = this.filterItems(this.filterSearch(todoData, term), filter);
        const doneCount = todoData
            .filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="base">
                <main className="wrapper">
                    <AppHeader
                        toDo={ todoCount }
                        done={ doneCount }
                    />
                    <ItemAddForm
                        addNewItem = { this.addItem }
                    />
                    <SearchPanel
                        searchChange = { this.onSearchChange }
                        filter={ filter }
                        onFilterChange= { this.onFilterChange }
                    />
                    <TodoList
                        todos = { visibleItems }
                        onDeleted= { this.deleteItem }
                        onToggleImportant={ this.onToggleImportant }
                        onToggleDone= { this.onToggleDone }
                    />
                </main>
            </div>
        );
    }
};
