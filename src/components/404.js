import React from 'react'
import './../support/Style404.css'

class PageNotFound extends React.Component{
    render()
    {
        return(
            <div>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags */}
        
        {/* Google font */}
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,900" rel="stylesheet" />
        {/* Custom stlylesheet */}
        <link type="text/css" rel="stylesheet" href="css/style.css" />
        {/* HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries */}
        {/* WARNING: Respond.js doesn't work if you view the page via file:// */}
        {/*[if lt IE 9]>
		  
		  
		<![endif]*/}
        <div id="notfound">
          <div className="notfound">
            <div className="notfound-404">
              <h1>LOST?</h1>
            </div>
            <h2>Page not found</h2>
            <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
            <a href="/" alt="ini gambar">Go To Homepage</a>
          </div>
        </div>
        {/* This templates was made by Colorlib (https://colorlib.com) */}
      </div>
        )
    }
}

export default PageNotFound;