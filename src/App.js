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

  componentDidUpdate() {
      let newListOfBooks = BooksAPI.update(this, event.target.value).then(BooksAPI.getAll())
      this.setState({books: newListOfBooks})
      console.log(this);
      console.log(event.target.value);
      console.log(this.state.books);
  }


    render() {

    let currentReads = this.state.books
    let currentlyReadingShelf = currentReads.filter((book) => {return book.shelf === 'currentlyReading'})
	console.log('Currently Reading Shelf: ', currentlyReadingShelf)

	let readBooks = this.state.books
	let readBookShelf = readBooks.filter((book) => {return book.shelf === 'read'})
	console.log('Read Shelf: ', readBookShelf)

	let wantToRead = this.state.books
	let wantToReadShelf = wantToRead.filter((book) => {return book.shelf === 'wantToRead'})
	console.log('Want To Read Shelf: ', wantToReadShelf);





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
		<Shelf shelfName='Currently Reading' currentShelf={currentlyReadingShelf} updateShelf={componentDidUpdate.bind(this)} />
		<Shelf shelfName='Want To Read' currentShelf={readBookShelf} updateShelf={componentDidUpdate.bind(this)} />
		<Shelf shelfName='Read' currentShelf={wantToReadShelf} updateShelf={componentDidUpdate.bind(this)} />
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
