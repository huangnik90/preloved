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

import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'

import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';

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
    modal:false,rowsdetail:[]
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };
  //-----------------------------------NIKO FUNCTION-------------------------------------------------------------
  componentDidMount(){
    this.getAllPendingPayment()
  }
  
  getAllPendingPayment = ()=>{
      axios.get(`http://localhost:2000/payment/getpaymentstatus0/${this.props.id}`)
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
      
  }

  

  

  renderJSX = ()=>{
    // var arrSearchAndFilter = this.state.rows.filter((val)=>{
    //   return val.no_invoice.toLowerCase().includes(this.state.searchRows)
    //   //pake includes kalo semua inputan ada hubungan dengan hasil misal kluar smua yg ada huruf o 
    // })
    
    var jsx = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
    .map((val,index)=>{
        return (
            <TableRow>
            <TableCell align="center">{index+1}</TableCell>
            <TableCell align="center">{val.no_invoice}</TableCell>
            <TableCell align="center">{val.jumlah_item}</TableCell>
            <TableCell align="center">{val.total}</TableCell>
            <TableCell align="center">
            <Button animated>
            <Link style={{textDecoration:'none'}} to={`/paymentuserdetail/${val.no_invoice}`}>
            <div className="CartBtnStyle">
                Detail
            </div>
            </Link>
            </Button>
            </TableCell>
              <TableCell align="center">
            <Button animated>
            <Link style={{textDecoration:'none'}} to={`/payment/${val.no_invoice}`}>
                <div className="CartBtnStyle">
                UPLOAD
              </div>
            </Link>
            </Button>
          
            </TableCell>
            
            
        </TableRow>
        )
    })
     return jsx;
  }
    
  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
if(this.props.role && this.state.rows.length>0){
  return (
    <Paper className={classes.root} style={{marginBottom:"50px"}}>
      <div className={classes.tableWrapper}>
      <nav className="navbar justify-content-between">
      <h1>Pending Payment - {this.props.username}</h1>
      <form className="form-inline">
        <input className="form-control mr-sm-2" ref="search" onChange={this.onBtnSearch} type="search" placeholder="Find username.." />
      </form>
    </nav>
      <hr></hr>
      <Table className="table table-hover">
          <TableHead className="thead-dark">
            <TableRow>
            <TableCell align="center">Nomor</TableCell>
                <TableCell align="center">Nomor Invoice</TableCell>
                <TableCell align="center">Jumlah Pembelian</TableCell>
                <TableCell align="center">Total Pembayaran</TableCell>
                <TableCell align="center">Cek Detail</TableCell>
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


        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={()=>this.setState({modal:false})}> </ModalHeader>
            <ModalBody>

            <Table className="table table-hover">
          <TableHead className="thead-dark">
            <TableRow>
            <TableCell align="center">Nomor</TableCell>
                <TableCell align="center">Nomor Invoice</TableCell>
                <TableCell align="center">Jumlah Pembelian</TableCell>
                <TableCell align="center">Total Pembayaran</TableCell>
                <TableCell align="center">Cek Detail</TableCell>
                <TableCell align="center">Action</TableCell>
            </TableRow>     
        </TableHead>
          <TableBody>

          {this.renderJSX()}
        
          </TableBody>
          </Table>
                
              
            </ModalBody>
            <ModalFooter>
                
              <Button color="secondary" onClick={()=>this.setState({modal:false})}>Back</Button>
            </ModalFooter>
          </Modal>
        
      </div>
    </Paper>
    
  );
}else{
  return (
    <Paper className={classes.root} style={{marginBottom:"50px"}}>
      <div className={classes.tableWrapper}>
      <nav className="navbar justify-content-center">
      <h2>Detail Transaction</h2>

    </nav>
      <hr></hr>
      <div className="emptyCart">
      There are no Pending Payment
      </div>
    
      </div>
      <div className="row">
          <div className="col-9 col-md-9">
         
                
          </div>
          <div className="col-3 col-md-3">
          <Link to="/product">
             <input type="button" style={{width:"100%"}} className="shoppingAgain" value="Back Shopping"></input>
          </Link>     
          
          </div>
      </div>
    </Paper>
  )
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
