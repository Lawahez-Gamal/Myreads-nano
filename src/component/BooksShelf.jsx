import React,{Component} from 'react';
import BooksControl from './BooksControl';

class BooksShelf extends Component{
     
   render(){
    const { books, shelfUpdate } = this.props;

    return (
        
            <div className="bookBooksShelf-books"> 
             <ol className="books-grid">

                 {books.map( (book) => (
                         
                  <BooksControl key={book.id}   book = { book } 
                  shelfUpdate = {shelfUpdate }
                             />
                        
                     ))
                 }

             </ol>
            
        </div>

    )
   }
}

export default BooksShelf