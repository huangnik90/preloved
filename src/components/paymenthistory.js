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
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PageNotFound from './404';

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
    editIndex:Number
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };
  //-----------------------------------NIKO FUNCTION-------------------------------------------------------------
  componentDidMount(){
    this.getHistory()
  }
  
  getHistory = ()=>{
      axios.get(`http://localhost:2000/payment/history/${this.props.id}`)
      .then((res)=>{
          this.setState({rows:res.data})
      })
      .catch((err)=>{
          console.log(err)
      })
  }

  onBtnSearch = ()=>{
    var searching = this.refs.search.value
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
       return val.no_invoice.toString().toLowerCase().includes(this.state.searchRows)
      //pake includes kalo semua inputan ada hubungan dengan hasil misal kluar smua yg ada huruf o 
    })
    
    var jsx = arrSearchAndFilter.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
    .map((val,index)=>{
        return (
            <TableRow>
            <TableCell align="center">{index+1}</TableCell>
            <TableCell align="center">PL-{val.no_invoice}</TableCell>
            <TableCell align="center">{val.tanggal_pembelian}</TableCell>
            <TableCell align="center">{val.product_name}</TableCell>
            <TableCell align="center">{val.quantity_pembelian}</TableCell>
            <TableCell align="center">{val.harga_diskon}</TableCell>
            <TableCell align="center"><img alt="gambar" width="100px"src={`http://localhost:2000/${val.image}`}></img>
            </TableCell>
            <TableCell align="center">{
              val.status_pembayaran ===1 ? <p style={{color:"blue"}}>Pending</p>:<p style={{color:"green"}}>Paid</p>
              }</TableCell> 
        </TableRow>
        )
    })
     return jsx;
  }
    
  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
if(this.props.role===2){
  if(this.state.rows.length){
    return (
    
      <Paper className={classes.root} style={{marginBottom:"50px"}}>
        <div className={classes.tableWrapper}>
        <nav className="navbar justify-content-between">
        <h1>History Payment - {this.props.username}</h1>
        <form className="form-inline">
          <input className="form-control mr-sm-2" ref="search" onChange={this.onBtnSearch} type="search" placeholder="INVOICE NUMBER.." />
        </form>
      </nav>
        <hr></hr>
        <Table className="table table-hover">
            <TableHead className="thead-dark">
              <TableRow>
              <TableCell align="center">Nomor</TableCell>
                  <TableCell align="center">Invoice Number</TableCell>
                  <TableCell align="center">Tanggal Pembelian</TableCell>
                  <TableCell align="center">Nama Product</TableCell>
                  <TableCell align="center">Jumlah Pembelian</TableCell>
                  <TableCell align="center">Harga Pembelian</TableCell>
                  <TableCell align="center">Gambar Product</TableCell>
                  <TableCell align="center">Status</TableCell>
                  
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
      id:state.user.id,
      role: state.user.role,
      username:state.user.username
     
  }
  
}
export default connect (mapStateToProp)(withStyles(styles)(CustomPaginationActionsTable)) ;
