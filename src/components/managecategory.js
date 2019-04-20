import React from 'react'
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert'
import {connect} from 'react-redux'
import PageNotFound from './404';
import './../support/category.css'

class ManageCategory extends React.Component{
    state = {dataCategory:[],
        isEdit: false,
        editIndex:Number}
    componentDidMount(){
        this.getAllCategory()
    }
    getAllCategory =()=>{
        Axios.get("http://localhost:2000/category/getallcategory")
        .then((res)=>{
            this.setState({dataCategory:res.data})
        })
        .catch((err)=>console.log(err))
    }
    onBtnEdit = (id,index)=>{
        this.setState({isEdit:true,editIndex:index})
    }
    onBtnCancel =()=>{
        this.setState({isEdit:false})
    }
    onBtnDelete = (id)=>{
        
         Axios.delete("http://localhost:2000/category/deletecategorybyid",{params:{id:id}})
        .then((res)=>{
          console.log(res.data)
          this.getAllCategory()
        })
        .catch((err)=>console.log(err))
    }
    onBtnEditSave =(id)=>{
        var category = this.refs.categoryEdit.value
        Axios.put(`http://localhost:2000/category/editcategorybyid/`+id,{category})
        .then((res)=>{
            swal("ok",res.data,"success")
            this.getAllCategory()
            this.setState({isEdit:false})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    renderJSX=()=>{
        var jsx = this.state.dataCategory.map((val,index)=>{
            return(
                <tr>
                    <td align="center">{index+1}</td>
                    <td align="center">{val.id}</td>
                    {this.state.isEdit===true&& this.state.editIndex===index? 
                    <td align="center">
                        <input type="text" className="form-control" defaultValue={val.category} ref="categoryEdit"/>
                    </td>
                    :
                    <td align="center">{val.category}</td>
                    }
                    {this.state.isEdit===true&& this.state.editIndex===index? 
                        <td align="center">
                        <Button animated onClick={()=>this.onBtnEditSave(val.id)}>
                        <i class="far fa-save"></i>
                        </Button>
                        <Button animated onClick={()=>this.onBtnCancel()}>
                        <i class="fas fa-times"></i>
                        </Button>
                        </td>
                        :
                        <td align="center">
                        <Button animated onClick={()=>this.onBtnEdit(val,index)}>
                        <i class="fas fa-pen-fancy"></i>
                        </Button>
                        <Button animated onClick={()=>this.onBtnDelete(val.id)}>
                        <i class="far fa-trash-alt"></i>
                        </Button>
                        </td>
                    }


                    
                </tr>
                    
                
            )
        })
        return jsx
    }

    // ----------- BAGIAN ADD CATEGORY ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    btnAdd =()=>{
        var category = this.refs.categoryname.value
        if(category===""){
            swal("Error Detected","Tidak bole kosong","error")
        }else{
            var newdata ={
                category:category
            }
            Axios.post("http://localhost:2000/category/addcategory",newdata)
            .then((res)=>{
                console.log(res.data)
                swal("Success",res.data,"success")
                this.getAllCategory()
                this.refs.categoryname.value=""
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
       
    }

    render(){
        if(this.props.role===1){
            return(
                <div className="container-fluid form" style={{minHeight:"450px"}}>
                        <div className="row justify-content-sm-center ml-auto mr-auto mt-3">
                                <div className="col-5 col-md-5">
                                        <form className="border mb-3" style={{padding:"20px", width:"65%",borderRadius:"5%"}}>
                                        <fieldset>
                                            <div className="head">
                                                <h1>CATEGORY ADD</h1>
                                            </div>
                                            <hr/>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Category</label>
                                                <div className="col-sm-9">
                                                <input type="text" ref="categoryname" className="form-control"  placeholder="New Category" required autoFocus/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                            <div className="col-3"/>
                                        
                                                <div className="col-9" style={{textAlign:'center'}}>
                
                                                <button type="button" className="AddStyleButton" onClick={this.btnAdd}>Add New Category</button>
                                               
                                                </div>  
                                            </div>
                                        </fieldset>
                                    </form>
                                 </div>
                                 <div className="col-7 col-md-7">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <td align="center">No</td>
                                                <td align="center">ID Category</td>
                                                <td align="center">Nama Category</td>
                                                <td align="center">Action</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                  {this.renderJSX()}
                                        </tbody>
                                           
                
                                    </table>
                                 
                                 
                                 </div>
                                
                     </div>
                </div>
                
                
                        )
        }else{
            return <PageNotFound></PageNotFound>
        }
        
    }
}
const mapStateToProp = (state)=>{
    return{
        role: state.user.role  
    }    
  }
  
export default connect(mapStateToProp)(ManageCategory);