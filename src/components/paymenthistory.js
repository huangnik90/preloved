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
import PageNotFound from './404';
import QueryString from 'query-string'
import CurrencyFormat from 'react-currency-format';
import DatePicker from 'react-date-picker'


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
    editIndex:Number,date: new Date(), first : true
  };
  onChange = (date) => {
    this.setState({ date , first :false})
    this.pushUrl()
  }
 


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
  getDataUrl = ()=>{
    if(this.props.location.search){
      var obj = QueryString.parse(this.props.location.search)
      if(obj.query){
        this.setState({searchRows:obj.query})
      }
    }
  }
  pushUrl = ()=>{
    var newLink ='/paymenthistory/search'
    var params =[]
    //categoryDropdown,search
    if(this.refs.search.value){
        params.push({
            params:'query',
            value:this.refs.search.value
        })
    }if(this.state.date){
      params.push({
            params:'date',
            value:this.state.date
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
    var format = this.state.date.getFullYear() +"-0"+(this.state.date.getMonth()+1) +"-"+this.state.date.getDate()
    var ganti = this.state.first ? "" : format.toString()
    //2019-05-13
    var arrSearchAndFilter = this.state.rows.filter((val)=>{
       return val.no_invoice.toString().toLowerCase().includes(this.state.searchRows) 
       && (val.tanggal_pembelian.split(" ",1).join('').includes(ganti)) 
      //  && (val.tanggal_pembelian.includes(this.state.date))
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
            <TableCell align="center">
            <CurrencyFormat value={val.harga_diskon*val.quantity_pembelian} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={value => <div>{value}</div>} />
            </TableCell>
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

  filterBulan=()=>{
    this.pushUrl()
    var number 
    if (this.refs.bulan.value<9){
      number = "0"+this.refs.bulan.value
    }else{
      number = this.refs.bulan.value
    }
    axios.get(`http://localhost:2000/payment/historymonth?bulan=${number}&id=${this.props.id}`)
    .then((res)=>{
          this.setState({rows:res.data})
      })
      .catch((err)=>{
          console.log(err)
      })
  }
 
  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
if(this.props.role===2){
 
    return (
    
      <Paper className={classes.root} style={{marginBottom:"50px"}}>
        <div className={classes.tableWrapper}>
        <nav className="navbar justify-content-between">
        <h1>History Payment - {this.props.username}</h1>
        <form className="form-inline">

        <DatePicker
          format="y-MM-d"
          onChange={this.onChange}
          value={this.state.date}
          clearIcon={this.state.first}
          className="form-control"
        />
          <input type="button" value="Clear Tanggal" onClick={()=>{
            this.pushUrl()
            this.setState({first:true})
          }} className="btn btn-warning ml-2"/>
          

          <select style={{marginLeft:"10px",marginRight:"10px"}} className="form-control" ref="bulan" onChange={this.filterBulan}>
              <option>---FILTER BULAN---</option>
              <option value={1}>January</option>
              <option value={2}>Febuary</option>
              <option value={3}>Maret</option>
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
          <input className="form-control mr-sm-2" ref="search" type="search" placeholder="INVOICE NUMBER.." /> 
          <input type="button" value="Search" onClick={this.onBtnSearch} className="btn btn-warning"/>
                
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
                  <TableCell align="center">Total Harga</TableCell>
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
