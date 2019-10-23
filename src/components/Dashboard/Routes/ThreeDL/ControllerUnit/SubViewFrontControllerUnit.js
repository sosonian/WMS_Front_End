import React, { Component } from 'react';


class SubViewFrontControllerUnit extends Component{
    constructor(props) {
        super(props)
        this.state = {
           
        } 
    }
    componentDidMount(){
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

export default SubViewFrontControllerUnit