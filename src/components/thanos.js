import React from 'react'
import './../support/home.css'
class Fade extends React.Component{
    state = {visible:false}
    effect = ()=>{
        this.setState({visible:true})
    }
    effect2 = ()=>{
        this.setState({visible:false})
    }
    render(){
        return(
            <div className="container" >
            
            <div style={{position:"absolute"}}className={this.state.visible? "fadeOut":"fadeIn"}>
             AVANGER BLA BLA BLA<hr/>
             <p>asdasdasdasdasdasd asdasdasdasdas asdasdasdasdas asdasdasdasd asdasdasdasdas</p>
            </div>
            
            <div style={{position:"absolute", top:"120px",left:"350px",cursor:"pointer"}}>
            {this.state.visible? <img  width="300px" alt="" onClick={this.effect2} src="https://ih0.redbubble.net/image.566889062.5864/ap,550x550,12x12,1,transparent,t.u2.png"></img>:
            <img  width="300px" alt="" onClick={this.effect} src="https://media2.giphy.com/media/26VjwfLk7CRslWHSWI/source.gif"></img> }
            
          
            </div>
             
            </div>
           
            
        )
    }
}

export default  Fade;