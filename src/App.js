import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'


import BooksShelf from './component/BooksShelf';
import SearchBook from './component/SearchBook';
import { Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    
    books:[],
    showSearchBookPage :[],
    // showSearchBookPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then( books => {
      this.setState({
        books
      })
    })
  }

 
  search = (query) => {
    if (query.length !== 0) {
      BooksAPI.search(query).then( showSearchBookPage  => {
        let searchResult = [];
          for (const serachedBook of showSearchBookPage ) {
            for (const book of this.state.books) {
                if (serachedBook.id === book.id) {
                  serachedBook.shelf = book.shelf
                }
            }
            searchResult.push(serachedBook)
          }
          return searchResult
      }).then((showSearchBookPage ) => {
        this.setState((prevState) => ({ showSearchBookPage }))
      }).catch(showSearchBookPage => this.setState({ showSearchBookPage: [] }))
    } else {
      this.setState({ showSearchBookPage: [] })
    }
  }
  /*
   it runs update whenever shelf selection is made;
   prior to adding a book to its selected shelf, it checks if the book is already on that shelf;
   once added, book search is reset an empty array;
  */
  shelfUpdate = (addedbook, shelf) => {
    BooksAPI.update(addedbook, shelf).then( res => {
      res.shelf = shelf
    })

    let addedBooks = this.state.books.filter( book => book.id !== addedbook.id )
    addedBooks.push(addedbook);
    this.setState({ books: addedBooks })
   	this.setState({ showSearchBookPage: [] })
    this.componentDidMount()
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={ () => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <BooksShelf
                  books={this.state.books}
                  shelfUpdate={this.shelfUpdate}
                />
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />

        <Route path="/search" render={ () => (
          <SearchBook
            showSearchBookPage ={this.state.showSearchBookPage }
            search={this.search}
            shelfUpdate={this.shelfUpdate}
          />
        )}
        />
        </div>
    )
  }
