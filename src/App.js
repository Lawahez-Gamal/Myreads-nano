import React,{Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from "./component/ListBooks";
import SearchBook from "./component/SearchBook";
import {Route} from 'react-router-dom';

class BooksApp extends Component {
 
      state = {
          books: [],
          loading: true,
      }


  componentDidMount() {
      BooksAPI.getAll().then(books => {
          this.setState({books: books, loading: false})
      })
  }

  ShelfUpdate = (book, shelf) => {
      BooksAPI.update(book, shelf)
          .then(
              this.setState((state) => ({
                  books: state.books.map(mybook => {
                      if (mybook.title === book.title) {
                          mybook.shelf = shelf;
                          return mybook
                      } else {
                          return mybook
                      }
                  }),
                  loading: false
              }))
          )
  };

  render() {
      const state = this.state;
      const currentlyReading = state.books.filter((book) => book.shelf === 'currentlyReading')
      const wantToRead = state.books.filter((book) => book.shelf === 'wantToRead')
      const read = state.books.filter((book) => book.shelf === 'read')

      return (
          <div className="app">
              <Route path="/" exact render={() => (
                  <div>
                      <div className="list-books-title">
                          <h1>My Reads</h1>
                      </div>
                      {
                          !state.loading ? (
                              <ListBooks
                                  currentlyReading={currentlyReading}
                                  wantToRead={wantToRead}
                                  read={read}
                                  ShelfUpdate={this.ShelfUpdate}
                              />
                          ) : (
                              <div className="loader"/>
                          )
                      }
                  </div>
              )}/>
              <Route path="/search" render={({history}) => (
                  <SearchBook
                      ShelfUpdate={this.ShelfUpdate}
                      history={history}
                      books={currentlyReading.concat(wantToRead, read)}
                  />
              )}/>
          </div>
      )
  }
}

export default BooksApp