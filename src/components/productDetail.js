import React from 'react'
import ReactImageMagnify from 'react-image-magnify';

class ProductDetail extends React.Component{
    state = {quantity:""}

    cekQuantity = ()=>{
        var jumlah = this.refs.quantity.value
        if (jumlah<1){
            this.refs.quantity.value=1
            this.setState({quantity:"Try Again"})
        }else{
            this.setState({quantity:""})
        }
    }

    render(){
        return(
        <div className="container justify-content-sm-center ml-auto mr-auto mt-3">
            <div className="row">
                <div className="col-6 col-md-6">
                <ReactImageMagnify {...{
                        smallImage: {
                            alt: 'Wristwatch by Ted Baker London',
                            isFluidWidth: true,
                            src:"https://images.pexels.com/photos/1030895/pexels-photo-1030895.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                        },
                        
                        largeImage: {
                            src: "https://images.pexels.com/photos/1030895/pexels-photo-1030895.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                            
                            width: 1200,
                            height: 1800
                        },
                        enlargedImagePosition:"over"
                        // enlargedImagePortalId:"gambargede",
                        
                        
                    }} />

                </div>
                <div className="col-6 col-md-6">
                    <h1>Product Detail: Product Name</h1>
                    <hr/>
                    <p>
                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                    </p>
                    <hr/>
                    <ul>
                        <li>Item Condition: Used</li>
                        <li>Grade Quality: A</li>
                        <li>Status Item: Original</li>
                        <li>Extra Note: 90% like new, slightly damages</li>
                    </ul>
                    <div className="row">
                            <div className="col-md-2 col-2">
                                <div style={{fontSize:"14px",fontWeight:"700",marginTop:"10px"}} >
                                Jumlah
                                </div>
                                <input type="number" ref="quantity" min={1} className="form-control" onChange={this.cekQuantity} defaultValue="1" style={{marginTop:"13px",width:"60px"}}></input>
                                <div style={{color:"red",fontSize:"12px"}}> {this.state.quantity}</div>

                            </div>
                            <div className="col-md-8 col-8">
                                <div style={{fontSize:"14px",fontWeight:"700",marginTop:"10px"}} >
                                <i class="far fa-comments"></i> Catatan Untuk Penjual (Optional)
                                </div>
                                <input type="text" placeholder="Contoh: Design or color" ref="catatanuntukpenjual" className="form-control" style={{marginTop:"13px"}}></input>
                            </div>

                    </div>
                    <br></br>
                    <input type="button" className="btn border-success col-md-4" value="Masukan Keranjang ">
                    
                    </input>
                    
                </div>
                
            </div>
                <hr></hr>
                   {/* <div id="gambargede"></div> */}
        </div>
        )
    }
}

export default ProductDetail;