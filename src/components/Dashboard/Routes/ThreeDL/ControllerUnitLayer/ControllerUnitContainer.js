import React, { Component } from 'react';
import ControllerUnitContainerTab from './ControllerUnitContainerTab'
import TestRotationControllerUnit from './ControllerUnitElements/TestRotationControllerUnit'
import SubFrontViewControllerUnit from './ControllerUnitElements/SubFrontViewControllerUnit'
import SubSideViewControllerUnit from './ControllerUnitElements/SubSideViewControllerUnit'
import TestControllerUnit from './ControllerUnitElements/TestControllerUnit'


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
                width:0,
                height:0,
            },
            refDivSize:{
                width:0,
                height:0
            },
            //showingUnitID:0,
            containerDragging:false,
            containerExtending:false,
            tabDragging:false,
            showing:true,
            headerMergeSingnal:false,
            cancelAreaHover:false,
            tabChangeSequence:false,
        }
    }


    componentDidMount() {
        this.loadContainerPosition()
        this.loadContainerSize()
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.containerShowing)
        {
            if(nextState.containerDragging==false && nextProps.anyContainerDragging==true && this.props.zIndex == nextProps.zIndex)
            {
                return false
            }
            else if(nextState.containerExtending==false && nextProps.anyContainerExtending==true && this.props.zIndex == nextProps.zIndex)
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
        //console.log('ControllerUnitContainer componentDidUpdate conID ', this.props.conID)
        if(prevProps.controllerUnitList !== this.props.controllerUnitList)
        {
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
        else if(prevProps.size !== this.props.size)
        {
            this.loadContainerSize()
        }
    }
    
    componentWillUnmount() {
        // console.log('ControllerUnitContainer componentWillUnmount')
    }

    setNewContainerPosition() {
        let containerX = this.props.mousePos.x-this.state.refPos.x
        let containerY = this.props.mousePos.y-this.state.refPos.y
        let newPos = {
            x:containerX,
            y:containerY
        }
        this.setState({
            position:newPos
        })
    }

    loadContainerSize=()=>{
        this.setState({
            divSize:this.props.size
        })
    }

    loadContainerPosition(){

        this.setState({
            position:this.props.initialPos
        })
    }

    loadControllerUnitState=()=>{
        let tempControllerUnitState = this.state.controllerUnitState
        let tempcontrollerUnitList = this.props.controllerUnitList

        let sequenceCount = 0
        let output = tempControllerUnitState.map(unitState=>{   
            let result =  tempcontrollerUnitList.find(e=>e.unitID===unitState.unitID)
            if(result.containerUnitContainerID === this.props.conID)
            {
                sequenceCount = sequenceCount + 1
                let showingToggle = false
                if(sequenceCount+unitState.sequenceNumber == 0)
                {
                    showingToggle = true
                }
                let unitStateObj = {
                    unitID:unitState.unitID,
                    name:unitState.name,
                    title:unitState.title,
                    sequenceNumber:unitState.sequenceNumber+ sequenceCount,
                    showing:showingToggle       
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
    }

    headerMouseDown=(e)=>{   
        e.stopPropagation()
        console.log('ControllerUnitContainer headerMouseDown')
        this.setState({
            containerDragging:true,
            refPos:{
                x:e.clientX-this.props.offset.x-this.state.position.x,
                y:e.clientY-this.props.offset.y-this.state.position.y
            }
        })   

        let msg ={
            conID:this.props.conID,
            unitID:this.props.showingUnitID,
            zIndex:this.props.zIndex,
            containerDragging:true,
        }
        this.props.containerDragging(msg)
    }

    headerMouseUp=(e)=>{
        e.stopPropagation()
        this.setState({
            containerDragging:false,
            refPos:{
                x:0,
                y:0
            },
        })  

        let msg ={
            conID:this.props.conID,
            unitID:this.props.showingUnitID,
            zIndex:this.props.zIndex,
            containerDragging:false,
            position:this.state.position
        }
        this.props.containerDragging(msg)
    }

    onDragEnter=(e)=>{
        e.stopPropagation()
        e.preventDefault()
        console.log('ControllerUnitContainer onDragEnter : conID ', this.props.conID)
        //console.log(this.state.tabChangeSequence)
        //if(this.props.tabDraggingBooling && this.state.tabChangeSequence == false)
        //{
            this.setState({
                headerMergeSingnal:true
            })

            let msg = {
                enterHeader:true,
                newConID:this.props.conID
            }
            this.props.tabNewConID(msg)  
        //}
    }

    onDragLeave=(e)=>{
        e.stopPropagation()
        e.preventDefault()
        console.log('ControllerUnitContainer onDragLeave: conID ', this.props.conID)
        //console.log(this.state.tabChangeSequence)

        if(this.props.tabDraggingBooling)
        {   
            if(this.state.tabChangeSequence == false)
            { 
                let msg = {
                    enterHeader:false,
                    newConID:this.props.conID
                }
                this.props.tabNewConID(msg) 
            }
            this.setState({
                headerMergeSingnal:false
            })  
        }
    }

    onDragOver=(e)=>{
        e.preventDefault()
    }

    onDrop=()=>{
        //console.log('ControllerUnitContainer onDrop: conID ', this.props.conID)
        this.setState({
            headerMergeSingnal:false
        })
    }

    sendContainerZIndexUpdate=()=>{
        let msg ={
            conID:this.props.conID,
            zIndex:this.props.zIndex
        }
        
        this.props.getContainerZIndexUpdate(msg)
    }

    headerMouseOut=()=>{

    }

    getTabDraggingMsg=(msg)=>{
        
        let tabDraggingMsg={
            unitID:msg.unitID,
            conID:this.props.conID,
            sequenceNumber:msg.sequenceNumber,
            tabDom:msg.refDom,
            tabTitle:msg.tabTitle,
            refPos:{
                x:this.state.position.x,
                y:this.state.position.y
            },
            tabPos:msg.tabPos,
            divSize:this.state.divSize,
            tabDragging:msg.tabDragging,
            zIndex:this.props.zIndex
        }

        if(msg.tabDragging)
        {
            this.setState({
                tabDragging:true,
            })
            this.props.onTabDragging(tabDraggingMsg)
        }
        else
        {
            this.setState({
                tabDragging:false,
            })
            this.props.onTabDragging(tabDraggingMsg)
        }
    }

    getTabNewSequenceNumber=(msg)=>{
        
        this.setState({
            tabChangeSequence:msg.tabChangeSequence,
        },()=>{
            let newMsg = {
                tabChangeSequence:msg.tabChangeSequence,
                unitID:msg.unitID,
                newConID:this.props.conID,
                newSequenceNumber:msg.sequenceNumber,
            }
    
            this.props.getTabNewSequenceNumber(newMsg)
        })
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
        
        let tempUnitID = 0 
        if(this.props.showingUnitID == 0)
        {
        }
        else 
        {
            tempUnitID = this.props.showingUnitID
        }

        switch(tempUnitID) {
            case 1:
                return(
                    this.loadMenuBar()
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
            case 5:
                return(
                    this.loadDatGui()
                )
            default:
                return    
        }
    }

    loadMenuBar=()=>{

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

    createTabJSX=(unitState, sNumber)=>{
        return(
            <ControllerUnitContainerTab unitID={unitState.unitID} sequenceNumber={sNumber} tabTitle={unitState.title} showingUnitID={this.props.showingUnitID} otherTabDragging={this.props.tabDraggingBooling} tabDragging={this.getTabDraggingMsg} getTabNewSequenceNumber={this.getTabNewSequenceNumber}/>
        )
    }


    loadHeaderTabs=()=>{

        let unitStateArray = []
        if(this.props.controllerUnitList.head)
        {
            let tempList = this.props.controllerUnitList
            let currentNode = tempList.head
            let indexCount=0

            while(currentNode)
            {
                unitStateArray.push(this.createTabJSX(currentNode.data, indexCount))  
                currentNode = currentNode.next
                indexCount ++
            }
   
            return unitStateArray
        }
        else
        {
            return
        }
        
    }

    cancelIconMouseDown=(e)=>{
        e.stopPropagation()
        const msg = {
            conID:this.props.conID,
            showing:false
        }
        this.props.containerShowing(msg)
    }

    

    extendAreaMouseDown=(e)=>{
        // console.log('extendAreaMouseDown')
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
            unitID:this.props.showingUnitID,
            zIndex:this.props.zIndex,
            containerExtending:true,
            subView:this.getSubView()
        }
        this.props.containerExtending(msg)
    }

    getSubView = () => {
        let msg = 'nonSubView'

        if(this.props.showingUnitID===2)
        {
            msg= 'frontView'
        }
        else if(this.props.showingUnitID===3)
        {
            msg= 'sideView'
        }
        return msg
    }

    extendAreaMouseUp=(e)=>{
        e.stopPropagation()
        // console.log('extendAreaMouseUp')
        // let width = this.state.refDivSize.width+(this.props.mousePos.x-this.state.refPos.x)
        // let height = this.state.refDivSize.height+(this.props.mousePos.y-this.state.refPos.y)
        // let newSize = {
        //     width:width,
        //     height:height
        // }

        this.setState({
            containerExtending:false,
            refPos:{
                x:0,
                y:0
            },
            //divSize:newSize
        })  

        

        let msg ={
            conID:this.props.conID,
            unitID:this.props.showingUnitID,
            zIndex:this.props.zIndex,
            containerExtending:false,
            subView:'nonSubView'
        }
        
        this.props.containerExtending(msg)

    }

    getRotationValue=(value)=>{
        this.props.rotationValue(value)
    }

    render() {    
        //console.log('Container render conID  : ',this.props.conID)
        //console.log('conID : ',this.props.conID, ' zIndex : ',this.props.zIndex)
        //console.log(this.state.divSize)

        const containerWindow = {
            width:this.state.divSize.width,
            height:this.state.divSize.height,
            position:'absolute',
            left:this.state.position.x,
            top:this.state.position.y,
            zIndex:this.props.zIndex,
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
            paddingLeft:'2px',
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
            <div style={containerWindow} ref={(refContainer) => {this.refContainer = refContainer}}>  
                <div style={headerStyle} onMouseDown={this.headerMouseDown} onMouseUp={this.headerMouseUp} onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave} 
                onDragOver={this.onDragOver} onDrop={this.onDrop} onMouseOut={this.headerMouseOut} >
                {this.loadHeaderTabs()}
                    <div style={cancelIconStyle} onMouseDown={this.cancelIconMouseDown}  onMouseOver={this.cancelIconHover} onMouseOut={this.cancelIconOut}>{'x'}</div>
                </div>   
                <div style={extendFunctionAreaStyle} onMouseDown={this.extendAreaMouseDown}  onMouseUp={this.extendAreaMouseUp}>
                    &#9499;
                </div>         
                {this.loadControllerUnit()}         
            </div>
        )
    }
}

export default ControllerUnitContainer