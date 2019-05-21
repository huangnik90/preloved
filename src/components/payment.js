import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import CurrencyFormat from 'react-currency-format';
import {Link,Redirect} from 'react-router-dom'
import './../support/payment.css'
import swal from 'sweetalert'
import Moment from 'moment'
import Countdown from 'react-countdown-now';

class Payment extends React.Component{
    state ={tanggal:this.props.match.params.no_invoice,rows:[],grandTotal:0,selectedFile:null,diclick:false, gambar:'https://uploads-cdn.thgblogs.com/wp-content/uploads/sites/12/2018/10/16084909/1080x530-262215503-jb-preloved-nostrings-ad-5-700x344.png'}
    componentDidMount(){
        this.getData()
    }

    getData =()=>{
        axios.get(`http://localhost:2000/payment/getpaymentstatusdetail0/${this.props.match.params.no_invoice}`)
        .then((res)=>{
            this.setState({rows:res.data})
        })
        .catch((err)=>console.log(err))
    }
    getTotalHarga = ()=>{
        var harga=0
         for (var i=0;i<this.state.rows.length;i++){
            harga += parseInt(this.state.rows[i].harga*this.state.rows[i].quantity_pembelian)
         }
         return harga
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

    UploadPayment=()=>{ 
        if(this.state.selectedFile){
            var dateNow = Moment().format('YYYY-MM-D hh:mm:ss')
            
            var data = {
                    date_payment:dateNow, 
                    no_invoice:this.props.match.params.no_invoice
                }
      
                      var formData = new FormData()
                          formData.append("image",this.state.selectedFile,this.state.selectedFile.name)
                          formData.append('data',JSON.stringify(data))
                      axios.put("http://localhost:2000/checkout/addpaymentproof",formData)
                           .then((res)=>{
                                       console.log(res.data)
                                       swal("Ok",res.data,"success")  
                                       this.setState({diclick:true})
                                   })
                          .catch((err)=>console.log(err))
                    
                                   
        }else{
            var tanggal = Moment(Moment()).add(1,'d').format('D / MMMM / YYYY')
            swal("Error",`Bukti pembayaran masih kosong, ${tanggal} adalah batas terakhir pembayaran`,"error")
        }
   
    }
    Cancel=()=>{

       if(this.state.rows[0].status_pembayaran===0){
        for (var i=0;i<this.state.rows.length;i++){
            axios.put(`http://localhost:2000/payment/cancelorder?no_invoice=${this.state.rows[i].no_invoice}&quantity=${this.state.rows[i].quantity_pembelian}&product_id=${this.state.rows[i].id_product}`)
            .then((res)=>{
                swal("Important Message",res.data,"info")
                this.setState({diclick:true})      
            })
            .catch((err)=>console.log(err))
          }
       }else{
           
       }
    
    }

    render(){
        if(this.state.diclick){
            return <Redirect to='/'/>
        }
            return(
                <div className="container paymentBody">
                        <div className="row">
                            <div className="col-md-12 col-12" style={{color:"orange",fontFamily:"Dosis",textAlign:"center",fontSize:"40px"}}>

                            <Countdown onComplete={()=>this.Cancel()}  date={ parseInt(this.props.match.params.no_invoice)+250000}>
                                
                            </Countdown>
                     
                    <hr style={{border:"1px solid #FB9900"}}/>
                          
                            </div>
                        </div>
                    
                        <div className="row">
                                
                            <div className="col-md-6 col-6">
                            <h2>Total yang harus di transfer </h2>
                <hr style={{border:"1px solid #FB9900"}}/>
                            
                            
                                <h2>
                                <center>
                                <CurrencyFormat value={this.getTotalHarga()} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={value => <div>{value}</div>} />

                                </center>
                                </h2>
                                        <img width="100%" src={this.state.gambar} alt="gambar upload"></img>
                                        
                                        <input className="form-control border-warning" type="button" onClick={()=>this.refs.input.click()} value={this.valueHandler()}></input>
                                        <input ref="input" style={{display:"none"}} type="file" onChange={this.onChangeHandler}></input>
                                     
    
                            </div>
                            <div className="col-5 col-md-5">
                                <h2>Payment Method</h2>
                <hr style={{border:"1px solid #FB9900"}}/>                             
                                <table className="table">
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
            
                        </div>
                        <hr style={{border:"1px solid #FB9900"}}/>               
                    <div className="row">
                        <div style ={{position:"absolute",right:"0px"}} className="col-5 col-md-5">
                        <Link to="/product">
                        <input type="button" style={{marginRight:"2px"}} className="shoppingAgain" value="Back to Shopping"></input>
                        </Link>     
                        
                        <input type="button" onClick={this.UploadPayment} className="shoppingAgain" value="I Have already Paid"></input>
                     
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