import React, { Component } from 'react';


class SubFrontViewControllerUnit extends Component{
    constructor(props) {
        super(props)
        this.state = {
           
        } 
    }
    componentDidMount(){
    }

    getHeight=()=>{
        return(
            this.props.height
        )
    }

    render() {
        //this.sendFrontViewToggle()
        const canvasWindow = {
            width:'100%',
            height:'100%'
        }
        return(
            <div style={canvasWindow} ref={this.props.frontViewToggle}></div>
        )
    }
}

export default SubFrontViewControllerUnit