import React, {Component} from "react";
import PropTypes from "prop-types";
import Book from "./Book";
import {Link} from "react-router-dom";

class Search extends Component {
    static propTypes = {
        searchBook : PropTypes.func.isRequired,
        searchResult: PropTypes.array.isRequired,
        moveBook: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = query => {
        this.setState({ query });
        this.searchBooks(query);
    };


    searchBooks = query => {
        console.log('query',query)
        if (this.props.searchBook)
            this.props.searchBook(query)
    }

    render() {
        const { query } = this.state;
        const { searchResult, moveBook } = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search"
                          to='/'>
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" value={query} onChange={event => this.updateQuery(event.target.value)}
                               placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchResult.map((book) => (
                            <Book key={book.id} book={book} onMoveBook={moveBook} ></Book>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;