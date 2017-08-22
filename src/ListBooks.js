import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'


class ListBooks extends Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }
  static PropTypes = {
    books: PropTypes.array.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    OnmoveBookToAnotherShelf: PropTypes.func.isRequired,

  }





  render() {
    const {books,shelfTitle,OnmoveBookToAnotherShelf,getBookById} = this.props

    return(


      <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map ((book) => (

              <Book book={book ? book : null} key= {book.id} OnmoveBookToAnotherShelf = {OnmoveBookToAnotherShelf}
               getBookById = {getBookById}/>

            )
          )}

        </ol>

      </div>

      <div className ="open-search">
        <Link to="/searchbooks" >Add a book </Link>
      </div>

      </div>



    )

  }

}

export default ListBooks
