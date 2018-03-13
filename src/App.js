import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'


class BooksApp extends React.Component {
    state = {
      showSearchPage: false,
      books: []
    }
	
  componentDidMount(){
      BooksAPI.getAll().then((books) => {
	this.setState({ books });
	});
    }
      
    render() {
      
    	let currentReads = this.state.books
      	console.log('this.state.books: ', this.state.books)
    	let currentlyReadingShelf = currentReads.filter((book) => {return book.shelf === 'currentlyReading'})
	console.log('Currently Reading Shelf: ', currentlyReadingShelf)

	let readBooks = this.state.books
	let readBookShelf = readBooks.filter((book) => {return book.shelf === 'read'})
	console.log('Read Shelf: ', readBookShelf)

	let wantToRead = this.state.books
	let wantToReadShelf = wantToRead.filter((book) => {return book.shelf === 'wantToRead'})
	console.log('Want To Read Shelf: ', wantToReadShelf)
	
	let updateBookShelf = (book, shelf) => { BooksAPI.update(book.id, shelf).then((books) => BooksAPI.getAll()).then((books) => {return this.setState({ books })}) }
	console.log(this.state.books)
	    
	/* Trying to populate this.state.books so that I can test updateBookShelf function*/
	BooksAPI.search('Negotiate', 20).then((books) => {console.log(books)})
	BooksAPI.update("RmdqCgAAQBAJ", "read")
	
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
		<Shelf shelfName='Currently Reading' currentShelf={currentlyReadingShelf} updateShelf={updateBookShelf.bind(this)} />
		<Shelf shelfName='Want To Read' currentShelf={readBookShelf} updateShelf={updateBookShelf.bind(this)} />
		<Shelf shelfName='Read' currentShelf={wantToReadShelf} updateShelf={updateBookShelf.bind(this)} />
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
