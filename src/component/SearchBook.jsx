import React,{Component} from 'react';
import BooksControl from './BooksControl';
import { Link } from 'react-router-dom';

import * as BooksAPI from '../BooksAPI';

class SearchBook extends Component{

    state = {
    
        searchedBooks:[],
        showSearchBookPage :[],
       
      }

    Queryupdate = (query) => {
    if (query) {
        this.setState({searchedBooks : 'searching'})
      BooksAPI.search(query).then((data)  => {

        if(data){
            // if(!data){
                console.log(data)
            
                data = [data].map((book) => {
                    const booksInShelfs = this.props.books.find((myBook) => myBook.id === book.id);
                    if(booksInShelfs){
                        book.shelf = booksInShelfs.shelf
                    }
                    return book;
                })
                this.setState({ searchedBooks : 'results',showSearchBookPage : data})
              
        // }
        }
    })
  }
  else{
      this.setState({ searchedBooks : 'No Results', showSearchBookPage : []})
  }
 }

    render() {
        const { shelfUpdate } = this.props;

        const { searchedBooks, showSearchBookPage } = this.state;

        return (
            <div className="search-books"> 
             
             <div className="search-books-bar">

                 <Link className="close-search" to="/"> Close Page</Link>

                  <div className="search-books-input-wrapper">

                      <input type="text" placeholder="search by title or author" onChange = { (e) => this.Queryupdate(e.target.value)} />
                  </div>
             </div>

             <div className="search-books-results">
                 <ol className="books-grid" >
                
                 {searchedBooks === 'searching' && (
                    <div className="search-books-results-msg">Searching</div>       
                    )}

  
                   {searchedBooks === 'No Results' && (
                    <div className="search-books-results-msg">No result</div>       
                    )}

                  
                    {searchedBooks === 'results' && (
                   showSearchBookPage.map((book) => (
                       <BooksControl key={book.id} book={book} shelfUpdate={shelfUpdate} />
                   ))      
                    )}
                 </ol>
             </div>
            </div>
        )
    }
}

export default SearchBook