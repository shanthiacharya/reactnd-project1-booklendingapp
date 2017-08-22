import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

  constructor(props) {
    super(props)
    this.state = {
      bookshelf: ""
    }
  }

  static PropTypes = {
    book: PropTypes.object.isRequired,
    OnmoveBookToAnotherShelf: PropTypes.func.isRequired,


  }


  componentDidMount() {
    const { book, getBookById } = this.props
    let bookOnShelf = getBookById(book.id);

    let shelf;
    if(bookOnShelf !== null) {
        shelf = bookOnShelf.shelf
    } else {
        shelf = 'none'
    }

    this.setState({bookshelf: shelf})
}

  render() {
    const {book,OnmoveBookToAnotherShelf } = this.props
    return(
      <li key={book.id}>
        <div className="book">
            <div className="book-top">
                 <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`}}>
                   <div className="book-shelf-changer">
                       <select value = {this.state.bookshelf} onChange =
                       {(event) => OnmoveBookToAnotherShelf(event,book)}>
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
       </li>
    )

  }

}

export default Book
