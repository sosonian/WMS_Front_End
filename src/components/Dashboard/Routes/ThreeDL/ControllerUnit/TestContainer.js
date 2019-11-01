import React, { Component } from 'react';


class TestContainer extends Component{
    constructor(props) {
        super(props)
        this.state = {
        } 
    }

    componentDidMount(){
    }

    sendTabDraggingComplete(){
        //console.log('ShadowContainer tabDragging complete !!')
    }

    render() {
        //this.sendFrontViewToggle()
        const testContainerStyle ={
            width:200,
            height:200,
            position:'absolute',
            left:300,
            top:400,
            zIndex:100,
            border:'1px dotted',
            borderColor:'gray',
            boxSizing:'border-box',
        }
        return(
            <div style={testContainerStyle}> 
                {'test container'}
            </div>
        )
    }
}

export default TestContainer