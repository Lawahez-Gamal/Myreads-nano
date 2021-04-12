import React, {Component} from 'react';
import BooksControl from "./BooksControl";

class BookShelf extends Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            this.props.bookList.map((book) => {
                                return <li key={book.id}>
                                    <BooksControl book={book} ShelfUpdate={this.props.ShelfUpdate}/>
                                </li>
                            })
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf