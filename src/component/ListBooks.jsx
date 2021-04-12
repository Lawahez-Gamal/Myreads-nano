import React, {Component} from 'react';
import BooksShelf from './BooksShelf';
import {Link} from 'react-router-dom';

class ListBooks extends Component {
  render() {
    return (
        <div className="list-books">
            <div className="list-books-content">
                <div>
                    <BooksShelf shelfTitle='Currently Reading' bookList={this.props.currentlyReading}
                               ShelfUpdate={this.props.ShelfUpdate}/>
                    <BooksShelf shelfTitle='Want to Read' bookList={this.props.wantToRead}
                               ShelfUpdate={this.props.ShelfUpdate}/>
                    <BooksShelf shelfTitle='Read' bookList={this.props.read}
                               ShelfUpdate={this.props.ShelfUpdate}/>
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
}
}

export default ListBooks