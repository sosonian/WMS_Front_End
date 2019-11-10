import React, { Component } from 'react';
import ControllerUnitContainer from './ControllerUnitContainer'
import ShadowContainer from './ShadowContainer'
import TestContainer from './TestContainer'


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
                    sequenceNumber:4,
                    showing:true
                },
                {
                    unitID:2,
                    name:'SubViewFront',
                    title:'前視圖',
                    sequenceNumber:4,
                    containerUnitContainerID:2,
                    showing:true
                },
                {
                    unitID:3,
                    name:'SubViewFront',
                    title:'側視圖',
                    sequenceNumber:3,
                    containerUnitContainerID:3,
                    showing:true
                },
                {
                    unitID:4,
                    name:'TestUnit',
                    title:'測試控制',
                    sequenceNumber:4,
                    containerUnitContainerID:3,
                    showing:false
                }
            ],

            ControllerUnitContainerState:[
                {
                    controllerUnitContainerID:1,
                    size:
                    {
                        width:200,
                        height:200
                    },
                    position:{
                        x:0,
                        y:0
                    },
                    zIndex:1,
                    showing:true,
                },
                {
                    controllerUnitContainerID:2,
                    size:
                    {
                        width:200,
                        height:200
                    },
                    position:{
                        x:0,
                        y:200
                    },
                    zIndex:2,
                    showing:true,
                },
                {
                    controllerUnitContainerID:3,
                    size:
                    {
                        width:200,
                        height:200
                    },
                    position:{
                        x:0,
                        y:400
                    },
                    zIndex:3,
                    showing:true,
                },
                {
                    controllerUnitContainerID:4,
                    size:
                    {
                        width:200,
                        height:200
                    },
                    position:{
                        x:300,
                        y:0
                    },
                    zIndex:4,
                    showing:false,
                }
            ],

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
                // let tempControllerUnitState = this.state.controllerUnitState
                // let stateLength = tempControllerUnitState.length
                // let tempNewSequenceNumber = this.state.tabDragging.newSequenceNumber==0?
                // tempNewSequenceNumber=stateLength:tempNewSequenceNumber=this.state.tabDragging.newSequenceNumber

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

                let tempNewConID = tempContainer.controllerUnitContainerID

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
                if(stateObj.controllerUnitContainerID===e.conID)
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
            if(stateObj.controllerUnitContainerID===msg.conID)
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
                if(containerState.controllerUnitContainerID===msg.conID)
                {
                    stateObj = {
                        controllerUnitContainerID:containerState.controllerUnitContainerID,
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
                (<ControllerUnitContainer key={container.controllerUnitContainerID} conID={container.controllerUnitContainerID} initialPos={container.position} mousePos={this.state.mousePos} offset={this.props.offset}
                controllerUnitStateProps={this.state.controllerUnitState} containerDragging={this.onContainerDragging} anyContainerDragging={this.state.containerDragging.status} anyContainerExtending={this.state.containerExtending.status} rotationValue={this.sendRotationValueBack} frontViewToggle={this.sendFrontViewToggle} sideViewToggle={this.sendSideViewToggle} containerExtending={this.onContainerExtending} getContainerNewSize={this.getContainerNewSize} onTabDragging={this.onTabDragging} tabDraggingBooling={this.state.tabDragging.status} getTabNewSequenceNumber={this.getTabNewSequenceNumber} tabNewConID={this.tabNewConID} containerShowing={this.controllerUnitToggle} zIndex={container.zIndex} unmountTest={this.unmountTest}/>):null
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