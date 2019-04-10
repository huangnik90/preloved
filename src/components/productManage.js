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
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
    rows: [], searchRows:[],
    page: 0,
    rowsPerPage: 15,
    isEdit: false,
    editIndex:Number,modal:false,dataEdit:{},selectedFileEdit:null,
    dataCategory:[]

  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };
  //-----------------------------------NIKO FUNCTION-------------------------------------------------------------
  componentDidMount(){
    this.getAllProduct()
    this.getAllCategory()
  }
  getAllCategory =()=>{
    axios.get("http://localhost:2000/category/getallcategory")
    .then((res)=>{
        this.setState({dataCategory:res.data})
    })
    .catch((err)=>console.log(err))
}
  
  getAllProduct = ()=>{
      axios.get("http://localhost:2000/product/getallproduct")
      .then((res)=>{
          this.setState({rows:res.data})
      })
      .catch((err)=>{
          console.log(err)
      })
  }
  renderCategoryJSX=()=>{
    var jsx = this.state.dataCategory.map((val,index)=>{
        return(
            <option value={val.id}>{val.category}</option>
        )
    })
    return jsx
}
  onBtnSearch = ()=>{
   alert("blom digarap")
  }
  onBtnDelete = (id)=>{
    
      axios.delete("http://localhost:2000/product/deleteproductbyid",{params:{id:id}})
      .then((res)=>{
        console.log(res.data)
        swal("Ok","delete item success","success")
        this.getAllProduct()
      })
      .catch((err)=>console.log(err))
  }

  onBtnEdit = (val,index)=>{
    this.setState({isEdit:true,editIndex:index,modal:true,dataEdit:val})
  }

  cekVerifikasi = (numberawal)=>{
    var number = this.refs.verifikasi.value
    if (number < 0) {
      this.refs.verifikasi.value = numberawal
      swal("Error","1 untuk verifikasi 0 untuk belum verifikasi","error")
    }else if(number >1){
      this.refs.verifikasi.value = numberawal
      swal("Error","1 untuk verifikasi 0 untuk belum verifikasi","error")
    }
  }

  onBtnCancel=()=>{
    this.setState({isEdit:false})
  }  

  onBtnEditSave = (id)=>{
 
  }
  valueHandlerEdit = ()=>{
    return  this.state.selectedFileEdit ? this.state.selectedFileEdit.name :"pick a picture"
  }
  //DAPETIN VALUE IMAGE EDIT - AMPUN!!
  onChangeHandlerEdit = (event)=>{
    this.setState({selectedFileEdit:event.target.files[0]})
  }
  onBtnSaveEdit =()=>{
    
    var product_name = this.refs.editNama.value
    var price = this.refs.editHarga.value
    var discount = this.refs.editDiskon.value
    var category_id = this.refs.editCategory.value
    var newData ={
      product_name,price,discount,category_id
    }

    if(this.state.selectedFileEdit!==null){
        var fd = new FormData()
        fd.append('edit',this.state.selectedFileEdit)
        fd.append('data',JSON.stringify(newData))
        fd.append('imageBefore',this.state.dataEdit.image)
        axios.put(`http://localhost:2000/product/editproductbyid/`+this.state.dataEdit.id,fd)
        .then((res)=>{
          swal("ok",res.data,"success")
          this.setState({modal:false,editIndex:-1})
          this.getAllProduct()
        })
        .catch((err)=>console.log(err))
    }else{
      axios.put(`http://localhost:2000/product/editproductbyid/`+this.state.dataEdit.id,newData)
      .then((res)=>{
        swal("ok",res.data,"success")
        this.setState({modal:false,editIndex:-1})
        this.getAllProduct()
      })
      .catch((err)=>console.log(err))
    }
    


    
  }
  

  renderJSX = ()=>{
    var jsx = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
    .map((val,index)=>{
        return (
            <TableRow>
            <TableCell align="center">{index+1}</TableCell>
            <TableCell align="left">{val.product_name}</TableCell>
            <TableCell align="center">Rp. {val.price}</TableCell>
            <TableCell align="center">{val.discount}</TableCell>
            <TableCell align="center">{val.category_id}</TableCell>
            <TableCell align="center">
               <img width="30px"src={`http://localhost:2000/${val.image}`} alt="gambar"></img>
            </TableCell>
            
            {this.state.isEdit===true&& this.state.editIndex===index? 
            <TableCell align="center">
            <Button animated onClick={()=>this.onBtnEditSave(val.id)}>
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
            <Button animated onClick={()=>this.onBtnDelete(val.id)}>
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

    return (
      <Paper className={classes.root} style={{marginBottom:"50px"}}>
        <div className={classes.tableWrapper}>
        <nav className="navbar justify-content-between">
        <h1>Manage Product</h1>
        <form className="form-inline">
          <input className="form-control mr-sm-2" ref="search" type="search" placeholder="Find Product.." aria-label="Search" />
          <button className="btn btn-outline-warning my-2 my-sm-0" onClick={this.onBtnSearch} type="submit">Search</button>
        </form>
      </nav>
        <hr></hr>
          <Table className={classes.table}>
          <TableHead>
              
              <TableRow>
              <TableCell align="center">Nomor</TableCell>
                  
                  <TableCell align="center">Product Name</TableCell>
                  <TableCell align="center">Product Price</TableCell>
                  <TableCell align="center">Discount</TableCell>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">Image</TableCell>
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
        <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={()=>this.setState({modal:false})}> Edit : {this.state.dataEdit.product_name}</ModalHeader>
          <ModalBody>
            <div className="row">
                <div className="col-4 col-md-4">
                  <img src={`http://localhost:2000/${this.state.dataEdit.image}`}  width="100%" alt="broken"/>
                  <input type="file" onChange={this.onChangeHandlerEdit}style={{display:"none"}} ref="inputEdit"></input>
                  <input type="button" value={this.valueHandlerEdit()} className="form-control btn-warning" onClick={()=>this.refs.inputEdit.click()}></input>
                </div>
                <div className="col-8 col-md-8">
                <p>Name</p>  
                <input type="text" ref="editNama" className="form-control" defaultValue={this.state.dataEdit.product_name}/>
                <p>Price</p>   
                <input type="number" ref="editHarga"className="form-control" defaultValue={this.state.dataEdit.price}/>
                <p>Discount</p>   
                <input type="number" ref="editDiskon"className="form-control" defaultValue={this.state.dataEdit.discount}/>
                <p>Category</p>   
                <select defaultValue={this.state.dataEdit.category_id} className="form-control"  ref="editCategory" style={{width:"100%"}} >
                     <option>--- SELECT CATEGORY ---</option>
                     {this.renderCategoryJSX()}
                  </select>
                </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onBtnSaveEdit}>Save</Button>{' '}
            <Button color="secondary" onClick={()=>this.setState({modal:false})}>Cancel</Button>
          </ModalFooter>
        </Modal>
        </div>
                  



      </Paper>
      
    );
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);
