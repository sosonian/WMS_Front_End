import React, { Component } from 'react';


class TestControllerUnit extends Component{
    constructor(props) {
        super(props)
        this.state = {
           
        } 
    }
    componentDidMount(){
    }

    render() {
        //this.sendFrontViewToggle()
        const canvasWindow = {
            width:'100%',
            height:'100%',
            backgroundColor:'#e6dda8',
        }
        return(
            <div style={canvasWindow}>
                {'Test Controller Unit'}
            </div>
        )
    }
}

export default TestControllerUnit