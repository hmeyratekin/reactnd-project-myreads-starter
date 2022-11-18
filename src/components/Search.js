import React, {Component} from "react";
import PropTypes from "prop-types";
import Book from "./Book";
import {Link} from "react-router-dom";
import * as BooksAPI from "../BooksAPI";

class Search extends Component {
    static propTypes = {
        moveBook: PropTypes.func.isRequired
    }

    state = {
        query: '',
        searchResult: []
    }

    updateQuery = query => {
        this.setState({ query });
        this.searchBooks(query);
    };

    onSearchBook = (query) => {

        this.setState({ query });

        if (!query || query==='') {
            let searchResult = [];
            this.setState(() => ({searchResult}));
        } else {

            BooksAPI.search(query.trim()).then(result => {

                let searchResult = Array.isArray(result) ? result : Array.of(result);

                if (searchResult[0].error) {
                    this.setState(() => ({ searchResult: [] }))
                } else {
                    this.matchWithMyBooks(result)
                    this.setState(() => ({ searchResult: result }))
                }
                console.log('searchResult', searchResult)
                this.setState(() => ({
                    searchResult
                }));
            }).catch((error) => (console.log(error)));
        }
    }

    matchWithMyBooks = (books) => {
        books.forEach((book) => {
            book.shelf = 'none';
            this.props.books.forEach((myBook) => {
                if (myBook.id === book.id) {
                    book.shelf = myBook.shelf;
                }
            });
        });
        return books;
    };


    render() {
        const { query, searchResult } = this.state;
        const { moveBook } = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search"
                          to='/'>
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" value={query} onChange={event => this.onSearchBook(event.target.value)}
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