import React from 'react'
import Shelf from './Shelf'
import {Link} from 'react-router-dom'

class Grid extends React.Component {

render(){
  return(
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
      </div>
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
      <Shelf shelfName='Currently Reading' currentShelf={currentlyReadingShelf} updateShelf={this.componentDidUpdate.bind(this)} />
      <Shelf shelfName='Read' currentShelf={readBookShelf} updateShelf={this.componentDidUpdate.bind(this)} />
      <Shelf shelfName='Want To Read' currentShelf={wantToReadShelf} updateShelf={this.componentDidUpdate.bind(this)} />
    </div>
  )
}
}

export default Grid
