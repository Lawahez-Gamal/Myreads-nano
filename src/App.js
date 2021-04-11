import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'


import ListBooks from './component/ListBooks';
import SearchBook from './component/SearchBook';
import { Route} from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    
    books:[],
     
  }

  componentDidMount() {
    BooksAPI.getAll().then( books => {
      console.log(books);
      this.setState({
        books
      })
    })
  }

  shelfUpdate = (addedbook, shelf) => {
    addedbook.shelf = shelf
    console.log(this.state.books)

    if(this.state.books.indexOf(addedbook) < 0){
      this.state.books.push(addedbook)
    }

    BooksAPI.update(addedbook, shelf).then( () => {
      
   this.setState((prevState )=> {
     return {
       books :prevState.books.map((book) => book.id === addedbook.id ? addedbook:book)
     }
   })

  })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={ () => (
         
                     
                <ListBooks
                  books={this.state.books}
                  shelfUpdate={this.shelfUpdate}
                />
                )} />         
            
        <Route path="/search" render={ () => (
          <SearchBook
            books ={this.state.books }
           
            shelfUpdate={this.shelfUpdate}
          />
        )}
        />

        
        </div>
    )
  }
}


export default BooksApp