// }


  // render() {

  //   const { books } = this.state;

  //   return (
  //     <div className="app">
  //       {this.state.showSearchBookPage ? (
  //         <div className="SearchBook-books">
  //           <div className="SearchBook-books-bar">
  //             <button className="close-SearchBook" onClick={() => this.setState({ showSearchBookPage: false })}>Close</button>
  //             <div className="SearchBook-books-input-wrapper">
  //               {/*
  //                 NOTES: The SearchBook from BooksAPI is limited to a particular set of SearchBook terms.
  //                 You can find these SearchBook terms here:
  //                 https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SearchBook_TERMS.md

  //                 However, remember that the BooksAPI.SearchBook method DOES SearchBook by title or author. So, don't worry if
  //                 you don't find a specific author or title. Every SearchBook is limited by SearchBook terms.
  //               */}
  //               <input type="text" placeholder="SearchBook by title or author"/>

  //             </div>
  //           </div>
  //           <div className="SearchBook-books-results">
  //             <ol className="books-grid"></ol>
  //           </div>
  //         </div>
  //       ) : (
  //         <div className="list-books">
  //           <div className="list-books-title">
  //             <h1>MyReads</h1>
  //           </div>
  //           <div className="list-books-content">
  //             <div>
  //               <div className="bookBooksShelf">
  //                 <h2 className="bookBooksShelf-title">Currently Reading</h2>
  //                 <div className="bookBooksShelf-books">
  //                   <ol className="books-grid">
  //                     <li>
  //                       <div className="book">
  //                         <div className="book-top">
  //                           <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
  //                           <div className="book-BooksShelf-changer">
  //                             <select>
  //                               <option value="move" disabled>Move to...</option>
  //                               <option value="currentlyReading">Currently Reading</option>
  //                               <option value="wantToRead">Want to Read</option>
  //                               <option value="read">Read</option>
  //                               <option value="none">None</option>
  //                             </select>
  //                           </div>
  //                         </div>
  //                         <div className="book-title">To Kill a Mockingbird</div>
  //                         <div className="book-authors">Harper Lee</div>
  //                       </div>
  //                     </li>
  //                     <li>
  //                       <div className="book">
  //                         <div className="book-top">
  //                           <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")' }}></div>
  //                           <div className="book-BooksShelf-changer">
  //                             <select>
  //                               <option value="move" disabled>Move to...</option>
  //                               <option value="currentlyReading">Currently Reading</option>
  //                               <option value="wantToRead">Want to Read</option>
  //                               <option value="read">Read</option>
  //                               <option value="none">None</option>
  //                             </select>
  //                           </div>
  //                         </div>
  //                         <div className="book-title">Ender's Game</div>
  //                         <div className="book-authors">Orson Scott Card</div>
  //                       </div>
  //                     </li>
  //                   </ol>
  //                 </div>
  //               </div>
  //               <div className="bookBooksShelf">
  //                 <h2 className="bookBooksShelf-title">Want to Read</h2>
  //                 <div className="bookBooksShelf-books">
  //                   <ol className="books-grid">
  //                     <li>
  //                       <div className="book">
  //                         <div className="book-top">
  //                           <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")' }}></div>
  //                           <div className="book-BooksShelf-changer">
  //                             <select>
  //                               <option value="move" disabled>Move to...</option>
  //                               <option value="currentlyReading">Currently Reading</option>
  //                               <option value="wantToRead">Want to Read</option>
  //                               <option value="read">Read</option>
  //                               <option value="none">None</option>
  //                             </select>
  //                           </div>
  //                         </div>
  //                         <div className="book-title">1776</div>
  //                         <div className="book-authors">David McCullough</div>
  //                       </div>
  //                     </li>
  //                     <li>
  //                       <div className="book">
  //                         <div className="book-top">
  //                           <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")' }}></div>
  //                           <div className="book-BooksShelf-changer">
  //                             <select>
  //                               <option value="move" disabled>Move to...</option>
  //                               <option value="currentlyReading">Currently Reading</option>
  //                               <option value="wantToRead">Want to Read</option>
  //                               <option value="read">Read</option>
  //                               <option value="none">None</option>
  //                             </select>
  //                           </div>
  //                         </div>
  //                         <div className="book-title">Harry Potter and the Sorcerer's Stone</div>
  //                         <div className="book-authors">J.K. Rowling</div>
  //                       </div>
  //                     </li>
  //                   </ol>
  //                 </div>
  //               </div>
  //               <div className="bookBooksShelf">
  //                 <h2 className="bookBooksShelf-title">Read</h2>
  //                 <div className="bookBooksShelf-books">
  //                   <ol className="books-grid">
  //                     <li>
  //                       <div className="book">
  //                         <div className="book-top">
  //                           <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")' }}></div>
  //                           <div className="book-BooksShelf-changer">
  //                             <select>
  //                               <option value="move" disabled>Move to...</option>
  //                               <option value="currentlyReading">Currently Reading</option>
  //                               <option value="wantToRead">Want to Read</option>
  //                               <option value="read">Read</option>
  //                               <option value="none">None</option>
  //                             </select>
  //                           </div>
  //                         </div>
  //                         <div className="book-title">The Hobbit</div>
  //                         <div className="book-authors">J.R.R. Tolkien</div>
  //                       </div>
  //                     </li>
  //                     <li>
  //                       <div className="book">
  //                         <div className="book-top">
  //                           <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: 'url("http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api")' }}></div>
  //                           <div className="book-BooksShelf-changer">
  //                             <select>
  //                               <option value="move" disabled>Move to...</option>
  //                               <option value="currentlyReading">Currently Reading</option>
  //                               <option value="wantToRead">Want to Read</option>
  //                               <option value="read">Read</option>
  //                               <option value="none">None</option>
  //                             </select>
  //                           </div>
  //                         </div>
  //                         <div className="book-title">Oh, the Places You'll Go!</div>
  //                         <div className="book-authors">Seuss</div>
  //                       </div>
  //                     </li>
  //                     <li>
  //                       <div className="book">
  //                         <div className="book-top">
  //                           <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")' }}></div>
  //                           <div className="book-BooksShelf-changer">
  //                             <select>
  //                               <option value="move" disabled>Move to...</option>
  //                               <option value="currentlyReading">Currently Reading</option>
  //                               <option value="wantToRead">Want to Read</option>
  //                               <option value="read">Read</option>
  //                               <option value="none">None</option>
  //                             </select>
  //                           </div>
  //                         </div>
  //                         <div className="book-title">The Adventures of Tom Sawyer</div>
  //                         <div className="book-authors">Mark Twain</div>
  //                       </div>
  //                     </li>
  //                   </ol>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="open-SearchBook">
  //             <button onClick={() => this.setState({ showSearchBookPage: true })}>Add a book</button>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   )
  // }
}

export default BooksApp
