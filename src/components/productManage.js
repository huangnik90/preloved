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
import {Link} from 'react-router-dom'
import PageNotFound from './404';
import {connect} from 'react-redux'
import './../support/productManage.css'
import CurrencyFormat from 'react-currency-format'
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
    rows: [],
    page: 0,
    rowsPerPage: 25,
    isEdit: false,
    editIndex:Number,modal:false,dataEdit:{},selectedFileEdit:null,
    dataCategory:[],searchRows:'',filterCategory: 5

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
    this.getDataUrl()
  }
  getDataUrl = ()=>{
    if(this.props.location.search){
      var obj = QueryString.parse(this.props.location.search)
      if(obj.query){
        this.setState({searchRows:obj.query})
      }if(obj.categoryProduct){
        this.setState({filterCategory:obj.categoryProduct})
      }
    }
  }
  pushUrl = ()=>{
    var newLink ='/ProductManage/search'
    var params =[]
    //categoryDropdown,search
    if(this.refs.searchProduct.value){
        params.push({
            params:'query',
            value:this.refs.searchProduct.value
        })
    }
    if(this.refs.categorySearch.value){
        params.push({
            params:'categoryProduct',
            value:this.refs.categorySearch.value
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
    this.setState({isEdit:true,editIndex:-1,modal:true,dataEdit:val})
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
    var quantity = this.refs.editQty.value
    var newData ={
      product_name,price,discount,category_id,quantity
    }
if(quantity && discount && product_name && price && category_id){
        if(this.state.selectedFileEdit!==null ){
          var fd = new FormData()
          fd.append('edit',this.state.selectedFileEdit)
          fd.append('data',JSON.stringify(newData))
          fd.append('imageBefore',this.state.dataEdit.image)
          axios.put(`http://localhost:2000/product/editproductbyid/`+this.state.dataEdit.id,fd)
          .then((res)=>{
            swal("Edit Product",res.data,"success")
            this.setState({modal:false,editIndex:-1})
            this.getAllProduct()
          })
          .catch((err)=>console.log(err))
      }else{
        axios.put(`http://localhost:2000/product/editproductbyid/`+this.state.dataEdit.id,newData)
        .then((res)=>{
          swal("Edit Product",res.data,"success")
          this.setState({modal:false,editIndex:-1})
          this.getAllProduct()
        })
        .catch((err)=>console.log(err))
      }
}else{
  swal("Error","data empty/Invalid","error")
}
   
    


    
  }
  onBtnSearch = ()=>{
    var searchProduct = this.refs.searchProduct.value
    this.pushUrl()
    this.setState({searchRows:searchProduct.toLowerCase()})
   }
   checkQtyEdit = () =>{
     if(this.refs.editQty.value<0){
       this.refs.editQty.value=0
     }
   }

   checkDiskonEdit = () =>{
     var diskon = this.refs.editDiskon.value
      if(diskon <0){
        this.refs.editDiskon.value= 0
      }
      if(diskon >100){
        this.refs.editDiskon.value= 100
      }
   }

  renderJSX = ()=>{
    var arrSearchAndFilter = this.state.rows.filter((val)=>{
      return val.product_name.toLowerCase().includes(this.state.searchRows) &&
      (parseInt(val.category_id) === parseInt(this.state.filterCategory) || this.state.filterCategory > 4)
      //pake includes kalo semua inputan ada hubungan dengan hasil misal kluar smua yg ada huruf o 
    })
    var jsx = arrSearchAndFilter.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
    .map((val,index)=>{
        return (
            <TableRow>
            <TableCell align="center">{index+1}</TableCell>
            <TableCell align="left">{val.product_name}</TableCell>
            <TableCell align="center"> 
            <CurrencyFormat value={val.price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={value => <div>{value}</div>} />
            
            </TableCell>
            <TableCell align="center">{val.discount}</TableCell>
            <TableCell align="center">{val.grade}</TableCell>
            <TableCell align="center">{val.quantity}</TableCell>
            <TableCell align="center">
               <img width="100px"src={`http://localhost:2000/${val.image}`} alt="gambar"></img>
            </TableCell>
            
            {this.state.isEdit===true&& this.state.editIndex===index? 
            <TableCell align="center">
            <Button animated onClick={()=>this.onBtnEditSave(val.id)}>
            <div className="CartBtnStyle">
                SAVE
            </div>
            </Button>
            <Button animated onClick={()=>this.onBtnCancel()}>
            <div className="CartBtnStyle cancel">
                CANCEL
            </div>
            </Button>
            </TableCell>
            :
              <TableCell align="center">
            
           
            <Button animated onClick={()=>this.onBtnEdit(val,index)}>
            <div className="CartBtnStyle">
                EDIT
            </div>
            </Button>
            <Button animated onClick={()=>this.onBtnDelete(val.id)}>
            <div className="CartBtnStyle delete" >
                Delete
            </div>
            </Button>
            </TableCell>
            }
            {
              val.grade ===null ?
              <TableCell align="center">
             <Link style={{textDecoration:"none"}} to={`/productadddescription/${val.id}`}>
            <Button animated>
            <div className="CartBtnStyle">
                ADD NEW
            </div>
            </Button>
            </Link>
            </TableCell>
              :
            <TableCell align="center">
             <Link style={{textDecoration:"none"}}to={`/producteditdescription/${val.id}`}>
            <Button animated>
            <div className="CartBtnStyle">
                EDIT
            </div>
            </Button>
            </Link>
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
    if(this.props.role===1){
      return (
        <Paper className={classes.root} style={{marginBottom:"50px"}}>
          <div className={classes.tableWrapper}>
          <nav className="navbar justify-content-between">
          <h1>Manage Product</h1>
          <form className="form-inline">
          <select onChange={()=>{
            this.pushUrl()
            this.setState({filterCategory:this.refs.categorySearch.value})
          }} ref="categorySearch" className="form-control mr-2">
                                        <option value={5}>--- SELECT CATEGORY ---</option>
                                        {this.renderCategoryJSX()}
          </select>
            <input className="form-control mr-sm-2" ref="searchProduct" type="search" placeholder="Find Product.." aria-label="Search" />
            <input type="button" value="Search" onClick={this.onBtnSearch} className="btn btn-warning"/>

          </form>
        </nav>
          <hr></hr>
          <Table className="table table-hover">
          <TableHead className="thead-dark">
                <TableRow>
                <TableCell align="center">No</TableCell>
                    <TableCell align="center">Product Name</TableCell>
                    <TableCell align="center">Product Price</TableCell>
                    <TableCell align="center">Discount</TableCell>
                    <TableCell align="center">Grade</TableCell>
                    <TableCell align="center">Stock</TableCell>
                    <TableCell align="center">Image</TableCell>
                    <TableCell align="center">Product Action</TableCell>
                    <TableCell align="center">Description Action</TableCell>
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
                  <input type="number" ref="editHarga" className="form-control" defaultValue={this.state.dataEdit.price}/>
                  <p>Jumlah Stock</p>  
                  <input type="number" ref="editQty" onChange={this.checkQtyEdit} min={0} className="form-control" defaultValue={this.state.dataEdit.quantity}/>
                  <p>Discount</p>   
                  <input type="number" min={0} max={100} onChange={this.checkDiskonEdit} ref="editDiskon"className="form-control" defaultValue={this.state.dataEdit.discount}/>
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


export default connect(mapStateToProp)(withStyles(styles)(CustomPaginationActionsTable));
