import React from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'
import PageNotFound from './404';
import swal from 'sweetalert'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CurrencyFormat from 'react-currency-format';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import {Link} from 'react-router-dom'


class AnnualReport extends React.Component{
    state={data:[]}
        
    getDataReport=()=>{ 
       if(!isNaN(this.refs.tahun.value)){
            var number
            if (this.refs.bulan.value<9){
                number = "0"+this.refs.bulan.value
            }else{
                number = this.refs.bulan.value
            }

            Axios.get(`http://localhost:2000/payment/report?year=${this.refs.tahun.value}&month=${number}`)
                .then((res)=>{
                    this.setState({data:res.data})
                })
                .catch((err)=>console.log(err))
                
            }else{
                swal("Error","Must Number","error")
            }
    }
    getTotalHarga = ()=>{
        var harga=0
        
         for (var i=0;i<this.state.data.length;i++){
            harga += parseInt(this.state.data[i].harga*this.state.data[i].quantity_pembelian)
         }
       
         return harga
      }
    renderJsx =()=>{
        var jsx = this.state.data.map((val,index)=>{
            return(
                <TableRow>
                <TableCell align="center">{index+1}</TableCell>
                <TableCell align="center">PL-{val.no_invoice}</TableCell>
                <TableCell align="center">{val.tanggal_pembelian.split(" ",1).join()}</TableCell>
                <TableCell align="center">{val.product_name}</TableCell>
                <TableCell align="center">
                <CurrencyFormat value= {val.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={value => <div>{value}</div>} />
                </TableCell>
                <TableCell align="center">{val.quantity_pembelian}</TableCell>
                <TableCell align="center">
                <CurrencyFormat value= {val.quantity_pembelian*val.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={value => <div>{value}</div>} />
               </TableCell>
                <TableCell align="center">{val.firstname} {val.lastname}/ {val.id}</TableCell>
                </TableRow>
            )
        })
        return jsx
    }
     print=()=> {
        //this.setState({width:"580px",height:"892px"})
		const filename  = `Preloved AnnualReport Y:${this.refs.tahun.value} M:${this.refs.bulan.value}.pdf`;

		html2canvas(document.querySelector('#nodeToRenderAsPDF')).then(canvas => {
            let pdf = new jsPDF();
            var width = pdf.internal.pageSize.getWidth();
            var height = pdf.internal.pageSize.getHeight();
			pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, width, height);
            pdf.save(filename);
            
            
		});
    }
    

    render(){
        if(this.props.role===1){
            return(
                <div className="container" >
                    <div className="row">
                        <div className="col-md-6 col-6 form-inline">
                        <h3>Annual Report</h3>
                        </div>
                        <div className="col-md-6 col-6 form-inline">
                            <select className="form-control " ref="bulan" >
                                <option>---FILTER BULAN---</option>
                                <option value={1}>January</option>
                                <option value={2}>Febuary</option>
                                <option value={33}>Maret</option>
                                <option value={4}>April</option>
                                <option value={5}>May</option>
                                <option value={6}>Juni</option>
                                <option value={7}>July</option>
                                <option value={8}>Agustus</option>
                                <option value={9}>September</option>
                                <option value={10}>Oktober</option>
                                <option value={11}>November</option>
                                <option value={12}>Desember</option>
                            </select>                           
                            <input style={{marginLeft:20,marginRight:20}}type="text" className="form-control" defaultValue={2019} placeholder="Input Tahun" ref="tahun"></input>
                            <input type="button" className="btn btn-warning" value="Search" onClick={this.getDataReport}></input>
                       
                        </div>
                    </div>
                    <hr></hr>
                    <center>

                    <div id="nodeToRenderAsPDF">
                    <Table  className="table table-hover " style={{height:this.state.height,width:this.state.width}}>
                    <TableHead className="thead-dark">
                        <TableRow>
                        <TableCell align="center">Nomor</TableCell>
                            <TableCell align="center">No Invoice</TableCell>
                            <TableCell align="center">Tanggal Pembelian</TableCell>
                            <TableCell align="center">Nama Product</TableCell>
                            <TableCell align="center">Harga Item</TableCell>
                            <TableCell align="center">Jumlah Pembelian</TableCell>
                            <TableCell align="center">Total Harga</TableCell>
                            <TableCell align="center">Customer Name/ID</TableCell>
                        </TableRow>     
                    </TableHead>
                        <TableBody>
                            {this.renderJsx()}
                            </TableBody>
                            </Table>

                    <p className="totalHarga">
                    Total Harga: 
                    <CurrencyFormat value={this.getTotalHarga()} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={value => <div>{value}</div>} />
                    </p>
                    </div>
                    </center>

                   

                    <div className="row">
                        <div className="col-md-6 col-6">
                        <input  type="button" style={{width:"100%"}} className="shoppingAgain" onClick={this.print} value="DOWNLOAD PDF"></input>
                        </div>
                        <div className="col-md-6 col-6">
                        <Link to="/">
                        <input type="button" style={{width:"100%"}} className="shoppingAgain" value="Main Page"></input>
                        </Link>  
                        </div>  
                    </div>
                
                
                </div>
            )

        }else{
            return(
                <PageNotFound/>
            )
        }

    }
}
const mapStateToProps = (state)=>{
    return{
        role:state.user.role
    }
}
export default connect(mapStateToProps)(AnnualReport);