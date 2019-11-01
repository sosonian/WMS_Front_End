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
            refDivSize:{
                width:0,
                height:0
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

    }


    componentDidMount() {
        //console.log('ControllerUnitContainer componentDidMount conID ', this.props.conID)
        //console.log('state controllerUnitState')
        this.loadControllerUnitState()
        this.loadContainerPosition()

        //console.log(this.state.controllerUnitState)
        
        this.positionX = this.props.initialPosX
        this.positionY = this.props.initialPosY
    }

    componentDidUpdate(prevProps, prevState) {
        //console.log('ControllerUnitContainer componentDidUpdate conID ', this.props.conID)

        if(prevProps.controllerUnitStateProps !== this.props.controllerUnitStateProps)
        {
            this.loadControllerUnitState()
        }
        
        if(this.state.extending)
        {
            if((prevProps.PosX !== this.props.PosX)||(prevProps.PosY !== this.props.PosY))
            {
                this.getDivSize()
            }
        }
        else
        {
            //console.log('extending false')
        }
    }
    
    componentWillUnmount() {
        //console.log('ControllerUnitContainer componentWillUnmount conID ', this.props.conID)
        //console.log('state controllerUnitState')
        //console.log(this.state.controllerUnitState)
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

    loadControllerUnitState=()=>{
        //console.log('ControllerUnitContainer loadControllerUnitState conID ', this.props.conID)

        let tempControllerUnitState = this.state.controllerUnitState
        let tempControllerUnitStateProps = this.props.controllerUnitStateProps

        //console.log('state controllerUnitState before')
        //console.log(tempControllerUnitState)

        let sequenceCount = 0
        let output = tempControllerUnitState.map(unitState=>{   
            let result =  tempControllerUnitStateProps.find(e=>e.unitID===unitState.unitID)
            if(result.containerUnitContainerID === this.props.conID)
            {
                sequenceCount = sequenceCount + 1
                let unitStateObj = {
                    unitID:unitState.unitID,
                    name:unitState.name,
                    title:unitState.title,
                    sequenceNumber:unitState.sequenceNumber+ sequenceCount,       
                }
                return unitStateObj
            }
            else
            {
                return unitState
            }
        })
        //console.log('state controllerUnitState after')
        //console.log(output)

        
            this.setState({
                controllerUnitState:output
            })
        
    }

    getDivSize=()=>{

        let width = this.state.refDivSize.width+(this.props.PosX-this.state.refPos.x)
        let height = this.state.refDivSize.height+(this.props.PosY-this.state.refPos.y)
   
        this.setState({
            divSize:{
                width:width,
                height:height
            }
        })

        let Msg = {
            conID:this.props.conID,
            width:width,
            height:height
        }
        this.props.containerExtend(Msg)
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
        if(this.props.tabDraggingBooling && !this.state.containerDragging)
        {
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
            tabTitle:msg.tabTitle,
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
        
        if(unitFront==undefined)
        {
        }
        else
        {
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
    }

    loadDatGui=()=>{
        return(
        <TestRotationControllerUnit ref={(refDom)=>{this.refDom=refDom}} rotationValue={this.getRotationValue}/>
        )
    }

    sendSideViewToggle=(refDom)=>{
        this.props.sideViewToggle(refDom)
    }
    
    loadSideView=()=>{
        return(
            <SubSideViewControllerUnit ref={(refDom)=>{this.refDom=refDom}} sideViewToggle={this.sendSideViewToggle}  height={this.state.divSize.height+(this.props.PosY-this.state.refPos.y)}/>
        )
    }

    sendFrontViewToggle=(refDom)=>{
        this.props.frontViewToggle(refDom)
    }

    loadFrontView=()=>{
        return(
            <SubFrontViewControllerUnit ref={(refDom)=>{this.refDom=refDom}} frontViewToggle={this.sendFrontViewToggle} width={this.state.divSize.width} height={this.state.divSize.height}/>
        )
    }

    loadHeaderTaps=()=>{

        let unitStateArray = []
        this.state.controllerUnitState.map((unitState)=>{
            if(unitState==undefined)
            {

            }
            else
            {
                if(unitState.sequenceNumber>-1)
                {
                    unitStateArray.push(unitState)
                }
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
        console.log('extendArea mouse down')
        e.stopPropagation()
        this.setState({
            refPos:{
                x:this.props.PosX,
                y:this.props.PosY
            },
            refDivSize:{
                width:this.state.divSize.width,
                height:this.state.divSize.height
            },
            extending:true
        })
        this.sendContainerZIndexUpdate()
    }

    extendAreaMouseUp=(e)=>{
        e.stopPropagation()

        let width = this.state.refDivSize.width+(this.props.PosX-this.state.refPos.x)
        let height = this.state.refDivSize.height+(this.props.PosY-this.state.refPos.y)

        this.setState({
            divSize:{
                width:width,
                height:height
            },
            refPos:{
                x:0,
                y:0
            },
            refDivSize:{
                width:0,
                height:0
            },
            extending:false
        })
        
        let Msg = {
            conID:this.props.conID,
            width:width,
            height:height
        }
        this.props.containerExtend(Msg)
    }

    getRotationValue=(value)=>{
        this.props.rotationValue(value)
    }

    onMouseOut=(e)=>{
        e.stopPropagation()
    }

    render() {    
        
        const containerWindow = {
            width:this.state.divSize.width,
            height:this.state.divSize.height,
            position:'absolute',
            left:this.getContainerPosX(),
            top:this.getContainerPosY(),
            zIndex:this.containerChangeZIndex(),
            backgroundColor:'yellow',
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
            right:'0px',
            bottom:'0px',
            userSelect:'none',
            cursor:'nw-resize'
        }

        return (
            <div style={containerWindow} ref={(refContainer) => {this.refContainer = refContainer}} >  
                <div style={headerStyle} onMouseDown={this.headerMouseDown} onMouseUp={this.headerMouseUp} onMouseOver={this.headerMouseOver} onMouseOut={this.headerMouseOut} >
                {this.loadHeaderTaps()}
                    <div style={cancelIconStyle} onMouseDown={this.cancelIconMouseDown} onMouseOver={this.cancelIconHover} onMouseOut={this.cancelIconOut}>{'x'}</div>
                </div>   
                <div style={extendFunctionAreaStyle} onMouseDown={this.extendAreaMouseDown}  onMouseUp={this.extendAreaMouseUp} onMouseOut={this.onMouseOut}>
                    &#9499;
                </div>         
                {this.loadControllerUnit()}         
            </div>
        )
    }
}

export default ControllerUnitContainer