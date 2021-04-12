import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import BooksControl from './BooksControl';

class SearchBook extends Component {
   
            state = {
                searchedBooks: []
            }
    
        QueryUpdate = (e) => {
            const query = e.target.value;
            if (!query) {
                this.setState({searchedBooks: []});
                return "No result";
            }
            BooksAPI.search(query).then(searchedBooks => {
                console.log(query);
                if (searchedBooks.error) {
                    searchedBooks = [];
                }
                searchedBooks = searchedBooks.map((book) => {
                    const bookInShelf = this.props.books.find(b => b.id === book.id);
                    if (bookInShelf) {
                        book.shelf = bookInShelf.shelf;
                    }
                    return book;
                });
                this.setState({searchedBooks});
            });
        };
    
        render() {
            return (
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search" to="/">Close Page</Link>
                        <div className="search-books-input-wrapper">
                            <input type="text" placeholder="Search by title or author" onChange={this.QueryUpdate}/>
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {this.state.searchedBooks && this.state.searchedBooks.map(book => (
                                <li key={book.id}>
                                    <BooksControl book={book} ShelfUpdate={this.props.ShelfUpdate}/>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            );
        }
    }

export default SearchBook