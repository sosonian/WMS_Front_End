import React, { Component } from 'react';
import ControllerUnitContainerTab from './ControllerUnitContainerTab'
import TestRotationControllerUnit from './TestRotationControllerUnit'
import SubFrontViewControllerUnit from './SubFrontViewControllerUnit'
import SubSideViewControllerUnit from './SubSideViewControllerUnit'
import TestControllerUnit from './TestControllerUnit'


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
                    showing:false
                },
                {
                    unitID:2,
                    name:'SubViewFront',
                    title:'前視圖',
                    sequenceNumber:-1,
                    showing:false
                },
                {
                    unitID:3,
                    name:'SubViewFront',
                    title:'側視圖',
                    sequenceNumber:-1,
                    showing:false
                },
                {
                    unitID:4,
                    name:'TestUnit',
                    title:'測試控制',
                    sequenceNumber:-1,
                    showing:false
                }
            ],
            containerDragging:false,
            containerExtending:false,
            tabDragging:false,
            showing:true,
            headerMergeSingnal:false,
            cancelAreaHover:false,
        }

    }


    componentDidMount() {
        this.loadControllerUnitState()
        this.loadContainerPosition()
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.containerShowing)
        {
            if(nextState.containerDragging==false && nextProps.anyOtherDragging==true)
            {
                return false
            }
            else if(nextState.containerExtending==false && nextProps.anyOtherExtending==true)
            {
                return false
            }
            else
            {
                return true
            }
        }
        else
        {
            return false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('ControllerUnitContainer componentDidUpdate conID ', this.props.conID)

        if(prevProps.controllerUnitStateProps !== this.props.controllerUnitStateProps)
        {
            this.loadControllerUnitState()
        }
        
        if(this.state.containerExtending == false && this.state.containerDragging == true)
        {
            if(prevProps.mousePos !== this.props.mousePos)
            {
                this.setNewContainerPosition()
            } 
        }
        else if(this.state.containerExtending == true && this.state.containerDragging == false)
        {
            if(prevProps.mousePos !== this.props.mousePos)
            {
                this.setNewContainerSize()
            } 
        }
        
        // if(this.state.extending)
        // {
        //     if((prevProps.PosX !== this.props.PosX)||(prevProps.PosY !== this.props.PosY))
        //     {
        //         this.setNewContainerSize()
        //     }
        // }
        // else
        // {
        //     //console.log('extending false')
        // }
    }
    
    componentWillUnmount() {
        
    }

    setNewContainerPosition() {
        let containerX = this.props.mousePos.x-this.state.refPos.x
        let containerY = this.props.mousePos.y-this.state.refPos.y
        this.setState({
            position:{
                x:containerX,
                y:containerY
            }
        })
    }

    loadContainerPosition(){

        this.setState({
            position:this.props.initialPos
        })
    }

    loadControllerUnitState=()=>{
        let tempControllerUnitState = this.state.controllerUnitState
        let tempControllerUnitStateProps = this.props.controllerUnitStateProps

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
                    showing:unitState.showing       
                }
                return unitStateObj
            }
            else
            {
                return unitState
            }
        })

            this.setState({
                controllerUnitState:output
            })
        
    }

    setNewContainerSize=()=>{

        let width = this.state.refDivSize.width+(this.props.mousePos.x-this.state.refPos.x)
        let height = this.state.refDivSize.height+(this.props.mousePos.y-this.state.refPos.y)
        let newSize = {
            width:width,
            height:height
        }
   
        this.setState({
            divSize:newSize
        })
        this.props.getContainerNewSize(newSize)

        //let Msg = {
        //    conID:this.props.conID,
        //    width:width,
        //    height:height
        //}
        //this.props.containerExtend(Msg)
    }

    // getContainerPosX=()=>{
    //     if(this.state.containerDragging)
    //     {
    //         this.positionX = this.props.PosX-this.state.refPos.x
    //     }
    //     return this.positionX+'px'
    // }

    // getContainerPosY=()=>{
    //     if(this.state.containerDragging)
    //     {
    //         this.positionY = this.props.PosY-this.state.refPos.y        
    //     }
    //     return this.positionY+'px'
    // }

    headerMouseDown=(e)=>{   
        e.stopPropagation()
        //this.rect = this.mount.getBoundingClientRect()
        this.setState({
            containerDragging:true,
            refPos:{
                x:e.clientX-this.props.offset.x-this.state.position.x,
                y:e.clientY-this.props.offset.y-this.state.position.y
            }
        })   

        let msg ={
            conID:this.props.conID,
            zIndex:this.props.zIndex,
            containerDragging:true,
            // refPos:{
            //     x:e.clientX-this.props.offset.x-this.props.PosX,
            //     y:e.clientY-this.props.offset.y-this.props.PosY
            // }
        }
        this.props.containerDragging(msg)
        //this.sendContainerZIndexUpdate()
    }

    headerMouseUp=(e)=>{
        e.stopPropagation()
        this.setState({
            containerDragging:false,
            refPos:{
                x:0,
                y:0
            }
        })  

        let msg ={
            conID:this.props.conID,
            zIndex:this.props.zIndex,
            containerDragging:false,
            // refPos:{
            //     x:0,
            //     y:0
            // }
        }
        this.props.containerDragging(msg)
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

        let tempControllerUnitState = this.state.controllerUnitState
        let output = tempControllerUnitState.map((unitState=>{  
            let unitStateObj ={} 
            if(unitState.unitID === msg.unitID)
            {
                unitStateObj = {
                    unitID:unitState.unitID,
                    name:unitState.name,
                    title:unitState.title,
                    sequenceNumber:unitState.sequenceNumber,
                    showing:true    
                }
                return unitStateObj
            }
            else
            {
                unitStateObj = {
                    unitID:unitState.unitID,
                    name:unitState.name,
                    title:unitState.title,
                    sequenceNumber:unitState.sequenceNumber,
                    showing:false   
                }
                return unitStateObj
            }
        }))
        
        if(this.state.controllerUnitState !== output)
        {
            this.setState({
                controllerUnitState : output
            })
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
            return unit.showing == true
        })
        
        if(unitFront==undefined)
        {
            //console.log('unitFront not found!')
            let unitFront2 = stateArray.find((unit)=>{
                return unit.sequenceNumber == 0
            })

            if(unitFront2 !== undefined)
            {
            switch(unitFront2.unitID) {
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
                case 4:
                    return(
                        this.loadTestUnit()
                    )
            }
            }
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
                case 4:
                    return(
                        this.loadTestUnit()
                    )
            }
        }
    }

    loadTestUnit=()=>{
        return(
            <TestControllerUnit />
        )
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
            <SubSideViewControllerUnit ref={(refDom)=>{this.refDom=refDom}} sideViewToggle={this.sendSideViewToggle}  />
        )
    }

    sendFrontViewToggle=(refDom)=>{
        this.props.frontViewToggle(refDom)
    }

    loadFrontView=()=>{
        return(
            <SubFrontViewControllerUnit ref={(refDom)=>{this.refDom=refDom}} frontViewToggle={this.sendFrontViewToggle} />
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
        //console.log(this.getSubView())
        e.stopPropagation()

        this.setState({
            containerExtending:true,
            refPos:{
                x:e.clientX-this.props.offset.x,
                y:e.clientY-this.props.offset.y
            },
            refDivSize:this.state.divSize
        })   

        let msg ={
            conID:this.props.conID,
            zIndex:this.props.zIndex,
            containerExtending:true,
            subView:this.getSubView()
        }
        this.props.containerExtending(msg)
    }

    getSubView = () => {
        if(this.state.controllerUnitState[1].sequenceNumber==0)
        {
            return 'frontView'
        }
        else if(this.state.controllerUnitState[2].sequenceNumber==0)
        {
            return 'sideView'
        }
        else
        {
            return 'nonSubView'
        }
    }

    extendAreaMouseUp=(e)=>{
        e.stopPropagation()
        let width = this.state.refDivSize.width+(this.props.mousePos.x-this.state.refPos.x)
        let height = this.state.refDivSize.height+(this.props.mousePos.y-this.state.refPos.y)
        let newSize = {
            width:width,
            height:height
        }
        //this.props.getContainerNewSize(newSize)
        this.setState({
            containerExtending:false,
            refPos:{
                x:0,
                y:0
            },
            divSize:newSize
        })  

        

        let msg ={
            conID:this.props.conID,
            zIndex:this.props.zIndex,
            containerExtending:false,
            subView:'nonSubView'
        }
        
        this.props.containerExtending(msg)

        // let Msg = {
        //     conID:this.props.conID,
        //     width:width,
        //     height:height
        // }
        // this.props.containerExtend(Msg)
    }

    getRotationValue=(value)=>{
        this.props.rotationValue(value)
    }

    onMouseOut=(e)=>{
        e.stopPropagation()
    }

    render() {    
        console.log('Container render')
        const containerWindow = {
            width:this.state.divSize.width,
            height:this.state.divSize.height,
            position:'absolute',
            left:this.state.position.x,
            top:this.state.position.y,
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