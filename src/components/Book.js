import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onMoveBook: PropTypes.func.isRequired
    }
    state = {
        shelfValue: this.props.book.shelf
    }

    moveTo = (e) => {
        e.preventDefault()
        console.log(e.target)
        const shelf = e.target.value
        const book = this.props.book
        console.log('shelf',shelf)
        console.log('book',book)
        if (this.props.onMoveBook)
            this.props.onMoveBook(book, shelf)
    }

    render() {
        const { book } = this.props
        const { shelfValue } = this.state

        return (
            <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks.smallThumbnail})`}}></div>
                        <div className="book-shelf-changer">
                            <select onChange={this.moveTo} value={shelfValue}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors &&
                        book.authors.length &&
                        book.authors.map((author, index) => (
                            <div key={index} className="book-authors">
                                {author}
                            </div>
                        ))}
                </div>
            </li>
        )
    }
}

export default Book;