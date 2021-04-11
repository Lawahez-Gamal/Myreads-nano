import React,{Component} from 'react';
import BooksShelf from './BooksShelf';

import { Link } from 'react-router-dom';

class ListBooks extends Component {

    render() {
        const { books, shelfUpdate } = this.props;

        return (
            <div className="list-books">
               <div className="list-books-title">
                <h1>My Reads</h1>
              </div>

                <div className="list-books-content">
                    <div >

                    <div className="bookshelf">
				    <h2 className="bookshelf-title">Currently Reading</h2>

                    <BooksShelf 
                    books = { books.filter((book) => book.shelf === 'currentlyReading' ) }
                    shelfUpdate = { shelfUpdate }
                    />

                    <h2 className="bookshelf-title">Want To Read</h2>

                <BooksShelf 
                books = { books.filter((book) => book.shelf === 'wantToRead' ) }
                shelfUpdate = { shelfUpdate }
                 />

                <h2 className="bookshelf-title">Read</h2>

                <BooksShelf 
                books = { books.filter((book) => book.shelf === 'read' ) }
                shelfUpdate = { shelfUpdate }
                />

                </div>
            </div>
            </div>

            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
          
        )
    }
}

export default ListBooks