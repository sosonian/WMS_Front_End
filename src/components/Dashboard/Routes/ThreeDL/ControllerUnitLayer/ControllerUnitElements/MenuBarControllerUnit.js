import React, { Component } from 'react';

class MenuBarControllerUnit extends Component{
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        
    }
    componentDidUpdate(){
        //console.log(this.guiToken.rotationX)
        
    }

    

    render() {
        const canvasWindow = {
            width:'100%',
            height:'100%'
        }
        return(
            <div style={canvasWindow} ref={(refDom)=>{this.refDom=refDom}}></div>
        )
    }
}

export default MenuBarControllerUnit