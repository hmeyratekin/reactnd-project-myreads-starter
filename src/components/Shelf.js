import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from "./Book";

class Shelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onMoveBook: PropTypes.func.isRequired
    }
    state = {
        shelfType: ''
    }

    render() {
        const { books, onMoveBook } = this.props
        const wantToReadBooks = books.filter((book) => book.shelf === 'wantToRead');
        const readBooks = books.filter((book) => book.shelf ==='read');
        const currentlyReading = books.filter((book) => book.shelf ==='currentlyReading');

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {currentlyReading.map((book) => (
                                <Book key={book.id} book={book} onMoveBook = {onMoveBook}></Book>
                            ))}
                        </ol>
                    </div>
                </div>

                <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {wantToReadBooks.map((book) => (
                                <Book key={book.id} book={book} onMoveBook = {onMoveBook}></Book>
                            ))}
                        </ol>
                    </div>
                </div>

                <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {readBooks.map((book) => (
                                <Book key={book.id} book={book} onMoveBook = {onMoveBook}></Book>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>

        )
    }
}

export default Shelf