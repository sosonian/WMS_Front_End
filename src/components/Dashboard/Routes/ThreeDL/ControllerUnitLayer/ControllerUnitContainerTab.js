import React, { Component } from 'react';


class ControllerUnitContainerTab extends Component{
    constructor(props) {
        super(props)
        this.state = {
            tabHover:false
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
            sequenceNumber:this.props.sequenceNumber,
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

    tabShowingToggle = (property) =>{
        if(property==='backgroundColor')
        {
            if(this.state.tabHover)
            {
                return '#42ff32'
            }
            else
            {
                if(this.props.showingUnitID==this.props.unitID)
                {
                    return '#9fe8df'
                }
                else
                {
                    return '#9FC5E8'
                }
            }
        }
        else if(property==='borderBottom')
        {
            if(this.state.tabHover)
            {
                return '1px solid #42ff32'
            }
            else
            {
                if(this.props.showingUnitID==this.props.unitID)
                {
                    return '1px solid #9fe8df'
                }
                else
                {
                    return '1px solid #9FC5E8'
                }
            }
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

    onDragEnter=(e)=>{
        e.stopPropagation()
        e.preventDefault()
        console.log('ControllerUnitTab onDragEnter : unitID ', this.props.unitID)
        
        if(this.props.otherTabDragging)
        {
            this.setState({
                tabHover:true
            })
            let msg = {
                tabChangeSequence : true,
                unitID:this.props.unitID,
                sequenceNumber:this.props.sequenceNumber,
            }
            this.props.getTabNewSequenceNumber(msg)  
        }
    }

    onDragLeave=(e)=>{
        e.stopPropagation()
        e.preventDefault()
        console.log('ControllerUnitTab onDragLeave: unitID ', this.props.unitID)

        if(this.props.otherTabDragging)
        {
            this.setState({
                tabHover:false
            })
            let msg = {
                tabChangeSequence : false,
                unitID:this.props.unitID,
                sequenceNumber:-1,
            }
            this.props.getTabNewSequenceNumber(msg) 
        }
    }

    onDragOver=(e)=>{
        e.preventDefault()
    }

    onDrop=()=>{
        this.setState({
            tabHover:false
        })
    }

    transWidth=()=>{
        if(this.state.tabHover)
        {
            return '40px'
        }
        else
        {
            return '0px'
        }
    }

    render() {
        //console.log('ControllerUnitContainerTab render')
        //this.sendFrontViewToggle()
        const tabContainerStyle = {
            float:'left',
            display:'flex',
            overflow: 'hidden',
        }
        const tabStyle = {
            //width:'50px',
            borderTopRightRadius:10,
            borderRight:'1px solid',
            borderLeft:'1px solid',
            borderTop:'1px solid',
            //borderBottom:this.tabShowingToggle('borderBottom'),
            borderColor:'gray',
            backgroundColor:this.tabShowingToggle('backgroundColor'),
            padding:'1px',
            float:'left',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            pointerEvents:'none'
        }
         
        const emptyTabStyle ={
            transition:'width 0.5s',
            width:this.transWidth(),
            //width:0,
            float:'left',
            pointerEvents:'none'
            //animationFillMode:'forwards'
        }

        const compartmentArea = {
            float:'left',
            display:'flex',
            overflow: 'hidden',
        }
        return(
            <div style={compartmentArea}>
            <div style={tabContainerStyle} onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave} onDragOver={this.onDragOver} onDrop={this.onDrop} onMouseDown={this.tabMouseDown} onMouseUp={this.tabMouseUP}>
                <div style={emptyTabStyle} ></div>
                <div style={tabStyle}  ref={(refDom)=>{this.refDom=refDom}}>
                    {this.props.tabTitle}
                </div>
            </div>
            </div>
        )
    }
}

export default ControllerUnitContainerTab