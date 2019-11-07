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
            tabDragging:false
        }
        this.props.draggingMsg(msg)
    }

    render() {
        const shadowContainerStyle ={
            width:this.props.containerSize.width,
            height:this.props.containerSize.height,
            position:'absolute',
            left:this.props.refPos.x,
            top:this.props.refPos.y,
            zIndex:100,
            border:'1px dotted',
            borderColor:'gray',
            boxSizing:'border-box',
        }

        const headerStyle = {
            width:'100%',
            height:'25px',
            borderBottom:'1px dotted',
            borderColor:'gray',
            display:'flex',
            paddingTop:'2px',
            userSelect:'none'    
        }

        const tapStyle = {
            //width:'50px',
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
            <div style={shadowContainerStyle} draggable={true} onDragEnd={this.onDragEnd}> 
                <div style={headerStyle} >
                    <div style={tapStyle}>
                        {this.props.tabTitle}
                    </div>

                </div>
            </div>
        )
    }
}

export default ShadowContainer