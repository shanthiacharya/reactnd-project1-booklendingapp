import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'


class ListBooks extends Component {

  static PropTypes = {
    books: PropTypes.array.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    onMoveBooktoAnotherShelf: PropTypes.func.isRequired,
    getBookbyId: PropTypes.func.isRequired
  }

  state = {

  }



  render() {
    const {books,shelfTitle,onMoveBooktoAnotherShelf,getBookbyId} = this.props

    return(


      <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map ((book) => (
            <li key={book.id}>
              <Book book={book} onMoveBooktoAnotherShelf = {onMoveBooktoAnotherShelf}
               getBookbyId = {getBookbyId}/>
             </li>
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
