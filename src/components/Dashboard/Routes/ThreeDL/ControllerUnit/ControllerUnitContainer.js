import React, { Component } from 'react';
import ControllerUnitContainerTab from './ControllerUnitContainerTab'
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
                },
                {
                    unitID:4,
                    name:'TestUnit',
                    title:'測試控制',
                    sequenceNumber:-1,
                }
            ],
            containerDragging:false,
            tabDragging:false,
            extending:false,
            showing:true,
            headerMergeSingnal:false,
            cancelAreaHover:false,
        }
        this.loadControllerUnitState()
        this.loadContainerPosition()
    }

    componentDidMount() {
        this.refWidth = 0
        this.refHeight = 0
        this.positionX = this.props.initialPosX
        this.positionY = this.props.initialPosY
        
    }

    componentDidUpdate() {

    }

    loadContainerPosition(){
        let positionX = this.props.initialPosX
        let positionY = this.props.initialPosY
        this.setState({
            position:{
                x:positionX,
                y:positionY
            }
        })

    }

    getDivWidth=()=>{
        if(this.state.extending)
        {
            let width = this.state.divSize.width+(this.props.PosX-this.state.refPos.x)
            this.refWidth = width
            let Msg = {
                conID:this.props.conID,
                width:width
            }
            this.props.containerExtendX(Msg)
            return width+'px'
        }
        else
        {
            return this.state.divSize.width
        }
    }

    getDivHeight=()=>{
        if(this.state.extending)
        {
            let height = this.state.divSize.height+(this.props.PosY-this.state.refPos.y)
            this.refHeight = height
            let Msg = {
                conID:this.props.conID,
                height:height
            }
            this.props.containerExtendY(Msg)
            return height+'px'
        }
        else
        {
            return this.state.divSize.height
        }
    }

    getContainerPosX=()=>{
        if(this.state.containerDragging)
        {
            this.positionX = this.props.PosX-this.state.refPos.x
        }
        return this.positionX+'px'
    }

    getContainerPosY=()=>{
        if(this.state.containerDragging)
        {
            this.positionY = this.props.PosY-this.state.refPos.y        
        }
        return this.positionY+'px'
    }

    headerMouseDown=()=>{   
        this.setState({
            containerDragging:true,
            refPos:{
                x:this.props.PosX-this.positionX,
                y:this.props.PosY-this.positionY
            }
        })   
        this.sendContainerZIndexUpdate()
    }

    headerMouseUp=()=>{
        this.setState({
            position:{
                x:this.positionX,
                y:this.positionY
            },
            containerDragging:false,
            refPos:{
                x:0,
                y:0
            }
        })
    }

    headerMouseOver=(e)=>{
        //console.log('pointer over header')
        //console.log(e.target)
        if(this.props.tabDraggingBooling && !this.state.containerDragging)
        {
            //console.log('active merge singnal')
            this.setState({
                headerMergeSingnal:true
            })
        }
    }

    sendContainerZIndexUpdate=()=>{
        let msg ={
            conID:this.props.conID,
            zIndex:this.props.zIndex
        }
        this.props.getContainerZIndexUpdate(msg)
    }

    headerMouseOut=()=>{
        
        this.setState({
            headerMergeSingnal:false
        })
    }

   getTabDraggingMsg=(msg)=>{
        let tabDraggingMsg={
            unitID:msg.unitID,
            tabDom:msg.refDom,
            posX:this.props.PosX-this.positionX,
            posY:this.props.PosY-this.positionY,
            width:this.state.divSize.width,
            height:this.state.divSize.height,
            tabDragging:msg.tabDragging
        }
        if(msg.tabDragging)
        {
            this.setState({
                tabDragging:true
            })
            this.props.onTabDragging(tabDraggingMsg)
        }
        else
        {
            this.setState({
                tabDragging:false
            })
            this.props.onTabDragging(tabDraggingMsg)
        }
        this.sendContainerZIndexUpdate()
   }

    // tabMouseDown=(e)=>{
    //     e.stopPropagation()
    //     this.setState({
    //         tabDragging:true
    //     })
    //     this.props.onTabDragging('true')
    //     this.sendContainerZIndexUpdate()
    // }

    // tabMouseUP=(e)=>{
    //     e.stopPropagation()
    //     this.setState({
    //         tabDragging:false
    //     })
    //     this.props.onTabDragging('false')
    // }

    

    cancelIconHover =()=>{
        this.setState({
            cancelAreaHover:true
        })
    }

    cancelIconOut =()=>{
        this.setState({
            cancelAreaHover:false
        })
    }

    headerCursorChangeHandler=()=>{
        let cursorToken = 'grab'
        if(this.state.containerDragging)
        {
            cursorToken = 'grabbing'
        }
        return cursorToken
    }

    cancelIconBackgroundColorChangeHandler=()=>{
        let backgroundColorToken = ''
        if(this.state.cancelAreaHover)
        {
            backgroundColorToken = '#cff5ff'
        }
        return backgroundColorToken
    }

    headerBackgroundColorChangeHandler=()=>{
        let backgroundColorToken = '#B6D9EA'
        if(this.state.headerMergeSingnal)
        {
            backgroundColorToken = '#FF3636'
        }
        return backgroundColorToken
    }

    containerChangeZIndex=()=>{
        return (50 + this.props.zIndex)
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
        //console.log('ControllerUnitContainer sendFrontViewToggle refDom : ')
        //console.log(refDom)
        this.props.sideViewToggle(refDom)
    }
    
    loadSideView=()=>{
        return(
            <SubSideViewControllerUnit ref={(refDom)=>{this.refDom=refDom}} sideViewToggle={this.sendSideViewToggle} width={this.state.divSize.width} height={this.state.divSize.height}/>
        )
    }

    sendFrontViewToggle=(refDom)=>{
        //console.log('ControllerUnitContainer sendFrontViewToggle refDom : ')
        //console.log(refDom)
        this.props.frontViewToggle(refDom)
    }

    loadFrontView=()=>{
        return(
            <SubFrontViewControllerUnit ref={(refDom)=>{this.refDom=refDom}} frontViewToggle={this.sendFrontViewToggle} width={this.state.divSize.width} height={this.state.divSize.height}/>
        )
    }

    loadHeaderTaps=()=>{
        // const tabStyle = {
        //     width:'50px',
        //     borderTopRightRadius:10,
        //     borderRight:'1px solid',
        //     borderLeft:'1px solid',
        //     borderTop:'1px solid',
        //     borderColor:'gray',
        //     backgroundColor:'#9FC5E8',
        //     padding:'1px',
        //     float:'left',
        //     whiteSpace: 'nowrap',
        //     overflow: 'hidden',
        //     textOverflow: 'ellipsis' 
        // }
        let unitStateArray = []
        this.state.controllerUnitState.map((unitState)=>{
            if(unitState.sequenceNumber>-1)
            {
                unitStateArray.push(unitState)
            }
        })
        unitStateArray.sort(function(a,b){return a.sequenceNumber-b.sequenceNumber})
        return(unitStateArray.map(unitState=>
                <ControllerUnitContainerTab unitID={unitState.unitID} tabTitle={unitState.title} tabDragging={this.getTabDraggingMsg} />
            )
        )
    }

    cancelIconMouseDown=()=>{
        const msg = {
            conID:this.props.conID,
            showing:false
        }
        this.props.containerShowing(msg)
    }

    extendAreaMouseDown=(e)=>{
        e.stopPropagation()
        this.setState({
            refPos:{
                x:this.props.PosX,
                y:this.props.PosY
            },
            extending:true
        })
        this.sendContainerZIndexUpdate()
    }

    extendAreaMouseMove=()=>{

    }

    extendAreaMouseUp=(e)=>{
        let width = this.state.divSize.width+(this.props.PosX-this.state.refPos.x)
        e.stopPropagation()
        this.setState({
            divSize:{
                width:this.refWidth,
                height:this.refHeight
            },
            refPos:{
                x:0,
                y:0
            },
            extending:false
        })
        
        let Msg = {
            conID:this.props.conID,
            width:width
        }
        this.props.containerExtendX(Msg)
    }

    

    getRotationValue=(value)=>{
        //console.log('ControllerUnitContainer getRotationValue : '+value)
        this.props.rotationValue(value)
    }

    loadControllerUnitState=()=>{
        this.props.controllerUnitState.map(unitState=>{        
            if(unitState.containerUnitContainerID === this.props.conID){
                this.setState({
                    controllerUnitState:this.state.controllerUnitState.map(thisUnitState=>{

                        if( thisUnitState.unitID === unitState.unitID)
                        {
                            thisUnitState.sequenceNumber = thisUnitState.sequenceNumber +1
                        }
                    })
                })
            }
        })
    }
    
    render() {    
        
        const containerWindow = {
            width:this.getDivWidth(),
            height: this.getDivHeight(),
            position:'absolute',
            left:this.getContainerPosX(),
            top:this.getContainerPosY(),
            zIndex:this.containerChangeZIndex(),
            border:'2px solid',
            borderColor:'black',
            boxSizing:'border-box',
            display: 'flex',
            flexDirection: 'column',
        }
    
        const headerStyle = {
            width:'100%',
            height:'25px',
            backgroundColor:this.headerBackgroundColorChangeHandler(),
            borderBottom:'1px solid',
            borderColor:'gray',
            cursor:this.headerCursorChangeHandler(),
            display:'flex',
            paddingTop:'2px',
            userSelect:'none'    
        }

        const cancelIconStyle = {
            width:'20px',
            height:'20px',
            position:'absolute',
            top:'2px',
            right:'2px',
            fontFamily:'Arial',
            cursor:'pointer',
            backgroundColor:this.cancelIconBackgroundColorChangeHandler(),
        }

        const extendFunctionAreaStyle = {
            width:'20px',
            height:'20px',
            position:'absolute',
            right:'-5px',
            bottom:'-5px',
            userSelect:'none',
            cursor:'nw-resize'
        }

        return (
            <div style={containerWindow} ref={(refContainer) => {this.refContainer = refContainer}} >  
            <div style={headerStyle} onMouseDown={this.headerMouseDown} onMouseUp={this.headerMouseUp} onMouseOver={this.headerMouseOver} onMouseOut={this.headerMouseOut} >
                {this.loadHeaderTaps()}
                <div style={cancelIconStyle} onMouseDown={this.cancelIconMouseDown} onMouseOver={this.cancelIconHover} onMouseOut={this.cancelIconOut}>{'x'}</div>
            </div>   
                <div style={extendFunctionAreaStyle} onMouseDown={this.extendAreaMouseDown} onMouseMove={this.extendAreaMouseMove} onMouseUp={this.extendAreaMouseUp} >
                   
                    &#9499;
                    
                </div>         
                {this.loadControllerUnit()}         
            </div>
        )
    }
}

export default ControllerUnitContainer