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
import {cartLength} from '../1.actions'
import './../support/cart.css'

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

  onBtnSearch = ()=>{
    var searching = this.refs.search.value
    this.setState({searchRows:searching.toLowerCase()})
  }
  onBtnDelete = (id,userID,quantityCart,product_id)=>{
      axios.delete("http://localhost:2000/cart/deletecartbyid",{params:{id:id,cart_quantity:quantityCart,product_id}})
      .then((res)=>{
        
        this.getAllCart()
        this.props.cartLength(userID)
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
    var buyer_note = this.refs.editExtra_node.value
    axios.put('http://localhost:2000/cart/editcartbyid?id='+id+'&buyer_note='+buyer_note)
    .then((res)=>{
      swal("Edit Note",res.data,"success")
      this.getAllCart()
      this.setState({isEdit:false})
    })
    .catch((err)=>console.log(err))
  }

  getTotalHarga = ()=>{
    var harga=0
    
     for (var i=0;i<this.state.rows.length;i++){
        harga += parseInt((this.state.rows[i].price - (this.state.rows[i].price *this.state.rows[i].discount/100))*this.state.rows[i].cart_quantity)
     }
   
     return harga
  }

  

  renderJSX = ()=>{
    var jsx = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
    .map((val,index)=>{
        return (
            <TableRow>
            <TableCell align="center">{index+1}</TableCell>
           
            <TableCell align="center">{val.product_name}</TableCell>
            <TableCell align="center">Rp. {val.price - (val.price*val.discount/100)}</TableCell>
            <TableCell align="center">{val.cart_quantity}</TableCell>
            <TableCell align="center"><img width="100px"src={`http://localhost:2000/${val.image}`}></img></TableCell>
            {
              this.state.isEdit===true&& this.state.editIndex===index
              ? 
              <TableCell align="center">
              
              <input type="text" defaultValue={val.buyer_note} ref="editExtra_node"className="form-control"/>
              
              </TableCell>
               
              :
              <TableCell align="center">{val.buyer_note}</TableCell>
            }
            
            {this.state.isEdit===true&& this.state.editIndex===index? 
            <TableCell align="center">
            <Button animated onClick={()=>this.onBtnEditSave(val.id,val.buyer_note)}>
            <i class="far fa-save"></i>
            </Button>
            <Button animated onClick={()=>this.onBtnCancel()}>
            <i class="fas fa-times"></i>
            </Button>
            </TableCell>
            :
              <TableCell align="center">
            <Button animated onClick={()=>this.onBtnEdit(val,index)}>
            <i class="fas fa-pen-fancy"></i>
            </Button>
            <Button animated onClick={()=>this.onBtnDelete(val.id,val.user_id,val.cart_quantity,val.product_id)}>
            <i class="far fa-trash-alt"></i>
            </Button>
            </TableCell>
            }
            
        </TableRow>
        )
    })
     return jsx;
  }
    
  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
if(this.props.role===1 || this.props.role===2){
  return (
    <Paper className={classes.root} style={{marginBottom:"50px"}}>
      <div className={classes.tableWrapper}>
      <nav className="navbar justify-content-between">
      <h1>Cart</h1>
      <form className="form-inline">
        <input className="form-control mr-sm-2" ref="search" onChange={this.onBtnSearch} type="search" placeholder="Find username.." />
      </form>
    </nav>
      <hr></hr>
        <Table className={classes.table}>
        <TableHead>
            <TableRow>
            <TableCell align="center">Nomor</TableCell>
               
                <TableCell align="center">Product Name</TableCell>
                <TableCell align="center">Price (after discount)</TableCell>
                <TableCell align="center">Total Purchase</TableCell>
                <TableCell align="center">Image Product</TableCell>
                <TableCell align="center">Pesen Pembeli</TableCell>
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
      </div>
      <div className="row">
          <div className="col-8 col-md-8">
                
                <p className="totalHarga">
               Total Harga : Rp. {this.getTotalHarga()}
                </p>
          </div>
          <div className="col-4 col-md-4">
          <Link to="/product">
             <input type="button" className="shoppingAgain" value="Back Shopping"></input>
          </Link>     
          <Link to="/cekout">
             <input type="button" className="checkOut" value="Check Out"></input>
          </Link>  
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
     
      role: state.user.role,
      id: state.user.id
     
  }
  
}
export default connect (mapStateToProp,{cartLength})(withStyles(styles)(CustomPaginationActionsTable)) ;
