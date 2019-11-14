import React, { Component } from 'react';
import ControllerUnitContainer from './ControllerUnitContainer'
import ShadowContainer from './ShadowContainer'
import TestContainer from './TestContainer'
import LinkedList from '../../../../CommonUtilities/LinkedList'


class ControllerUnitLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            controllerUnitState:[
                {
                    unitID:1,
                    name:'DatGui',
                    title:'旋轉控制',
                    containerUnitContainerID:1,
                    sequenceNumber:1,
                    showing:true
                },
                {
                    unitID:2,
                    name:'SubViewFront',
                    title:'前視圖',
                    sequenceNumber:1,
                    containerUnitContainerID:2,
                    showing:true
                },
                {
                    unitID:3,
                    name:'SubViewFront',
                    title:'側視圖',
                    sequenceNumber:1,
                    containerUnitContainerID:3,
                    showing:true
                },
                {
                    unitID:4,
                    name:'TestUnit',
                    title:'測試控制',
                    sequenceNumber:1,
                    containerUnitContainerID:3,
                    showing:false
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
                unitID:0,
                oldConID:0,
                newConID:0,
                oldSequenceNumber:0,
                newSequenceNumber:0,
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
        let newContainerState= this.loadUnitStateToContainer(this.createContainerState())
        this.setContainerState(newContainerState)
    }

    componentDidUpdate(prevProps, prevState){
        //console.log('ControllerUnitLayout componentDidUpdate')
    }

    componentWillUnmount() {
        //console.log('ControllerUnitLayout componentWillUnmount : ', this.state.unmountTest)
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
            let newSequenceNumber = 0 
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
            let tempControllerUnitState = this.state.controllerUnitState
            
            let output = tempControllerUnitState.map((unitState=>{  
                let unitStateObj ={} 
                if(unitState.containerUnitContainerID === msg.conID)
                {
                    if(unitState.unitID === msg.unitID)
                    {
                        unitStateObj = {
                            containerUnitContainerID:unitState.containerUnitContainerID,
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
                            containerUnitContainerID:unitState.containerUnitContainerID,
                            unitID:unitState.unitID,
                            name:unitState.name,
                            title:unitState.title,
                            sequenceNumber:unitState.sequenceNumber,
                            showing:false   
                        }
                        return unitStateObj
                    }
                }
                else
                {
                    return unitState
                }
                
            }))

            this.setState({
                tabDragging:
                {
                    status:true,
                    unitID:msg.unitID,
                    oldConID:msg.conID,
                    newConID:msg.conID,
                    oldSequenceNumber:msg.sequenceNumber,
                    newSequenceNumber:0,
                },
                needMousePos:true,
                shadowContainer:msg,
                controllerUnitState:output,
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
            let tempControllerUnitState = this.state.controllerUnitState
            let stateLength = tempControllerUnitState.length
            let tempNewSequenceNumber = 0
            if(this.state.tabDragging.newSequenceNumber==0)
            {
                tempNewSequenceNumber=stateLength
            }
            else
            {
                tempNewSequenceNumber=this.state.tabDragging.newSequenceNumber
            }
            console.log('tempNewSequenceNumber : ',tempNewSequenceNumber)
            // this.state.tabDragging.newSequenceNumber==0?tempNewSequenceNumber=stateLength:tempNewSequenceNumber=this.state.tabDragging.newSequenceNumber
            let finalState=[]

            if((this.state.tabDragging.oldConID !== this.state.tabDragging.newConID)&&(this.state.tabDragging.newConID !==0))
            {
                let output = tempControllerUnitState.map((unitState=>{  
                    let unitStateObj ={} 
                    if(unitState.unitID===this.state.tabDragging.unitID)
                    {
                        unitStateObj = {
                            containerUnitContainerID:this.state.tabDragging.newConID,
                            unitID:unitState.unitID,
                            name:unitState.name,
                            title:unitState.title,
                            sequenceNumber:tempNewSequenceNumber,
                            showing:true    
                        }
                        return unitStateObj
                    }
                    else
                    {
                        if(unitState.containerUnitContainerID === this.state.tabDragging.newConID)
                        {
                            if(unitState.sequenceNumber>tempNewSequenceNumber)
                            {
                                unitStateObj = {
                                    containerUnitContainerID:unitState.containerUnitContainerID,
                                    unitID:unitState.unitID,
                                    name:unitState.name,
                                    title:unitState.title,
                                    sequenceNumber:unitState.sequenceNumber,
                                    showing:false   
                                }
                                return unitStateObj
                            }
                            else
                            {
                                unitStateObj = {
                                    containerUnitContainerID:unitState.containerUnitContainerID,
                                    unitID:unitState.unitID,
                                    name:unitState.name,
                                    title:unitState.title,
                                    sequenceNumber:unitState.sequenceNumber-1,
                                    showing:false   
                                }
                                return unitStateObj
                            }
                        }
                        else if(unitState.containerUnitContainerID === this.state.tabDragging.oldConID)
                        {
                            if(unitState.sequenceNumber>this.state.tabDragging.oldSequenceNumber)
                            {
                                return unitState
                            }
                            else if(unitState.sequenceNumber == this.state.tabDragging.oldSequenceNumber-1)
                            {
                                unitStateObj = {
                                    containerUnitContainerID:unitState.containerUnitContainerID,
                                    unitID:unitState.unitID,
                                    name:unitState.name,
                                    title:unitState.title,
                                    sequenceNumber:unitState.sequenceNumber+1,
                                    showing:true 
                                }
                                return unitStateObj
                            }
                            else
                            {
                                unitStateObj = {
                                    containerUnitContainerID:unitState.containerUnitContainerID,
                                    unitID:unitState.unitID,
                                    name:unitState.name,
                                    title:unitState.title,
                                    sequenceNumber:unitState.sequenceNumber+1,
                                    showing:false 
                                }
                                return unitStateObj
                            }
                        }
                        else
                        {
                            return unitState
                        }
                    }
                }))

                finalState= output
            }
            else if(this.state.tabDragging.oldConID == this.state.tabDragging.newConID)
            {
                let output = tempControllerUnitState.map((unitState=>{  
                    let unitStateObj ={} 
                    if(unitState.unitID===this.state.tabDragging.unitID)
                    {
                        unitStateObj = {
                            containerUnitContainerID:this.state.tabDragging.newConID,
                            unitID:unitState.unitID,
                            name:unitState.name,
                            title:unitState.title,
                            sequenceNumber:tempNewSequenceNumber,
                            showing:true    
                        }
                        return unitStateObj
                    }
                    else
                    {
                        if(unitState.containerUnitContainerID === this.state.tabDragging.oldConID)
                        {
                            if(unitState.sequenceNumber>tempNewSequenceNumber)
                            {
                                return unitState
                            }
                            else
                            {
                                unitStateObj = {
                                    containerUnitContainerID:unitState.containerUnitContainerID,
                                    unitID:unitState.unitID,
                                    name:unitState.name,
                                    title:unitState.title,
                                    sequenceNumber:unitState.sequenceNumber-1,
                                    showing:false   
                                }
                                return unitStateObj
                            }
                        }
                        else
                        {
                            return unitState
                        }
                    }
                }))
                finalState= output
            }
            else if(this.state.tabDragging.newConID ==0)
            {
                let tempContainer = this.state.ControllerUnitContainerState.find((container)=>{
                    return container.showing == false
                })

                let tempNewConID = tempContainer.containerID

                if(tempNewConID==undefined)
                {
                    finalState = this.state.controllerUnitState
                }
                else
                {
                    let output = tempControllerUnitState.map((unitState=>{  
                        let unitStateObj ={} 
                        if(unitState.unitID===this.state.tabDragging.unitID)
                        {
                            unitStateObj = {
                                containerUnitContainerID:tempNewConID,
                                unitID:unitState.unitID,
                                name:unitState.name,
                                title:unitState.title,
                                sequenceNumber:stateLength,
                                showing:true    
                            }
                            return unitStateObj
                        }
                        else
                        {
                            if(unitState.containerUnitContainerID === this.state.tabDragging.oldConID)
                            {
                                if(unitState.sequenceNumber>tempNewSequenceNumber)
                                {
                                    return unitState
                                }
                                else if(unitState.sequenceNumber == this.state.tabDragging.oldSequenceNumber-1)
                                {
                                    unitStateObj = {
                                        containerUnitContainerID:unitState.containerUnitContainerID,
                                        unitID:unitState.unitID,
                                        name:unitState.name,
                                        title:unitState.title,
                                        sequenceNumber:unitState.sequenceNumber+1,
                                        showing:true 
                                    }
                                    return unitStateObj
                                }
                                else
                                {
                                    unitStateObj = {
                                        containerUnitContainerID:unitState.containerUnitContainerID,
                                        unitID:unitState.unitID,
                                        name:unitState.name,
                                        title:unitState.title,
                                        sequenceNumber:unitState.sequenceNumber+1,
                                        showing:false   
                                    }
                                    return unitStateObj
                                }
                            }
                            else
                            {
                                return unitState
                            }
                        }
                    }))
                    finalState= output
                }
            }

            console.log('fianlState')
            console.log(finalState)

           
  ///////////////////////////////////////////////////////////////////////////////////          
            this.setState({
                tabDragging: {
                    status:false,
                    unitID:0,
                    oldConID:0,
                    newConID:0,
                    oldSequenceNumber:0,
                    newSequenceNumber:0,
                },
                needMousePos:false,
                shadowContainer:{},
                mousePos:{
                    x:0,
                    y:0
                },
                controllerUnitState:finalState
            })
        }
    }

    tabNewConID = (msg) =>{
        //console.log('ControllerUnitLayout tabNewConID')
        //console.log(this.state.tabDragging.newSequenceNumber)
        this.setState({
            tabDragging: {
                status:true,
                unitID:this.state.tabDragging.unitID,
                oldConID:this.state.tabDragging.oldConID,
                newConID:msg.newConID,
                oldSequenceNumber:this.state.tabDragging.oldSequenceNumber,
                newSequenceNumber:this.state.tabDragging.newSequenceNumber,
            }
        }, ()=>{
            //console.log('ControllerUnitLayout tabNewConID setState Finished')
        })
    }

    getTabNewSequenceNumber=(msg)=>{
        //console.log('ControllerUnitLayout getTabNewSequenceNumber')
        //console.log(msg.newSequenceNumber)
        this.setState({
            tabDragging: {
                status:true,
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

        // if(msg.conID ==2)
        // {
        //     this.props.frontViewSizeChange(msg)
        //     //console.log('ControllerUnitLayout getContainerNewSize')
        //     //console.log('width : '+msg.width)
        //     //console.log('height : '+msg.height)
        // }
        // else if(msg.conID ==3)
        // {
        //     this.props.sideViewSizeChange(msg)
        // }
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

    setNewContainerZIndex = (msg) =>{
        let containerStateToken =[]
        let arrayToken = this.state.ControllerUnitContainerState
        let stateLength = arrayToken.length
        this.state.ControllerUnitContainerState.map(containerState=>{
            let stateObj = containerState
            if(stateObj.containerID===msg.conID)
            {
                stateObj.zIndex = stateLength
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
        // this.setState({
        //     ControllerUnitContainerState:containerStateToken
        // })
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
                        showing:containerState.showing
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
                (<ControllerUnitContainer key={container.containerID} conID={container.containerID} initialPos={container.position} mousePos={this.state.mousePos} offset={this.props.offset}
                controllerUnitList={container.controllerUnitList} containerDragging={this.onContainerDragging} anyContainerDragging={this.state.containerDragging.status} anyContainerExtending={this.state.containerExtending.status} rotationValue={this.sendRotationValueBack} frontViewToggle={this.sendFrontViewToggle} sideViewToggle={this.sendSideViewToggle} containerExtending={this.onContainerExtending} getContainerNewSize={this.getContainerNewSize} onTabDragging={this.onTabDragging} tabDraggingBooling={this.state.tabDragging.status} getTabNewSequenceNumber={this.getTabNewSequenceNumber} tabNewConID={this.tabNewConID} containerShowing={this.controllerUnitToggle} zIndex={container.zIndex} unmountTest={this.unmountTest}/>):null
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
            <div style={containerStyle}  ref={(refLayout)=>{this.refLayout=refLayout}} onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}> 
                {this.createControllerUnitContainer()}
                {/** <TestContainer mousePos={this.state.mousePos}/> **/}
                {this.appendShadowContainer()}
            </div>
        )
    }
}

export default ControllerUnitLayout