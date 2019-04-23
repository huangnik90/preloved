import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import CurrencyFormat from 'react-currency-format';
import {Link} from 'react-router-dom'
import './../support/payment.css'

class Payment extends React.Component{
    state ={rows:[],grandTotal:0}
    componentDidMount(){
        this.getAllCart()
      }
      getAllCart = ()=>{
          axios.get("http://localhost:2000/cart/getallcart?id="+this.props.id)
          .then((res)=>{
              this.setState({rows:res.data})
          })
          .catch((err)=>{
              console.log(err)
          })
      }
      getTotalHarga = ()=>{
        var harga=0
         for (var i=0;i<this.state.rows.length;i++){
            harga += parseInt((this.state.rows[i].price - (this.state.rows[i].price *this.state.rows[i].discount/100))*this.state.rows[i].cart_quantity)
         }
         
         return harga
      }

  
    render(){
        return(
            <div className="container paymentBody">
      
                <div className="row mt-3">
                    <div className="col-md-3">
                         <p>Total yang harus di transfer </p> 
                    </div>
                    <div className="col-md-1">
                    <p>
                    <CurrencyFormat value={this.getTotalHarga()} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={value => <div>{value}</div>} />
                    </p>
                    </div>
                </div>
                <hr></hr>
                    <div className="row">
                        <div className="col-6 col-md-6">
                            <h2>Shipping Detail</h2>
                            <hr/>
                            <p>Address #1</p>
                            <input type="text" placeholder="Address No 1" className="form-control"></input>
                            <p>Address #2</p>
                            <input type="text" placeholder="Address No 1" className="form-control"></input>
                            <p>Zip Code</p>
                            <input type="number" placeholder="Address No 1" className="form-control"></input>
                            <p>Phone Number</p>
                            <input type="number" placeholder="Address No 1" className="form-control"></input>
                        </div>
                        <div className="col-6 col-md-6">
                            <h2>Payment Method</h2>
                            <hr/>
                         
                        </div>
                    </div>
                <hr></hr>
                <div className="row">
                    <div className="col-12 col-md-12">
                    <Link to="/cart">
                    <input type="button" style={{marginRight:"2px"}} className="shoppingAgain" value="Back to Cart"></input>
                    </Link>     
                    <Link to="/cart">
                    <input type="button" className="shoppingAgain" value="Check Out"></input>
                    </Link>     
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProp = (state)=>{
    return{
       
        role: state.user.role,
        id: state.user.id
       
    }
    
  }
  export default connect (mapStateToProp)(Payment) ;