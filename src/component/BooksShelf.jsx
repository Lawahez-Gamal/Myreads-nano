import React,{Component} from 'react';
import ListBooks from './ListBooks';

class BooksShelf extends Component{
     
   render(){
    const { books } = this.props;

    const currentlyRead = books.filter( (book) => book.shelf === "currentlyRead");

    const wantToRead = books.filter( (book) => book.shelf === "want-To-Read");

    const read = books.filter( (book) => book.shelf === "read");

    return (
        <div className="container">
        <div className="bookBooksShelf">
            <h2 className="bookBooksShelf-title">Currently Read</h2>

            <div className="bookBooksShelf-books"> 
             <ol className="books-grid">

                 {
                     currentlyRead.map( (book) => (
                         <li key={book.id}>
                             <ListBooks books = { this.props.books }  book = { book } 
                             shelfUpdate = { this.props.shelfUpdate }
                             />
                         </li>
                     ))
                 }

             </ol>
            </div>
        </div>

        <div className="bookBooksShelf">
            <h2 className="bookBooksShelf-title">Want to Read</h2>

            <div className="bookBooksShelf-books"> 
             <ol className="books-grid">

        {
            wantToRead.map( (book) => (
                <li key={book.id}>
                    <ListBooks books = { this.props.books }  book = { book } 
                    shelfUpdate = { this.props.shelfUpdate }
                    />
                </li>
            ))
        }

        </ol>
        </div>
        </div>

        <div className="bookBooksShelf">
            <h2 className="bookBooksShelf-title"> Read</h2>

            <div className="bookBooksShelf-books"> 
             <ol className="books-grid">

        {
            read.map( (book) => (
                <li key={book.id}>
                    <ListBooks books = { this.props.books }  book = { book } 
                    shelfUpdate = { this.props.shelfUpdate }
                    />
                </li>
            ))
        }

        </ol>
        </div>
        </div>
</div>
    )
   }
}

export default BooksShelf