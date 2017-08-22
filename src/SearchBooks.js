import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import sortBy from 'sort-by'

class SearchBooks extends Component {

  constructor(props) {
  super(props)
  this.state = {
    query: '',
    searchResults:[]
  }
}

  static PropTypes = {

    OnmoveBookToAnotherShelf: PropTypes.func.isRequired,
  }



  updateQuery = (query) => {
    query = query.trim()
    this.setState ({query})
    if (query !== '') {
        BooksAPI.search(query,20).then((books)=>{
        books.error ? (this.setState({searchResults: []})) : (this.setState({searchResults: books}))
        // this.setState({searchResults: books})
        //  console.log ("Search Results:" + this.state.searchResults)
      })
    }
    else {
        this.setState({searchResults:[]})

    }
  }



  clearQuery = () => {
    this.setState ({query:''})
  }

  render() {

      const {query, searchResults} = this.state
      const {OnmoveBookToAnotherShelf,getBookById } = this.props

      let showingBooks = searchResults;

      showingBooks.sort(sortBy('title'))


    return(
      <div className="search-books">
          <div className="search-books-bar">
          <Link className = "close-search" to="/"> </Link>
              <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input type="text" placeholder="Search by title or author" value ={query}
              onChange ={(event) => this.updateQuery(event.target.value)}/>

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">

            {showingBooks.map ((book) => (
              <Book key={book.id} book={book ? book :null} OnmoveBookToAnotherShelf = {OnmoveBookToAnotherShelf}
                getBookById = {getBookById} />

              )
            )}

          </ol>
          </div>
        </div>



    )

  }

}

export default SearchBooks
