import React from 'react'
import '../support/home.css'
import Carosel from './caraousel'
import Category from './category'
import {Link} from 'react-router-dom'
import Slider from "react-slick";
import Axios from 'axios';
import Testimoni from './testimoni'
import {cartLength,notificationLength} from './../1.actions'
import {connect} from 'react-redux'
import ProductOnSale from './productOnsale'

class Home extends React.Component{
    state = {productTerbaru:[]}
    componentDidMount(){
      this.getLatestProduct()
      this.getCart()
      this.getNotification()
    }
    getCart=()=>{
        return this.props.cartLength(this.props.id) 
    }
    getNotification =()=>{
      return this.props.notificationLength()
    }
    getLatestProduct = ()=>{
      Axios.get(`http://localhost:2000/product/getlatestproduct`)
      .then((res)=>{
        this.setState({productTerbaru:res.data})
      })
      .catch((err)=>console.log(err))
    }

    productTerbaruJsx = ()=>{
        var jsx = this.state.productTerbaru.map((val)=>{
            return(
                <div>
                  <div>
                    <Link to={`/productdetail/`+val.id}>
                    <img src={`http://localhost:2000/${val.image}`} className="card-img-top gambar" width="200px" height="300px;" alt="..." />
                    </Link>
                    
                  </div>
              
              </div>
            )
        }
        
        )
        return jsx;
    }

    render(){
        var settings = {
            dots: true,
            arrows:true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 0,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          };
    
        return(
            <div>
                
                <Link to="/product">
                <Carosel/>  
                </Link>   
                
                <div class="latestProduct text-center" >
                <hr style={{border:"1px solid #FB9900"}}/>                                
                <h3>Preloved New Items</h3>
                <hr style={{border:"1px solid #FB9900"}}/>                
                
                  <div style={{width:"95%",marginLeft:"25px",paddingLeft:"5px",paddingRight:"5px"}}>
                  <Slider {...settings}>
                  {this.productTerbaruJsx()}
                  </Slider>

                  </div>
                </div>
                
                <div className="text-center justify-content-center">
                <hr style={{border:"1px solid #FB9900"}}/>                
                <h3>Preloved ON SALE</h3> 
                <hr style={{border:"1px solid #FB9900"}}/>                
                  <ProductOnSale/>
                
                </div>

              <div class="category text-center">
                <hr style={{border:"1px solid #FB9900"}}/>
                <h3>Category</h3>
                <hr style={{border:"1px solid #FB9900"}}/>                                
                 <Category/>
                </div>

                
                <div class="text-center">
                <hr style={{border:"1px solid #FB9900"}}/>                
                  <h3 style={{marginTop:"10px"}}>Testimonials</h3>
                <hr style={{border:"1px solid #FB9900"}}/>                
                 <Testimoni/>
                </div>
                <hr style={{border:"1px solid #FB9900"}}/>    
            </div>
        )
    }
}
const mapStateToProp = (state)=>{
  return{
      id: state.user.id  
  }    
}

export default connect(mapStateToProp,{cartLength,notificationLength})(Home);