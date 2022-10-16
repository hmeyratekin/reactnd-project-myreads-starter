import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from "./BooksAPI";
import Shelf from "./components/Shelf";
import Search from "./components/Search";
import { Link, Route} from "react-router-dom";

class App extends React.Component {

  state = {
    books: [],
    searchResult: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }
  componentDidMount() {
    BooksAPI.getAll()
        .then((books) => {
          this.setState(() => ({
            books
          }))
        })
  }

  moveBook = (book, shelf) => {

    BooksAPI.update(book, shelf).then(books => {
        book.shelf = shelf;
        this.setState(state => ({
            books: state.books.filter(b => b.id !== book.id).concat([book])
        }));
    })
  }

  onSearchBook = (query) => {
    console.log(query)
    BooksAPI.search(query).then(result => {

      let searchResult = Array.isArray(result) ? result : Array.of(result);
      if (searchResult[0].error)
        searchResult = []
      console.log('searchResult', searchResult)
      this.setState(() => ({
            searchResult
          }));
        }).catch((error) => (console.log(error)));
  }

  render() {
    return (
      <div className="app">
           <Route exact path="/"
                  render={() => (
                      <div className="list-books">
                          <Shelf books={this.state.books} onMoveBook={this.moveBook}></Shelf>
                          <div className="open-search">
                              <Link
                                  to='/search'>
                                  Add a book
                              </Link>
                          </div>
                      </div>            )}
              />
              <Route
                  exact
                  path="/search"
                  render={() => (
                      <Search searchBook={this.onSearchBook} searchResult={this.state.searchResult} moveBook={this.moveBook}></Search>
                  )}
              />
      </div>
    )
  }
}

export default App
