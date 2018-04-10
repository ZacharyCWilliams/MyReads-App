import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Book from './Book'
import Search from './Search'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'


class BooksApp extends React.Component {

  state = {
      books: [],
      searchingFor: []
    }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
	     this.setState({ books });
	    });
    }

  updateBookNow(bookID, event) {
    console.log('bookID: ', bookID)
    console.log('event.target.value: ', event.target.value)
    let newListOfBooks = BooksAPI.update(bookID, event.target.value)
    console.log('newListOfBooks: ', newListOfBooks)
    let booksbooksbooks = newListOfBooks.then(BooksAPI.getAll().then((books) => {this.setState({books: books})}))
    console.log('booksbooksbooks: ', booksbooksbooks)
  }
  //componentDidUpdate

  searchFunctionality(event){
    if (event.target.value !== '') {
      BooksAPI.search(event.target.value).then((results) => {
        if (results.error) {
          console.log('there was an error');
          this.setState({ searchingFor: [] });
        }
        else if (results) {
          results.map(result => {
            let filteredResults = this.state.books.forEach(book => {
              if (book.id === result.id) {
                result.shelf = book.shelf;
                console.log(book.title + 's id matched results id. result shelf = ', result.shelf);
              } else if (!result.shelf) {
                result.shelf = 'none';
              } if (result.imageLinks === undefined) {
                result.imageLinks = `url(https://dummyimage.com/128x193/292929/e3e3e3&text=No)`;
              }
            });
          });
          this.setState({ searchingFor: results });
        }
      });
    } else if (event.target.value === '') {
      this.setState({ searchingFor: [] });
    }
  }

  //need to make book reflect shelf OR book.shelf = none


  render() {

  let allBooks = this.state.books;
  console.log('allBooks: ', allBooks)

  let currentlyReadingShelf = allBooks.filter((book) => {return book.shelf === 'currentlyReading'})
	console.log('Currently Reading Shelf: ', currentlyReadingShelf);

	let readBookShelf = allBooks.filter((book) => {return book.shelf === 'read'})
	console.log('Read Shelf: ', readBookShelf);

	let wantToReadShelf = allBooks.filter((book) => {return book.shelf === 'wantToRead'})
	console.log('Want To Read Shelf: ', wantToReadShelf);

  let searchBooks = this.state.searchingFor


  console.log('this.state.searchingFor: ', this.state.searchingFor)
    return (
    <div className="app">
      <Route exact path='/' render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
          </div>
          <div className="open-search">
            <Link to='/search'>Add a book</Link>
          </div>
          <Shelf shelfName='Currently Reading' currentShelf={currentlyReadingShelf} updateShelf={this.updateBookNow.bind(this)} />
          <Shelf shelfName='Read' currentShelf={readBookShelf} updateShelf={this.updateBookNow.bind(this)} />
          <Shelf shelfName='Want To Read' currentShelf={wantToReadShelf} updateShelf={this.updateBookNow.bind(this)} />
        </div>
      )} />
      <Route path='/search' render={() => (
        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/' className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input className='inputClassTest' type="text" placeholder="Search by title or author" onChange={(event) => this.searchFunctionality(event)}/>

              { <ol className="books-grid">
                  {searchBooks.map((book) => (
                    <Search book={book} updateShelf={this.updateBookNow.bind(this)} />
                  ))}
                  </ol>
                  }
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      )}/>
    </div>
    )
  }
}

export default BooksApp
