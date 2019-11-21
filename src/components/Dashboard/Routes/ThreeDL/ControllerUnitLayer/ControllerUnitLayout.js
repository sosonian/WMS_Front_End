import React, { Component } from 'react';
import ControllerUnitContainer from './ControllerUnitContainer'
import ShadowContainer from './ShadowContainer'
import TestContainer from './TestContainer'
import LinkedList from '../../../../CommonUtilities/LinkedList'
import { stat } from 'fs';


class ControllerUnitLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            controllerUnitState:[
                {
                    unitID:1,
                    name:'MenuBar',
                    title:'工具列',
                    containerUnitContainerID:1,
                    sequenceNumber:1,
                },
                {
                    unitID:2,
                    name:'SubViewFront',
                    title:'前視圖',
                    sequenceNumber:1,
                    containerUnitContainerID:2,
                },
                {
                    unitID:3,
                    name:'SubViewFront',
                    title:'側視圖',
                    sequenceNumber:1,
                    containerUnitContainerID:3,
                },
                {
                    unitID:4,
                    name:'TestUnit',
                    title:'測試控制',
                    sequenceNumber:1,
                    containerUnitContainerID:3,
                },
                {
                    unitID:5,
                    name:'DatGui',
                    title:'旋轉控制',
                    sequenceNumber:1,
                    containerUnitContainerID:4,
                }
            ],
            containerNumber:4,

            ControllerUnitContainerState:[],

            mousePos:{
                x:0,
                y:0
            },
            refPos:{
                x:0,
                y:0
            },
            needMousePos:false,
            orbitControlMode:false,
            tabDragging:{
                status:false,
                targetUnitID:0,
                unitID:0,
                oldConID:0,
                newConID:0,
                oldSequenceNumber:-1,
                newSequenceNumber:-1,
            },
            
            containerDragging:{
                status:false,
                conID:0
            },
            containerExtending:{
                status:false,
                conID:0,
                subView:'nonSubView'
            },
            shadowContainer:{},
            unmountTest:'None'
        }
    }

    componentDidMount(){
        let tempContainerState= this.loadUnitStateToContainer(this.createContainerState())
        let outputContainerState = this.initialShowingUnitID(tempContainerState)
    
        this.setContainerState(outputContainerState)
    }

    componentDidUpdate(prevProps, prevState){
        //console.log('ControllerUnitLayout componentDidUpdate')
    }

    componentWillUnmount() {
        //console.log('ControllerUnitLayout componentWillUnmount : ', this.state.unmountTest)
    }

    initialShowingUnitID = (containerState) =>{
        containerState.map((container=>{
            if(container.controllerUnitList.head)
            {
                let tempShowingUnitID = container.controllerUnitList.head.data.unitID
                container.showingUnitID = tempShowingUnitID
            }
            else
            {
                container.showing = false
            }
        }))
        return containerState
    }

    appendShadowContainer=()=>{
        if(this.state.tabDragging.status)
        {
            return(
                <ShadowContainer  containerSize={this.state.shadowContainer.divSize} mousePos={this.state.mousePos} refPos={this.state.shadowContainer.refPos} tabPos={this.state.shadowContainer.tabPos} tabTitle={this.state.shadowContainer.tabTitle} draggingMsg={this.onTabDragging}/>
            )
        }
        else
        {
            return("")
        }
    }

    createContainerState=()=>{
        let containerStateArray = []
    
        for (var i=0; i<this.state.containerNumber; i++)
        {
            let posX=200*Math.floor(i/3)
            let posY
            if(i%3===0)
            {
                posY=0
            }
            else if(i%3===1)
            {
                posY=200
            }
            else if(i%3===2)
            {
                posY=400
            }

            let tempLinkedList =new LinkedList()
            let containerStateObj={
                containerID:i+1,
                size:
                {
                    width:200,
                    height:200
                },
                position:{
                    x:posX,
                    y:posY
                },
                zIndex:i+1,
                showing:true,
                showingUnitID:0,
                controllerUnitList: tempLinkedList
            }

            containerStateArray.push(containerStateObj)
        }

        return containerStateArray
    }


    ////////////////////////////////////////////////////////////////////////////////////////
    loadUnitStateToContainer=(containerStateArray)=>{
        let tempUnitArray = this.state.controllerUnitState   
        let tempContainerArray = containerStateArray
         

        tempUnitArray.map((unitState=>{
            if(unitState.containerUnitContainerID>0 && unitState.containerUnitContainerID<Number(tempContainerArray.length+1))
            {
                let newUnitState = unitState
                //newUnitState.sequenceNumber = newSequenceNumber
                let index = unitState.containerUnitContainerID-1
                let tempList = tempContainerArray[index].controllerUnitList
                tempList.insertLast(newUnitState)
                tempContainerArray[index].controllerUnitList = tempList
            }
        }))

        return tempContainerArray
    }

    setContainerState=(newContainerState)=>{
        if(this.state.ControllerUnitContainerState !== newContainerState)
        {
            this.setState({
                ControllerUnitContainerState:newContainerState
            })
        }
    }

    onTabDragging =(msg)=>{

        if(msg.tabDragging)
        {
            this.setState({
                tabDragging:
                {
                    status:true,
                    unitID:msg.unitID,
                    targetUnitID:0,
                    oldConID:msg.conID,
                    newConID:msg.conID,
                    oldSequenceNumber:msg.sequenceNumber,
                    newSequenceNumber:msg.sequenceNumber,
                },
                needMousePos:true,
                shadowContainer:msg,
                ControllerUnitContainerState:this.setNewContainerZIndex(msg)
            })
            
            if(msg.unitID == 2)
            {
                this.props.frontViewSizeChange(msg.divSize)
            }
            else if(msg.unitID == 3)
            {
                this.props.sideViewSizeChange(msg.divSize)
            }
        }
        else
        {
            // change the status of unit sequnce, possible scenarios:
            //
            // 1.no change : oldConID === newConID && oldSeqNum === newSeqNum
            // 2.the same container, shift to the last : oldConID === newConID && newSeqNum === -1
            // 3.the same container, shift with other unit : oldConID === newConID && oldSeqNum !== newSeqNum
            // 4.different container, place to the last : oldConID !== newConID && newSeqNum === -1
            // 5.different container, replace the place of other unit : oldConID !== newConID && newSeqNum !== -1
            // 6.place to an all new container (default is no show, toggle to showing) : newConID === 0
            //
            let output =[]
            let leftShowingUnitID
          

            if(this.state.tabDragging.oldConID === this.state.tabDragging.newConID && this.state.tabDragging.oldSequenceNumber === this.state.tabDragging.newSequenceNumber)
            {
                output = this.state.ControllerUnitContainerState
            } 
            else if(this.state.tabDragging.oldConID === this.state.tabDragging.newConID && this.state.tabDragging.newSequenceNumber === -1)
            {

                let index = this.state.tabDragging.oldConID-1
                let originContainerList = this.state.ControllerUnitContainerState[index].controllerUnitList.cloneList()
                let unitIndex = this.state.tabDragging.oldSequenceNumber    
                originContainerList.shiftToLast(unitIndex)        

                let tempContainerArray = []
                this.state.ControllerUnitContainerState.map(state=>{
                    if(state.containerID==this.state.tabDragging.oldConID)
                    {
                        let tempStateObj = {
                            containerID:state.containerID,
                            size:state.size,
                            position:state.position,
                            zIndex:state.zIndex,
                            showing:state.showing,
                            showingUnitID:this.state.tabDragging.unitID,
                            controllerUnitList:originContainerList
                        }
                        tempContainerArray.push(tempStateObj)
                    }
                    else
                    {
                        tempContainerArray.push(state)
                    }        
                })

                output = tempContainerArray
             
            }
            else if(this.state.tabDragging.oldConID === this.state.tabDragging.newConID && this.state.tabDragging.newSequenceNumber !== this.state.tabDragging.oldSequenceNumber && this.state.tabDragging.newSequenceNumber !== -1)
            {
                let index = this.state.tabDragging.oldConID-1
                let originContainerList = this.state.ControllerUnitContainerState[index].controllerUnitList.cloneList()
                originContainerList.shiftTo(this.state.tabDragging.newSequenceNumber,this.state.tabDragging.oldSequenceNumber)
                
                let tempContainerArray = []
                this.state.ControllerUnitContainerState.map(state=>{
                    if(state.containerID==this.state.tabDragging.oldConID)
                    {
                        let tempStateObj = {
                            containerID:state.containerID,
                            size:state.size,
                            position:state.position,
                            zIndex:state.zIndex,
                            showing:state.showing,
                            showingUnitID:this.state.tabDragging.unitID,
                            controllerUnitList:originContainerList
                        }
                        tempContainerArray.push(tempStateObj)
                    }
                    else
                    {
                        tempContainerArray.push(state)
                    }        
                })

                output = tempContainerArray

            }
            else if(this.state.tabDragging.oldConID !== this.state.tabDragging.newConID && this.state.tabDragging.newConID !== 0 && this.state.tabDragging.newSequenceNumber === -1)
            {
                let originContainerList = this.state.ControllerUnitContainerState[this.state.tabDragging.oldConID-1].controllerUnitList.cloneList()
                let newContainerList = this.state.ControllerUnitContainerState[this.state.tabDragging.newConID-1].controllerUnitList.cloneList()
                
                let newContainerZIndex = this.state.ControllerUnitContainerState[this.state.tabDragging.newConID-1].zIndex

                let tempData = originContainerList.getAt(this.state.tabDragging.oldSequenceNumber)
                originContainerList.removeAt(this.state.tabDragging.oldSequenceNumber)
                newContainerList.insertLast(tempData)

                let tempContainerArray = []

                this.state.ControllerUnitContainerState.map(state=>{
                    if(state.containerID==this.state.tabDragging.oldConID)
                    {
                        let tempShowingUnitID = 0 
                        let showingBooling =true
                        if(originContainerList.head)
                        {
                            tempShowingUnitID = originContainerList.head.data.unitID
                        }
                        else
                        {
                            showingBooling = false
                        }

                        leftShowingUnitID = tempShowingUnitID

                        let tempStateObj = {
                            containerID:state.containerID,
                            size:state.size,
                            position:state.position,
                            zIndex:state.zIndex-1,
                            showing:showingBooling,
                            showingUnitID:tempShowingUnitID,
                            controllerUnitList:originContainerList
                        }
                        tempContainerArray.push(tempStateObj)
                    }
                    else if(state.containerID==this.state.tabDragging.newConID)
                    {
                        let tempStateObj = {
                            containerID:state.containerID,
                            size:msg.divSize,
                            position:state.position,
                            zIndex:this.state.ControllerUnitContainerState.length,
                            showing:state.showing,
                            showingUnitID:this.state.tabDragging.unitID,
                            controllerUnitList:newContainerList
                        }
                        tempContainerArray.push(tempStateObj)
                    }       
                    else
                    {
                        let tempStateObj = {}
                        if(state.zIndex > newContainerZIndex )
                        {
                            tempStateObj = {
                                containerID:state.containerID,
                                size:state.size,
                                position:state.position,
                                zIndex:state.zIndex-1,
                                showing:state.showing,
                                showingUnitID:state.showingUnitID,
                                controllerUnitList:state.controllerUnitList
                            }
                        }
                        else
                        {
                            tempStateObj = state
                        }
                        tempContainerArray.push(tempStateObj)
                    }        
                })
                output = tempContainerArray
            }
            else if(this.state.tabDragging.oldConID !== this.state.tabDragging.newConID && this.state.tabDragging.newConID !== 0 && this.state.tabDragging.newSequenceNumber !== -1)
            {
                let originContainerList = this.state.ControllerUnitContainerState[this.state.tabDragging.oldConID-1].controllerUnitList.cloneList()
                let newContainerList = this.state.ControllerUnitContainerState[this.state.tabDragging.newConID-1].controllerUnitList.cloneList()

                let newContainerZIndex = this.state.ControllerUnitContainerState[this.state.tabDragging.newConID-1].zIndex

                let tempData = originContainerList.getAt(this.state.tabDragging.oldSequenceNumber)
                originContainerList.removeAt(this.state.tabDragging.oldSequenceNumber)

                newContainerList.insertAt(tempData,this.state.tabDragging.newSequenceNumber)

                let tempContainerArray = []
                this.state.ControllerUnitContainerState.map(state=>{
                    if(state.containerID==this.state.tabDragging.oldConID)
                    { 
                        let showingBooling =true
                        let tempShowingUnitID = 0 
                        if(originContainerList.head)
                        {
                            tempShowingUnitID = originContainerList.head.data.unitID
                        }
                        else
                        {
                            showingBooling = false
                        }

                        leftShowingUnitID = tempShowingUnitID

                        let tempStateObj = {
                            containerID:state.containerID,
                            size:state.size,
                            position:state.position,
                            zIndex:state.zIndex-1,
                            showing:showingBooling,
                            showingUnitID:tempShowingUnitID,
                            controllerUnitList:originContainerList
                        }
                        tempContainerArray.push(tempStateObj)
                    }
                    else if(state.containerID==this.state.tabDragging.newConID)
                    {
                        
                        let tempStateObj = {
                            containerID:state.containerID,
                            size:msg.divSize,
                            position:state.position,
                            zIndex:this.state.ControllerUnitContainerState.length,
                            showing:state.showing,
                            showingUnitID:this.state.tabDragging.unitID,
                            controllerUnitList:newContainerList
                        }
                        tempContainerArray.push(tempStateObj)
                    }       
                    else
                    {
                        let tempStateObj = {}
                        if(state.zIndex > newContainerZIndex )
                        {
                            tempStateObj = {
                                containerID:state.containerID,
                                size:state.size,
                                position:state.position,
                                zIndex:state.zIndex-1,
                                showing:state.showing,
                                showingUnitID:state.showingUnitID,
                                controllerUnitList:state.controllerUnitList
                            }
                        }
                        else
                        {
                            tempStateObj = state
                        }
                        tempContainerArray.push(tempStateObj)
                    }        
                })
                output = tempContainerArray
            }
            else if(this.state.tabDragging.newConID === 0)
            {       
                console.log('open new container')
                let validContainer = this.state.ControllerUnitContainerState.find(state=>state.showing===false)
               
                if(validContainer === undefined)
                {
                    output = this.state.ControllerUnitContainerState
                }
                else
                { 
                    let validContainerID = validContainer.containerID
                    let originContainerList = this.state.ControllerUnitContainerState[this.state.tabDragging.oldConID-1].controllerUnitList.cloneList()

                    let newContainerZIndex = this.state.ControllerUnitContainerState[validContainerID-1].zIndex

                    let newContainerList = new LinkedList()

                    let tempData = originContainerList.getAt(this.state.tabDragging.oldSequenceNumber)
                    originContainerList.removeAt(this.state.tabDragging.oldSequenceNumber)
                    newContainerList.insertLast(tempData)
                    let tempShowingUnitID = 0 

                    if(originContainerList.head)
                    {
                        console.log('originContainerList.head not null')
                        let tempContainerArray = []
                        this.state.ControllerUnitContainerState.map(state=>{
                            if(state.containerID===this.state.tabDragging.oldConID)
                            { 
                                tempShowingUnitID = originContainerList.head.data.unitID
                                leftShowingUnitID = tempShowingUnitID
        
                                let tempStateObj = {
                                    containerID:state.containerID,
                                    size:state.size,
                                    position:state.position,
                                    zIndex:state.zIndex-1,
                                    showing:true,
                                    showingUnitID:tempShowingUnitID,
                                    controllerUnitList:originContainerList
                                }
                                tempContainerArray.push(tempStateObj)
                            }
                            else if(state.containerID===validContainerID)
                            {
                                
                                let tempStateObj = {
                                    containerID:state.containerID,
                                    size:msg.divSize,
                                    position:this.state.mousePos,
                                    zIndex:this.state.ControllerUnitContainerState.length,
                                    showing:true,
                                    showingUnitID:this.state.tabDragging.unitID,
                                    controllerUnitList:newContainerList
                                }
                                tempContainerArray.push(tempStateObj)
                            }       
                            else
                            {
                                let tempStateObj = {}
                                if(state.zIndex > newContainerZIndex )
                                {
                                    tempStateObj = {
                                        containerID:state.containerID,
                                        size:state.size,
                                        position:state.position,
                                        zIndex:state.zIndex-1,
                                        showing:state.showing,
                                        showingUnitID:state.showingUnitID,
                                        controllerUnitList:state.controllerUnitList
                                    }
                                }
                                else
                                {
                                    tempStateObj = state
                                }
                                tempContainerArray.push(tempStateObj)
                            }        
                        })
                        output = tempContainerArray
                    }
                    else
                    {
                        output = this.state.ControllerUnitContainerState
                    }
                }
            }


            else
            {
                output = this.state.ControllerUnitContainerState
            }
          
            this.setState({
                tabDragging: {
                    status:false,
                    targetUnitID:0,
                    unitID:0,
                    oldConID:0,
                    newConID:0,
                    oldSequenceNumber:-1,
                    newSequenceNumber:-1,
                },
                needMousePos:false,
                shadowContainer:{},
                mousePos:{
                    x:0,
                    y:0
                },
                ControllerUnitContainerState:output
            })
            
            if(leftShowingUnitID == 2)
            {
                this.props.frontViewSizeChange(msg.divSize)
            }
            else if(leftShowingUnitID == 3)
            {
                this.props.sideViewSizeChange(msg.divSize)
            }

        }
    }

    tabNewConID = (msg) =>{
        //console.log('ControllerUnitLayout tabNewConID')
        //console.log(this.state.tabDragging.newSequenceNumber)
        let tempNewSeqNum = -1
        let tempNewConID = 0
        if(msg.enterHeader)
        {
            tempNewSeqNum = -1
            tempNewConID = msg.newConID
        }
        else
        {
            tempNewSeqNum = this.state.tabDragging.oldSequenceNumber
            tempNewConID = this.state.tabDragging.oldConID
        }

        this.setState({
            tabDragging: {
                status:true,
                targetUnitID:0,
                unitID:this.state.tabDragging.unitID,
                oldConID:this.state.tabDragging.oldConID,
                newConID:tempNewConID,
                oldSequenceNumber:this.state.tabDragging.oldSequenceNumber,
                newSequenceNumber:tempNewSeqNum,
            }
        }, ()=>{
            //console.log('ControllerUnitLayout tabNewConID setState Finished')
        })
    }

    getTabNewSequenceNumber=(msg)=>{
        //console.log('ControllerUnitLayout getTabNewSequenceNumber')
        //console.log(msg.newSequenceNumber)
        if(msg.tabChangeSequence)
        {
            this.setState({
                tabDragging: {
                    status:true,
                    targetUnitID:msg.unitID,
                    unitID:this.state.tabDragging.unitID,
                    oldConID:this.state.tabDragging.oldConID,
                    newConID:msg.newConID,
                    oldSequenceNumber:this.state.tabDragging.oldSequenceNumber,
                    newSequenceNumber:msg.newSequenceNumber,
                }
                },()=>{
            //console.log('ControllerUnitLayout getTabNewSequenceNumber setState Finished')
            })
        //console.log(this.state.tabDragging.newSequenceNumber)
        }
        else
        {
            if(msg.unitID===this.state.tabDragging.targetUnitID)
            {
                this.setState({
                    tabDragging: {
                        status:true,
                        targetUnitID:0,
                        unitID:this.state.tabDragging.unitID,
                        oldConID:this.state.tabDragging.oldConID,
                        newConID:this.state.tabDragging.oldConID,
                        //newConID:msg.newConID,
                        oldSequenceNumber:this.state.tabDragging.oldSequenceNumber,
                        newSequenceNumber:this.state.tabDragging.oldSequenceNumber
                        //newSequenceNumber:-1,
                    }
                    },()=>{
                //console.log('ControllerUnitLayout getTabNewSequenceNumber setState Finished')
                })
            }
        }
    }

    sendRotationValueBack=(value)=>{
        this.props.rotationValue(value)
    }

    sendFrontViewToggle=(refDom)=>{

        this.props.frontView(refDom)
    }

    sendSideViewToggle=(refDom)=>{

        this.props.sideView(refDom)
    }

    controllerUnitToggle=(e)=>{
        if(e.showing===false)
        {
            let containerStateToken =[]
            this.state.ControllerUnitContainerState.map(containerState=>{
                let stateObj = containerState
                if(stateObj.containerID===e.conID)
                {
                    stateObj.showing = false
                }
                containerStateToken.push(stateObj)
            })
            this.setState({
                ControllerUnitContainerState:containerStateToken
            })
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    getContainerNewSize = (msg) => {
        if(this.state.containerExtending.status)
        {
           switch(this.state.containerExtending.subView){
                case 'frontView':
                    this.props.frontViewSizeChange(msg)
                break;
                case 'sideView':
                    this.props.sideViewSizeChange(msg)
                break;
                case 'nonSubView':
                break;
           }
        }
        else
        {
        }
    }

    onContainerExtending = (msg)=>{
        //console.log('ControllerUnitLayout onContainerExtending')
        let conIDToken = 0 
        if(msg.containerExtending)
        {
            conIDToken = msg.conID
            this.setState({
                containerExtending:{
                    status:msg.containerExtending,
                    conID:conIDToken,
                    subView:msg.subView
                },
                needMousePos:true,
                ControllerUnitContainerState:this.setNewContainerZIndex(msg)
                //refPos:msg.refPos
            })
        }
        else
        {
            this.setState({
                containerExtending:{
                    status:false,
                    conID:conIDToken,
                    subView:'nonSubView'
                },
                needMousePos:false,
                mousePos:{
                    x:0,
                    y:0
                },
                ControllerUnitContainerState:this.setNewContainerZIndex(msg)
                //refPos:msg.refPos
            })
        }
        
        //this.setNewContainerZIndex(msg)

    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    setNewContainerZIndex = (msg) =>{
        let containerStateToken =[]
        let arrayToken = this.state.ControllerUnitContainerState
        let stateLength = arrayToken.length
        this.state.ControllerUnitContainerState.map(containerState=>{
            let stateObj = {...containerState}
            if(stateObj.containerID===msg.conID)
            {
                stateObj.zIndex = stateLength
                stateObj.showingUnitID = msg.unitID
            }
            else
            {
                if(stateObj.zIndex > msg.zIndex)
                {
                    stateObj.zIndex = stateObj.zIndex -1
                }
            }
            containerStateToken.push(stateObj)
        })
        return containerStateToken
    }

    onContainerDragging = (msg) => {
        //console.log('ControllerUnitLayout onContainerDragging')
        //console.log('conID : ',msg.conID, 'booling : ',msg.containerDragging)
        //console.log(msg.position)
        let conIDToken = 0 
        if(msg.containerDragging)
        {
            //console.log('onContainerDragging true')
            conIDToken = msg.conID
            this.setState({
                containerDragging:{
                    status:msg.containerDragging,
                    conID:conIDToken
                },
                needMousePos:true,
                ControllerUnitContainerState:this.setNewContainerZIndex(msg)
            })
        }
        else
        {
            //console.log('onContainerDragging false')
            let temp = this.state.ControllerUnitContainerState
            let output = temp.map((containerState)=>{
                let stateObj={}
                if(containerState.containerID===msg.conID)
                {
                    stateObj = {
                        containerID:containerState.containerID,
                        size:containerState.size,
                        position:msg.position,
                        zIndex:containerState.zIndex,
                        showing:containerState.showing,
                        showingUnitID:containerState.showingUnitID,
                        controllerUnitList: containerState.controllerUnitList
                    }
                    return stateObj
                }
                else
                {
                    return containerState
                }
            })

            //console.log('containerStateArray :')
            //console.log(output)

            this.setState({
                containerDragging:{
                    status:false,
                    conID:conIDToken
                },
                needMousePos:false,
                mousePos:{
                    x:0,
                    y:0
                },
                ControllerUnitContainerState:output
            })
        }
    }

    unmountTest=(e)=>{
        //console.log('ControllerUnitLayout unmountTest :',e)
        // this.setState({
        //     unmountTest:e
        // })
    }

    createControllerUnitContainer = () => {
        //console.log('ControllerUnitLayout createControllerUnitContainer')
        return (
            this.state.ControllerUnitContainerState.map(container=> container.showing?
                (<ControllerUnitContainer key={container.containerID} conID={container.containerID} initialPos={container.position} mousePos={this.state.mousePos} offset={this.props.offset} size={container.size}
                controllerUnitList={container.controllerUnitList} showingUnitID={container.showingUnitID} containerDragging={this.onContainerDragging} anyContainerDragging={this.state.containerDragging.status} anyContainerExtending={this.state.containerExtending.status} rotationValue={this.sendRotationValueBack} frontViewToggle={this.sendFrontViewToggle} sideViewToggle={this.sendSideViewToggle} containerExtending={this.onContainerExtending} getContainerNewSize={this.getContainerNewSize} onTabDragging={this.onTabDragging} tabDraggingBooling={this.state.tabDragging.status} getTabNewSequenceNumber={this.getTabNewSequenceNumber} tabNewConID={this.tabNewConID} containerShowing={this.controllerUnitToggle} zIndex={container.zIndex} unmountTest={this.unmountTest}/>):null
            )
        )
    }

    onMouseDown = (e) => {
        //console.log('ControllerUnitLayout onMouseDown')
        // this.setState({
        //     ThreeDLayerClick:false,
        // })
    }

    onMouseMove = (e) => {
        //console.log('ControllerUnitLayout onMouseMove')
        if(this.state.needMousePos)
        {
            this.setState({
              mousePos:{
                x:e.clientX-this.props.offset.x,
                y:e.clientY-this.props.offset.y
              }
            })    
        }    
    }

    // onMouseUp = () => {
    //     console.log('ControllerUnitLayout tabDragging complete !!')
    //     this.setState({
    //         needMousePos:false,
    //         tabDragging:{
    //             status:false,
    //             unitID:0,
    //             oldConID:0,
    //             newConID:0,
    //             oldSequenceNumber:0,
    //             newSequenceNumber:0,
    //         },
    //         mousePos:{
    //             x:0,
    //             y:0
    //         },
    //         shadowContainer:{}
    //     })
    // }
    
    changeCursorWhenTabDragging=()=>{
        let cursor = 'default'
        if(this.state.tabDragging.status)
        {
            cursor = 'grabbing'
        }
        return cursor
    }

    onDragEnter=(e)=>{
        e.stopPropagation()
        e.preventDefault()
        console.log('layer drag enter')
        
        if(this.state.tabDragging.status)
        {
            
            let newState = {
                status:true,
                targetUnitID:this.state.tabDragging.targetUnitID,
                unitID:this.state.tabDragging.unitID,
                oldConID:this.state.tabDragging.oldConID,
                newConID:0,
                oldSequenceNumber:this.state.tabDragging.oldSequenceNumber,
                newSequenceNumber:this.state.tabDragging.newSequenceNumber,
            }

            this.setState({
                tabDragging:newState
            })
        }
    }

    onDragLeave=(e)=>{
        e.stopPropagation()
        e.preventDefault()
        console.log('layer drag leave')
       
        if(this.state.tabDragging.status)
        {
            
            let newState = {
                status:true,
                targetUnitID:this.state.tabDragging.targetUnitID,
                unitID:this.state.tabDragging.unitID,
                oldConID:this.state.tabDragging.oldConID,
                newConID:this.state.tabDragging.newConID,
                oldSequenceNumber:this.state.tabDragging.oldSequenceNumber,
                newSequenceNumber:this.state.tabDragging.newSequenceNumber,
            }

            this.setState({
                tabDragging:newState
            })
        }
    }

    onDragOver=(e)=>{
        e.preventDefault()
        if(this.state.needMousePos)
        {
            this.setState({
              mousePos:{
                x:e.clientX-this.props.offset.x,
                y:e.clientY-this.props.offset.y
              }
            })    
        }   
        
    }

    onDrop=()=>{

    }

    render(){
        //console.log('ControllerUnitLayout render ')
        const containerStyle = {
            width: '100%',
            height: '100%',
            position:'absolute',
            top:'0px',
            left:'0px',
            cursor:this.changeCursorWhenTabDragging()
        }

        return(
            <div style={containerStyle}  ref={(refLayout)=>{this.refLayout=refLayout}} onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp} onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave} onDragOver={this.onDragOver} onDrop={this.onDrop}> 
                {this.createControllerUnitContainer()}
                {/** <TestContainer mousePos={this.state.mousePos}/> **/}
                {this.appendShadowContainer()}
            </div>
        )
    }
}

export default ControllerUnitLayout