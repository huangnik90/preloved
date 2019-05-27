import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import axios from 'axios'
import swal from 'sweetalert'
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PageNotFound from './404';
import './../support/adminpayment.css'
import CurrencyFormat from 'react-currency-format';
import QueryString from 'query-string'


const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CustomPaginationActionsTable extends React.Component {
  state = {
    rows: [], searchRows:'',
    page: 0,
    rowsPerPage: 10,
    isEdit: false,
    editIndex:Number,filterStatusPembayaran:4
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };
  //-----------------------------------NIKO FUNCTION-------------------------------------------------------------
  componentDidMount(){
    this.getAllPaymentData()
    this.getDataUrl()
  }
  
  getAllPaymentData = ()=>{
      axios.get("http://localhost:2000/payment/getallpaymentdata")
      .then((res)=>{
          this.setState({rows:res.data})
      })
      .catch((err)=>{
          console.log(err)
      })
  }

  onBtnSearch = ()=>{
    var searching = this.refs.search.value
    this.pushUrl()
    this.setState({searchRows:searching.toLowerCase()})
  }
  
  onBtnDelete = (id)=>{
      axios.delete("http://localhost:2000/user/deleteuserbyid",{params:{id:id}})
      .then((res)=>{
        console.log(res.data)
        this.getAllUser()
      })
      .catch((err)=>console.log(err))
  }
  
  onBtnEdit = (id,index)=>{
    this.setState({isEdit:true,editIndex:index})
  }

  onBtnCancel=()=>{
    this.setState({isEdit:false})
  }  

  onBtnEditSave = (id)=>{
    var nilaiverifikasi = this.refs.verifikasi.value
    axios.get("http://localhost:2000/user/editverifikasiuser?",{params:{id:id,verif:nilaiverifikasi}})
    .then((res)=>{
      console.log(res)
      swal("OK","Sudah terupdate","success")
      this.getAllUser()
      this.setState({isEdit:false})
    })
    .catch((err)=>console.log(err))
  }

  

  renderJSX = ()=>{
    var arrSearchAndFilter = this.state.rows.filter((val)=>{
      return  val.username.toLowerCase().includes(this.state.searchRows) 
              && (parseInt(val.status_pembayaran) === parseInt(this.state.filterStatusPembayaran)||this.state.filterStatusPembayaran>3) 
      //pake includes kalo semua inputan ada hubungan dengan hasil misal kluar smua yg ada huruf o 
    })
    
    var jsx = arrSearchAndFilter.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
    .map((val,index)=>{
        return (
            <TableRow>
            <TableCell align="center">{index+1}</TableCell>
            <TableCell align="center">PL-{val.no_invoice}</TableCell>
            <TableCell align="center">{val.username}</TableCell>
            <TableCell align="center">{val.email}</TableCell>
            <TableCell align="center">{val.jumlah_item}</TableCell>
            <TableCell align="center">
            <CurrencyFormat value={val.total} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={value => <div>{value}</div>} />
            
            </TableCell>
            <TableCell align="center">
            {
              parseInt(val.status_pembayaran) ===0 ? <p style={{color:"red"}}>Not yet paid</p>:parseInt(val.status_pembayaran)===1? <p style={{color:"blue"}}>Pending</p>:<p style={{color:"green"}}>Paid</p>
              }
           
           </TableCell>
            <Button animated>
            <Link style={{textDecoration:'none'}} to={`/managepaymentuser/${val.no_invoice}`}>
            <div className="CartBtnStyle">
                Detail
            </div>
            </Link>
            </Button>
            
        </TableRow>
        )
    })
     return jsx;
  }
  statusPaymentSearch = ()=>{
    this.pushUrl()
    this.setState({filterStatusPembayaran:this.refs.statusPayment.value})
  }
  pushUrl = ()=>{
    var newLink ='/managepayment/search'
    var params =[]
    //categoryDropdown,search
    if(this.refs.search.value){
        params.push({
            params:'query',
            value:this.refs.search.value
        })
    }
    if(this.refs.statusPayment.value){
        params.push({
            params:'statusPembayaran',
            value:this.refs.statusPayment.value
        })
    }

    for (var i=0;i<params.length;i++){
        if(i===0){
            newLink += '?'+params[i].params+ '='+ params[i].value
        }else{
            newLink += '&'+params[i].params+ '='+ params[i].value
        }
    }
    this.props.history.push(newLink)
}

getDataUrl = ()=>{
  if(this.props.location.search){
    var obj = QueryString.parse(this.props.location.search)
    if(obj.query){
      this.setState({searchRows:obj.query})
    }if(obj.statusPembayaran){
      this.setState({filterStatusPembayaran:obj.statusPembayaran})
    }
  }
}
    
  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
if(this.props.role===1){
  if(this.state.rows.length){
    return (
    
      <Paper className={classes.root} style={{marginBottom:"50px"}}>
        <div className={classes.tableWrapper}>
        <nav className="navbar justify-content-between">
        <h1>Manage Payment</h1>
        <form className="form-inline">
        <div style={{marginRight:"10px"}}>
                        <select ref="statusPayment" onChange={this.statusPaymentSearch} className="form-control">
                        <option value={4}>--STATUS PAYMENT--</option>
                        <option value={0}>NOT YET PAID</option>
                        <option value={1}>PENDING</option>
                        <option value={2}>PAID</option>

                        </select>
                </div>
          <input className="form-control mr-sm-2" ref="search" onChange={this.onBtnSearch} type="search" placeholder="Find username.." />
        </form>
      </nav>
        <hr></hr>
        <Table className="table table-hover">
            <TableHead className="thead-dark">
              <TableRow>
              <TableCell align="center">Nomor</TableCell>
                  <TableCell align="center">Invoice Number</TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Varian Barang</TableCell>
                  <TableCell align="center">Total Harga Belanja</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
              </TableRow>     
          </TableHead>
            <TableBody>
  
            {this.renderJSX()}
          
             {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
                
              </TableRow>
            </TableFooter>
          </Table>
          <div className="row">
            <div className="col-8 col-md-8">
           
                 
            </div>
            <div className="col-4 col-md-4">
            <Link to="/">
               <input type="button" style={{width:"100%"}} className="shoppingAgain" value="Back"></input>
            </Link>     
            
            </div>
        </div>
        </div>
      </Paper>
      
    )
  }else{
    return(
      <Paper className={classes.root} style={{marginBottom:"50px"}}>
        <div className={classes.tableWrapper}>
        <nav className="navbar justify-content-center">
        <h2>Manage Payment</h2>
  
      </nav>
        <hr></hr>
        <div className="emptyCart">
        There are no payment at the moment.
        </div>
      
        </div>
        <div className="row">
            <div className="col-8 col-md-8">
           
                 
            </div>
            <div className="col-4 col-md-4">
            <Link to="/">
               <input type="button" style={{width:"100%"}} className="shoppingAgain" value="Back"></input>
            </Link>     
            
            </div>
        </div>
      </Paper>
    )
  }

}else{
  return <PageNotFound></PageNotFound>
}
    
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProp = (state)=>{
  return{
     
      role: state.user.role
     
  }
  
}
export default connect (mapStateToProp)(withStyles(styles)(CustomPaginationActionsTable)) ;
