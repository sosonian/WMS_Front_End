import React, { Component } from 'react';


class ShadowContainer extends Component{
    constructor(props) {
        super(props)
        this.state = {
        } 
    }

    componentDidMount(){
    }

    sendTabDraggingComplete(){
        console.log('ShadowContainer tabDragging complete !!')

    }

    render() {
        //this.sendFrontViewToggle()
        const shadowContainerStyle ={
            width:this.props.width,
            height:this.props.height,
            position:'absolute',
            left:this.props.posX-this.props.refPosX,
            top:this.props.posY-this.props.refPosY,
            zIndex:100,
            border:'1px dotted',
            borderColor:'gray',
            boxSizing:'border-box',
        }
        return(
            <div style={shadowContainerStyle}> 
                {'test shadow container'}
            </div>
        )
    }
}

export default ShadowContainer