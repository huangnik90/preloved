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
import CurrencyFormat from 'react-currency-format';
import {connect} from 'react-redux'
import PageNotFound from './404';
import {Link,Redirect} from 'react-router-dom'
import swal from 'sweetalert'

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
    rowsPerPage: 5,
    isEdit: false,
    editIndex:Number,
    rowsdetail:[],diclik:false
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };
  //-----------------------------------NIKO FUNCTION-------------------------------------------------------------
  componentDidMount(){
    this.getAllPendingPaymentDetail()
  }
  
  getAllPendingPaymentDetail = ()=>{
      axios.get(`http://localhost:2000/payment/getpaymentstatusdetail0/${this.props.match.params.no_invoice}`)
      .then((res)=>{
          
          this.setState({rows:res.data})
          console.log(this.state.rows)
      })
      .catch((err)=>{
          console.log(err)
      })
      

  }
  getTotalHarga = ()=>{
    var harga=0
    
     for (var i=0;i<this.state.rows.length;i++){
        harga += parseInt((this.state.rows[i].harga *this.state.rows[i].quantity_pembelian))
     }
   
     return harga
  }
  cancelOrder=()=>{
    
    for (var i=0;i<this.state.rows.length;i++){
      axios.put(`http://localhost:2000/payment/cancelorder?no_invoice=${this.state.rows[i].no_invoice}&quantity=${this.state.rows[i].quantity_pembelian}&product_id=${this.state.rows[i].id_product}`)
      .then((res)=>{
          swal("Cancel Order",res.data,"info")
          this.setState({diclik:true})      
      })
      .catch((err)=>console.log(err))
    }
    
   
  }

  renderJSX = ()=>{
    // var arrSearchAndFilter = this.state.rows.filter((val)=>{
    //   return val.no_invoice.toLowerCase().includes(this.state.searchRows)
    //   //pake includes kalo semua inputan ada hubungan dengan hasil misal kluar smua yg ada huruf o 
    // })
    
    var jsx = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
    .map((val,index)=>{
        return (
            <TableRow >
            <TableCell align="center">{index+1}</TableCell>
            <TableCell align="center">{val.tanggal_pembelian}</TableCell>
            <TableCell align="center">{val.product_name}</TableCell>
            <TableCell align="center">{val.harga}</TableCell>
            <TableCell align="center">{val.quantity_pembelian}</TableCell>
            <TableCell align="center">
            <img width="100px"src={`http://localhost:2000/${val.image}`} alt="gambar"></img>
            </TableCell>
            
        </TableRow>
        )
    })
     return jsx;
  }
    
  render() {
    if(this.state.diclik){
      return <Redirect to="/paymentuser"></Redirect>
    }
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
if(this.props.role){
  return (
    <Paper className={classes.root} style={{marginBottom:"50px"}}>
      <div className={classes.tableWrapper}>
      <nav className="navbar justify-content-between">
      <h2>PL-{this.props.match.params.no_invoice} | {this.props.username}</h2>
      
    </nav>
      <hr></hr>
      <Table className="table table-hover">
          <TableHead className="thead-dark">
            <TableRow>
                <TableCell align="center">Nomor</TableCell>
                <TableCell align="center">Tanggal Pembelian</TableCell>
                <TableCell align="center">Nama Product</TableCell>
                <TableCell align="center">Harga</TableCell>
                <TableCell align="center">Total Pembelian</TableCell>
                <TableCell align="center">Gambar Product</TableCell>
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


       
        
      </div>
      <div className="row">
            <div className="col-8 col-md-8">
           
                  <p className="totalHarga">
                  Total Harga: 
                  <CurrencyFormat value={this.getTotalHarga()} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={value => <div>{value}</div>} />
                  </p>
            </div>
            <div className="col-4 col-md-4">
            <Link to="/paymentuser">
               <input type="button" style={{width:"50%"}} className="shoppingAgain" value="Back"></input>
            </Link>     
            <input onClick={this.cancelOrder} type="button" style={{width:"50%"}} className="shoppingAgain cancel" value="Cancel Order"></input>
            </div>
         
        </div>


    </Paper>
    
  );
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
      username:state.user.username,
      role: state.user.role,
      id:state.user.id
     
  }
  
}
export default connect (mapStateToProp)(withStyles(styles)(CustomPaginationActionsTable)) ;
