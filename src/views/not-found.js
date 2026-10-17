import React from 'react'

import { Helmet } from 'react-helmet'

import './not-found.css'

const NotFound = (props) => {
  return (
    <main className="not-found-container">
      <Helmet>
        <title>404 - Not Found</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <h1 className="not-found-text1">404</h1>
      <h2 className="not-found-text2">Page not found</h2>
      <p className="not-found-text3">
        The page you were looking for has moved, or never existed. Check the
        address, or head back to the homepage.
      </p>
      <a href="/" className="not-found-a">
        Back to home
      </a>
    </main>
  )
}

export default NotFound
