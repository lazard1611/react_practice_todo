import React, { Component } from "react";

import './search-panel.css';
import ItemStatusFilter from '../item-status-filter/item-status-filter';

export default class SearchPanel  extends Component {

    state = {
        term: ''
    };

    searchChange = (e) => {
        const term = e.target.value;
        this.setState({ term });
        this.props.searchChange(term);
    }

    render () {
        const searchText = 'Type hear to search';
        const { filter, onFilterChange } = this.props;

        return (
            <div className="todo__input_row">
                <div className="todo__input_wrap">
                    <input
                        className="todo__input"
                        placeholder={searchText}
                        onChange={ this.searchChange }
                        value={ this.state.term }
                    />
                </div>

                <ItemStatusFilter
                    filter={ filter }
                    onFilterChange= { onFilterChange }
                />
            </div>
        )
    }
};
