import React,{Component} from 'react';

class BooksControl extends Component{

    onShelfChange = (e) => {
        e.preventDefault()
        if(this.props.shelfUpdate){
            this.props.shelfUpdate(this.props.book , e.target.value)
        }
    };

 render(){

    const { book } = this.props;

    if(!book.shelf){
        book.shelf = 'none';
    }

    return(
     

         <div className="book">

        <div className="book-top">
        <li key={book.id}>
         {book.imageLinks && (
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.thumbnail + ')' }}></div>
         )}
        
       <div className="book-BooksShelf-changer">
             {book.shelf && (

            <select value={book.shelf} onChange={this.onShelfChange } >

            <option value="move" disabled>Move to...</option>

            <option value="currentlyReading">Currently Reading</option>

            <option value="wantToRead">Want to Read</option>

            <option value="read">Read</option>

            <option value="none">None</option>

            </select>
             )}
         </div>
         </li>
        </div>
       

        <li key={book.id}>
        {book.title && (
            book.authors.map((author) => (
                <div className="book-authors" key={author}>{author}</div>
            ))
        )}
        </li>
        </div>
     
    )
 }
}

export default BooksControl