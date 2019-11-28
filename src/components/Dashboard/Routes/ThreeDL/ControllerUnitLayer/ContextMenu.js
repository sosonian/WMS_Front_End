import React, { Component } from 'react';


class ContextMenu extends Component{
    constructor(props) {
        super(props)
        this.state = {
        
        } 
    }

    render(){
        const contextMenuStyle = {
            top:this.props.objectInfo.pos.y,
            left:this.props.objectInfo.pos.x,
            width:100,
            hieght:100,
            position:'absolute',
            border:'1px solid',
            borderColor:'gray',
            backgroundColor:'#e8f3fc',
            padding:'1px',
        }

        return(
            <div style={contextMenuStyle}>
                {this.props.objectInfo.objectName}
                <div>{'Test option1'}</div>
                <div>{'Test option2'}</div>
                <div>{'Test option3'}</div>
            </div>
        )
    }
}

export default ContextMenu