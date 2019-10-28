import React, { Component } from 'react';


class ControllerUnitContainerTab extends Component{
    constructor(props) {
        super(props)
        this.state = {
        } 
    }

    componentDidMount(){
    }

    tabMouseDown=(e)=>{
        e.stopPropagation()
        let tabMsg = {
            unitID:this.props.unitID,

            refDom:this.refDom,
            tabDragging:true
        }
        this.props.tabDragging(tabMsg)
        
    }

    tabMouseUP=(e)=>{
        //e.stopPropagation()
        let tabMsg = {
            unitID:this.props.unitID,
            tabDragging:false
        }
        this.props.tabDragging(tabMsg)
    }

    render() {
        //this.sendFrontViewToggle()
        const tapStyle = {
            width:'50px',
            borderTopRightRadius:10,
            borderRight:'1px solid',
            borderLeft:'1px solid',
            borderTop:'1px solid',
            borderColor:'gray',
            backgroundColor:'#9FC5E8',
            padding:'1px',
            float:'left',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis' 
        }
        return(
            <div style={tapStyle} onMouseDown={this.tabMouseDown} onMouseUp={this.tabMouseUP} ref={(refDom)=>{this.refDom=refDom}}>
                {this.props.tabTitle}
            </div>
        )
    }
}

export default ControllerUnitContainerTab