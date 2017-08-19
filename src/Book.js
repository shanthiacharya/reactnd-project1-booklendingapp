import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

  static PropTypes = {
    book: PropTypes.object.isRequired,
    onMoveBooktoAnotherShelf: PropTypes.func.isRequired
  }

  state = {
    bookshelf: ""
  }


  render() {
    const {book,onMoveBooktoAnotherShelf } = this.props
    return(
      <div className="book">
          <div className="book-top">
               <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`}}>
                 <div className="book-shelf-changer">
                     <select value = {this.state.bookshelf} onChange = {(event) => onMoveBooktoAnotherShelf(event,book)}>
                       <option value="none" disabled>Move to...</option>
                       <option value="currentlyReading">Currently Reading</option>
                       <option value="wantToRead">Want to Read</option>
                       <option value="read">Read</option>
                       <option value="none">None</option>
                     </select>
                  </div>
               </div>
            </div>
            <div className="book-title"> {book.title} </div>
              <div className="book-authors">{book.authors ? book.authors.map((author)=>author) + '' : ''}</div>

      </div>
    )

  }

}

export default Book
