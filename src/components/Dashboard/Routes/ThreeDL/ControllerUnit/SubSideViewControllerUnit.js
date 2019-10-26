import React, { Component } from 'react';


class SubSideViewControllerUnit extends Component{
    constructor(props) {
        super(props)
        this.state = {
           
        } 
    }
    componentDidMount(){
    }

    sendSideViewToggle=()=>{
        console.log('SubSideViewControllerUnits sendSideViewToggle refDom : ')
        console.log(this.refDom)
        this.props.sideViewToggle(this.refDom)
    }

    render() {
        //this.sendFrontViewToggle()
        const canvasWindow = {
            width:'100%',
            height:'100%'
        }
        return(
            <div style={canvasWindow} ref={this.props.sideViewToggle}></div>
        )
    }
}

export default SubSideViewControllerUnit