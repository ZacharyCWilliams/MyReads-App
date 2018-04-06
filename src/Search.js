import React, {Component} from 'react';

class Search extends Component {
  render(){
    return(
      <li className="book-list-item">
        {this.props.book.shelf = 'none'}
        {console.log('book.shelf: ', this.props.book.shelf)}
        <div className="book">
          <div className="book-top">
          <div className="book-cover" key={this.props.book.imageLinks.thumbnail} style={{width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`}}></div>
          <div className="book-shelf-changer">
            <select id="select-shelf" value={this.props.book.shelf} key={this.props.book.id} onChange={(event) => {this.props.updateShelf(this.props.book, event)}}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
            </select>
          </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors}</div>
        </div>
      </li>
    )
  }
}

export default Search