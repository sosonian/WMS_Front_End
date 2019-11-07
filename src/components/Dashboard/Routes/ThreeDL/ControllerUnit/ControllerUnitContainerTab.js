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
        //console.log('controllerUnitContainerTab tabMouseDown')
        let tabPos ={
            x:this.refDom.offsetLeft,
            y:this.refDom.offsetTop
        }

        //console.log('controllerUnitContainerTab tabMouseDown tabPos : ',tabPos)

        e.stopPropagation()
        let tabMsg = {
            unitID:this.props.unitID,
            tabTitle:this.props.tabTitle,
            refPos:{
                x:e.clientX,
                y:e.clientY
            },
            tabPos:tabPos,
            refDom:this.refDom,
            tabDragging:true
        }
        this.props.tabDragging(tabMsg)
        
    }

    tabShowingToggle = () =>{
        if(this.props.showingToggle)
        {
            return '#9fe8df'
        }
        else
        {
            return '#9FC5E8'
        }
    }

    tabMouseUP=(e)=>{
        //console.log('controllerUnitContainerTab tabMouseUp')
        e.stopPropagation()
        let tabMsg = {
            unitID:this.props.unitID,
            tabDragging:false
        }
        this.props.tabDragging(tabMsg)
    }

    render() {
        //this.sendFrontViewToggle()
        const tapStyle = {
            //width:'50px',
            borderTopRightRadius:10,
            borderRight:'1px solid',
            borderLeft:'1px solid',
            borderTop:'1px solid',
            borderColor:'gray',
            backgroundColor:this.tabShowingToggle(),
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