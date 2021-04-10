import React,{Component} from 'react';
import BooksControl from './BooksControl';

class ListBooks extends Component {

    render() {
        const { book } = this.props;

        

        const author = book.authors ? book.authors : "Unknown Author";

        return (
            <div className="book">

                <div className="book-top">

                    <div className="book-cover" style={{ width: 128, height: 193 }}></div>

                    <BooksControl 
                    shelfUpdate = { this.props.shelfUpdate }
                    book = { book }
                    books = { this.props.books }

                    controlCheck = { this.props.controlCheck }
                    />
                </div>

                <div className="book-title">{book.title}</div>

                <div className="book-authors">{author}</div>
            </div>
        )
    }
}

export default ListBooks