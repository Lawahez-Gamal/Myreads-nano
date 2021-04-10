import React,{Component} from 'react';

class BooksControl extends Component{
 render(){

    const { shelfUpdate , book} = this.props;

    return(
        <div className="book-BooksShelf-changer">
            <select value={book.shelf} onChange={ (e) => shelfUpdate(book, e.target.value)} >

            <option value="move" disabled>Move to...</option>

            <option value="currentlyReading">Currently Reading</option>
            
            <option value="wantToRead">Want to Read</option>
            
            <option value="read">Read</option>
            
            <option value="none">None</option>

            </select>
        </div>
    )
 }
}

export default BooksControl