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
        //console.log('ShadowContainer tabDragging complete !!')
    }

    onDragEnd=()=>{
        //console.log('ShadowContainer onDragEnd')
        let msg ={
            tabDragging:false,
            divSize:this.props.containerSize
        }
        this.props.draggingMsg(msg)
    }

    onMouseUp=()=>{
        //console.log('ShadowContainer onMouseUp')
        let msg ={
            tabDragging:false,
            divSize:this.props.containerSize
        }
        this.props.draggingMsg(msg)

    }

    render() {
        const shadowContainerStyle ={
            width:this.props.containerSize.width,
            height:this.props.containerSize.height-25,
            position:'absolute',
            left:this.props.refPos.x,
            top:this.props.refPos.y+25,
            zIndex:100,
            border:'1px dotted',
            borderColor:'gray',
            boxSizing:'border-box',
        }

        const tapStyle = {
            top:-24,
            left:this.props.tabPos.x,
            position:'absolute',
            borderTopRightRadius:10,
            borderRight:'1px solid',
            borderLeft:'1px solid',
            borderTop:'1px solid',
            borderColor:'gray',
            backgroundColor:'#e8f3fc',
            padding:'1px',
            float:'left',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis' 
        }


        return(
            <div style={shadowContainerStyle} draggable={true} onDragEnd={this.onDragEnd} onMouseUp={this.onMouseUp}>            
                <div style={tapStyle}>
                    {this.props.tabTitle}
                </div>       
            </div>
        )
    }
}

export default ShadowContainer