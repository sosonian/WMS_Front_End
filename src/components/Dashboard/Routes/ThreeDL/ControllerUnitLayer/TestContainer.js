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

    onMouseMove = (e) => {
        e.stopPropagation()
        console.log('TestContainer on Mouse move')

    }

    onMouseUp = (e) => {
        e.stopPropagation()
        console.log('TestContainer on Mouse up')

    }

    onMouseDown = (e) => {
        e.stopPropagation()
        console.log('TestContainer on Mouse down')
    }

    render() {
        console.log('TestContainer render')
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
            <div style={testContainerStyle} onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} > 
                {'test container'}
            </div>
        )
    }
}

export default TestContainer