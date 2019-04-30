import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import CurrencyFormat from 'react-currency-format';
import {Link} from 'react-router-dom'
import './../support/payment.css'
import swal from 'sweetalert'
//import Countdown from 'react-countdown-now';

class Payment extends React.Component{
    state ={rows:[],grandTotal:0,selectedFile:null}
    componentDidMount(){
        this.getAllCheckOut()
      
    
    }
      
    getAllCheckOut = ()=>{
          axios.get("http://localhost:2000/checkout/getallcheckout?id="+this.props.id)
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
            harga += parseInt((this.state.rows[i].harga - (this.state.rows[i].harga *this.state.rows[i].discount/100))*this.state.rows[i].quantity_pembelian)
         }
         return harga
      }

      checkOut = ()=>{
          var idUser = this.props.id
          var address1 = this.refs.address1.value
          var address2 = this.refs.address2.value
          var phonenumber = this.refs.phonenumber.value  
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); 
            var yyyy = today.getFullYear();

          today = yyyy + '-' + mm + '-' + dd;
          var total_belanja = this.getTotalHarga()
        
          if(isNaN(phonenumber)){
            swal("Error","Input kosong/ Nomor telp anda salah","error")
          }else if(address1&&address2&&phonenumber&&idUser){
                var newData ={
                    user_id:idUser,
                    address1,
                    address2,
                    phonenumber,
                    checkout_date:today,
                    total_belanja
                }

                axios.post(`http://localhost:2000/user/adduserdetail/${idUser}`,newData)
                .then((res)=>{
                   
                    swal("Berhasil",res.data,"success") 
                    this.refs.address1.value=""
                    this.refs.address2.value=""
                    this.refs.phonenumber.value=""

                })
                .catch((err)=>console.log(err))
              

            }else{
                swal("Error","Data Kosong","error")
            }
      }

      resetCheckOut=()=>{
        swal("Error","Data Kosong","error")
      }
      onChangeHandler = (event)=>{
        //untuk mendapatkan file image
        this.setState({selectedFile:event.target.files[0]})
    }
    valueHandler = ()=>{
        return  this.state.selectedFile ? this.state.selectedFile.name :"Upload Payment Proof"
    }


      

    render(){
        return(
            <div className="container paymentBody">
      
                <div className="row mt-3">
                
                    <div className="col-md-6 col-6">
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
                            <h2>Payment Method</h2>
                            <hr/>
                            <table className="table table-hover">
                                <tr>
                                    <td>Bank Name</td>
                                    <td>Bank Account Number</td>
                                </tr>
                                <tr>
                                    <td align="center"><img width="200px"  src="https://1.bp.blogspot.com/-QP4vt4BcT6E/WgO4eSbEKoI/AAAAAAAAEoY/QpI27S8JkN402sNJvw6QnOxX0s6Q_ub2QCLcBGAs/s320/mandiri.jpg" alt="logo mandiri"></img></td>
                                    <td><br></br>
                                    <br></br>148 00 7000 2111 - Preloved<br></br>
                                    148 00 9002 4300 - Preloved</td>
                                </tr>
                               
                                <tr>
                                    <td align="center"><img width="200px" src="https://upload.wikimedia.org/wikipedia/id/thumb/e/e0/BCA_logo.svg/1280px-BCA_logo.svg.png"alt="logo bca"></img></td>
                                    <td><br></br>79257409 - Preloved</td>
                                </tr>
                                
                            </table>
                        </div>
                        <div className="col-6 col-md-6">
                        <h2>Upload Payment</h2>
                        <hr/>
                            
                            <input className="form-control border-warning" type="button" onClick={()=>this.refs.input.click()} value={this.valueHandler()}></input>
                            <input ref="input" style={{display:"none"}} type="file" onChange={this.onChangeHandler}></input>
                        </div>
                    </div>
                <hr></hr>
                <div className="row">
                    <div style ={{position:"absolute",right:"0px"}} className="col-5 col-md-5">
                    <Link to="/cart">
                    <input type="button" style={{marginRight:"2px"}} className="shoppingAgain" value="Back to Cart"></input>
                    </Link>     
                    
                    <input type="button" onClick={this.checkOut} className="shoppingAgain" value="Check Out"></input>
                     
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