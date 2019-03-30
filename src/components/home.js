import React from 'react'
import '../support/home.css'
import Carosel from './caraousel'
import Category from './category'
import {Link} from 'react-router-dom'
import Product from './product'

class Home extends React.Component{
    render(){

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
      };
        return(
            <div>
                
                <Link to="/product">
                <Carosel/>  
                </Link>   
                
                <div class="latestProduct text-center">
                
                <h3>NEW ARRIVAL</h3>
                <hr/>
            
                <Product></Product>
            
                   

                </div>
                <div class="category text-center">
                <hr/>
                <h3>CATEGORY</h3>
                <hr/>
                 <Category/>
                    

                </div>
                


            </div>
        )
    }
}

export default Home;