import React, { Component } from 'react';
import { Color } from 'three';
import TestRotationControllerUnit from './TestRotationControllerUnit'
import SubFrontViewControllerUnit from './SubFrontViewControllerUnit'
import SubSideViewControllerUnit from './SubSideViewControllerUnit'

class ControllerUnitContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            position:{
                x:0,
                y:0,
            },
            refPos:{
                x:0,
                y:0
            },
            divSize:{
                width:200,
                height:200,
            },
            controllerUnitState:[
                {
                    unitID:1,
                    name:'DatGui',
                    title:'旋轉控制',
                    sequenceNumber:-1,
   
                },
                {
                    unitID:2,
                    name:'SubViewFront',
                    title:'前視圖',
                    sequenceNumber:-1,
 
                },
                {
                    unitID:3,
                    name:'SubViewFront',
                    title:'側視圖',
                    sequenceNumber:-1,
                }
            ],
            dragging:false,
            resizing:false,
            showing:true,
            headerMergeSingnal:false
        }
        this.loadControllerUnitState()
    }

    componentDidMount() {

        this.positionX = this.props.initialPosX
        this.positionY = this.props.initialPosY
        
    }

    componentDidUpdate() {

    }

    getContainerPosX=()=>{
        if(this.state.dragging)
        {
            this.positionX = this.props.PosX-this.state.refPos.x
        }
        return this.positionX+'px'
    }

    getContainerPosY=()=>{
        if(this.state.dragging)
        {
            this.positionY = this.props.PosY-this.state.refPos.y        
        }
        return this.positionY+'px'
    }

    headerMouseDown=()=>{   
        this.setState({
            dragging:true,
            refPos:{
                x:this.props.PosX-this.positionX,
                y:this.props.PosY-this.positionY
            }
        })     
    }

    headerMouseOver=(e)=>{
        console.log('pointer over header')
        console.log(e.target)
        if(this.props.tabDraggingBooling && !this.state.dragging)
        {
            console.log('active merge singnal')
            this.setState({
                headerMergeSingnal:true
            })
        }
    }

    headerMouseOut=()=>{
        
        this.setState({
            headerMergeSingnal:false
        })
    }

    tabMouseDown=()=>{
       this.props.onTabDragging('true')
    }

    tabMouseUP=()=>{
        this.props.onTabDragging('false')
    }

    onMouseUp=()=>{
        //console.log('mouse up')
        this.setState({
            dragging:false,
            refPos:{
                x:0,
                y:0
            }
        })
    }

    headerCursorChangeHandler=()=>{
        let cursorToken = 'grab'
        if(this.state.dragging)
        {
            cursorToken = 'grabbing'
        }
        //console.log(cursorToken)
        return cursorToken
    }

    headerBackgroundColorChangeHandler=()=>{
        let backgroundColorToken = '#B6D9EA'
        if(this.state.headerMergeSingnal)
        {
            backgroundColorToken = '#FF3636'
        }
        return backgroundColorToken
    }

    headerChangeZIndex=()=>{
        let zIndexToken = '100'
        if(this.state.dragging)
        {
            zIndexToken = '50'
        }
        return zIndexToken
    }

    containerWindowChangeZIndex=()=>{
        let zIndexToken = '100'
        if(this.state.dragging)
        {
            zIndexToken = '50'
        }
        return zIndexToken
    }

    loadControllerUnit=()=>{
        let stateArray = this.state.controllerUnitState
        let unitFront = stateArray.find((unit)=>{
            return unit.sequenceNumber === 0
        })
        switch(unitFront.unitID) {
            case 1:
                return(
                    this.loadDatGui()
                )
                
            case 2:
                return(
                   this.loadFrontView()
                )
            case 3:
                return(
                    this.loadSideView()
                )
        }
    }

    

    loadDatGui=()=>{
        return(
        <TestRotationControllerUnit ref={(refDom)=>{this.refDom=refDom}} rotationValue={this.getRotationValue}/>
        )
    }

    sendSideViewToggle=(refDom)=>{
        console.log('ControllerUnitContainer sendFrontViewToggle refDom : ')
        console.log(refDom)
        this.props.sideViewToggle(refDom)
    }
    
    loadSideView=()=>{
        return(
            <SubSideViewControllerUnit ref={(refDom)=>{this.refDom=refDom}} sideViewToggle={this.sendSideViewToggle}/>
        )
    }

    sendFrontViewToggle=(refDom)=>{
        console.log('ControllerUnitContainer sendFrontViewToggle refDom : ')
        console.log(refDom)
        this.props.frontViewToggle(refDom)
    }

    loadFrontView=()=>{
        return(
            <SubFrontViewControllerUnit ref={(refDom)=>{this.refDom=refDom}} frontViewToggle={this.sendFrontViewToggle}/>
        )
    }

    loadHeaderTaps=()=>{
        const tabStyle = {
            width:'40%',
            borderTopRightRadius:10,
            borderRight:'1px solid',
            borderTop:'1px solid',
            borderColor:'gray',
            backgroundColor:'#9FC5E8',
            padding:'1px'  
        }
        let unitStateArray = []
        this.state.controllerUnitState.map((unitState)=>{
            if(unitState.sequenceNumber>-1)
            {
                unitStateArray.push(unitState)
            }
        })
        unitStateArray.sort(function(a,b){return a.sequenceNumber-b.sequenceNumber})
        return(unitStateArray.map(unitState=>
                <div style= {tabStyle} onMouseDown={this.tabMouseDown} onMouseUp={this.tabMouseUP}>
                    {unitState.title}
                </div>
            )
        )
    }

    getRotationValue=(value)=>{
        console.log('ControllerUnitContainer getRotationValue : '+value)
        this.props.rotationValue(value)
    }

    loadControllerUnitState=()=>{
        console.log('ControllerUnitContainer loadControllerUnitState start')
        console.log('container ID : '+this.props.conID)
        this.props.controllerUnitState.map(unitState=>{
            console.log('map start : ')
            console.log(unitState.containerUnitContainerID)
            
            if(unitState.containerUnitContainerID === this.props.conID){
                console.log('pass if condition first')
                console.log(this.state.controllerUnitState)
                this.setState({
                    controllerUnitState:this.state.controllerUnitState.map(thisUnitState=>{
                        if( thisUnitState.unitID === unitState.unitID)
                        {
                            console.log('pass if condition second')
                            console.log('before change : '+thisUnitState.sequenceNumber)
                            thisUnitState.sequenceNumber = thisUnitState.sequenceNumber +1
                            console.log('after change : '+thisUnitState.sequenceNumber)
                        }
                    })
                })
            }
        })
    }
    
    render() {    
        
        const containerWindow = {
            width: this.state.divSize.width,
            height:  this.state.divSize.height,
            position:'absolute',
            left:this.getContainerPosX(),
            top:this.getContainerPosY(),
            zIndex:this.headerChangeZIndex(),
            border:'2px solid',
            borderColor:'black',
            boxSizing:'border-box'
          }
    
          const headerStyle = {
              width:'100%',
              height:'25px',
              backgroundColor:this.headerBackgroundColorChangeHandler(),
              borderBottom:'1px solid',
              borderColor:'gray',
              cursor:this.headerCursorChangeHandler(),
              flexDirection:'row',
              paddingTop:'2px',
              userSelect:'none'    
          }

          

        return (
            <div style={containerWindow} ref={(refContainer) => {this.refContainer = refContainer}}>  
            <div style={headerStyle} onMouseDown={this.headerMouseDown} onMouseUp={this.onMouseUp} onMouseOver={this.headerMouseOver} onMouseOut={this.headerMouseOut}>
                {this.loadHeaderTaps()}
            </div>            
                {this.loadControllerUnit()}         
            </div>
        )
      }
}

export default ControllerUnitContainer