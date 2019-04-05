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
    this.getAllUser()
  }
  getAllUser = ()=>{
      axios.get("http://localhost:2000/user/getalluser")
      .then((res)=>{
          this.setState({rows:res.data})
      })
      .catch((err)=>{
          console.log(err)
      })
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
    var jsx = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
    .map((val,index)=>{
        return (
            <TableRow>
            <TableCell align="center">{index+1}</TableCell>
            <TableCell align="center">{val.id}</TableCell>
            <TableCell align="center">{val.firstname}</TableCell>
            <TableCell align="left">{val.email}</TableCell>
            {this.state.isEdit===true&& this.state.editIndex===index? <TableCell align="center">
              <input type="number" defaultValue={val.verif} onChange={()=>this.cekVerifikasi(val.verif)} className="form-control" ref="verifikasi" min={0} max={1}></input>
            </TableCell>:
              <TableCell align="center">{val.verif}</TableCell>
            }
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
            <i class="fas fa-recycle"></i>
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
          <Table className={classes.table}>
          <TableHead>
              
              <TableRow>
              <TableCell align="center">No</TableCell>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Nama</TableCell>
                  <TableCell align="center">Email Address</TableCell>
                  <TableCell align="center">Status Verifikasi</TableCell>
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
      </Paper>
      
    );
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);
