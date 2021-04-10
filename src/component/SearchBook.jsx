import React,{Component} from 'react';
import ListBooks from './ListBooks';
import { Link } from 'react-router-dom';

class SearchBook extends Component{

    render() {
        const { search } = this.props;

        return (
            <div className="search-books"> 
             
             <div className="search-books-bar">

                 <Link className="close-search" to="/"> Close Page</Link>

                  <div className="search-books-input-wrapper">

                      <input type="text" placeholder="search by title or author" onChange = { (e) => search(e.target.value)} />
                  </div>
             </div>

             <div className="search-books-results">
                 <ol className="books-grid">
                   {
                       this.props.searchedBooks > 0 ? (
                           this.props.searchedBooks.map( (book) => (
                               <li key={book.id}>
                                   <ListBooks book = { book } shelfUpdate= { this.props.shelfUpdate } />
                               </li>
                           ))
                       ) : <li>No result</li>
                   }
                 </ol>
             </div>
            </div>
        )
    }
}

export default SearchBook