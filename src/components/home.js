import React from 'react'
import '../support/home.css'
import Carosel from './caraousel'
import Category from './category'
import {Link} from 'react-router-dom'
import Slider from "react-slick";


class Home extends React.Component{
    state = {productTerbaru:[
        {id:1, namaProduct:"item #1",category:"tas", harga:200000,diskon:0,deskripsi:"ini adalah item#1",img:"https://media.gucci.com/style/White_South_0_160_470x470/1545041708/569712_1B90X_3154_002_075_0000_Light.jpg"},
        {id:2, namaProduct:"item #2",category:"tas", harga:500000,diskon:10,deskripsi:"ini adalah item#2",img:"https://media.gucci.com/style/White_South_0_160_470x470/1545042621/569712_1B90X_1000_002_075_0000_Light.jpg"},
        {id:3, namaProduct:"item #3",category:"tas", harga:800000,diskon:50,deskripsi:"ini adalah item#3",img:"https://media.gucci.com/style/White_South_0_160_470x470/1545326107/564714_05J0X_6433_002_080_0000_Light.jpg"},
        {id:4, namaProduct:"item #4",category:"aksesoris", harga:5000000,diskon:0,deskripsi:"ini adalah item#4",img:"https://media.gucci.com/style/White_South_0_160_470x470/1473095707/451268_K551N_8666_001_080_0000_Light.jpg"},
        {id:1, namaProduct:"item #1",category:"tas", harga:200000,diskon:0,deskripsi:"ini adalah item#1",img:"https://media.gucci.com/style/White_South_0_160_470x470/1545041708/569712_1B90X_3154_002_075_0000_Light.jpg"},
        {id:2, namaProduct:"item #2",category:"tas", harga:500000,diskon:10,deskripsi:"ini adalah item#2",img:"https://media.gucci.com/style/White_South_0_160_470x470/1545042621/569712_1B90X_1000_002_075_0000_Light.jpg"},
        {id:3, namaProduct:"item #3",category:"tas", harga:800000,diskon:50,deskripsi:"ini adalah item#3",img:"https://media.gucci.com/style/White_South_0_160_470x470/1545326107/564714_05J0X_6433_002_080_0000_Light.jpg"},
        {id:4, namaProduct:"item #4",category:"aksesoris", harga:5000000,diskon:0,deskripsi:"ini adalah item#4",img:"https://media.gucci.com/style/White_South_0_160_470x470/1473095707/451268_K551N_8666_001_080_0000_Light.jpg"}
    ]}
    

    productTerbaruJsx = ()=>{
        
        
        var jsx = this.state.productTerbaru.map((val)=>{
            return(
                <div>
                  <div>
                    <img src={val.img} className="card-img-top gambar" width="200px" height="200px;" alt="..." />
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
                
                <h3>PRELOVED LATEST ITEMS</h3>
                <hr/>
                <div style={{width:"95%",marginLeft:"25px",paddingLeft:"5px",paddingRight:"5px"}}>
                <Slider {...settings}>
                {this.productTerbaruJsx()}
                 </Slider>

                </div>
                
                   

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