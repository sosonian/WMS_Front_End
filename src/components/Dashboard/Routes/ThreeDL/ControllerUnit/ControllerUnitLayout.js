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
                    containerUnitContainerID:1,
                    showing:true
                },
                {
                    unitID:2,
                    containerUnitContainerID:2,
                    showing:true
                },
                {
                    unitID:3,
                    containerUnitContainerID:3,
                    showing:true
                },
                {
                    unitID:4,
                    containerUnitContainerID:3,
                    showing:false
                },

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
            tabDragging:false,
            
            containerDragging:{
                status:false,
                conID:0
            },
            containerExtending:{
                status:false,
                conID:0,
                subView:'nonSubView'
            },
            shadowContainer:{}
        }
    }

    ////////////need to improve avoid no necessary re-render

    //shouldComponentUpdate(nextProps, nextState){
    //    
    //}

    componentDidUpdate(prevProps, prevState){
        //console.log('ControllerUnitLayout componentDidUpdate')
        // if(this.state.containerDragging.status)
        // {
        //     if(prevProps.mousePos !== this.props.mousePos)
        //     {
        //         let tempContainerState = this.state. ControllerUnitContainerState
        //         let output = tempContainerState.map(containerState=>{
        //            if(containerState.controllerUnitContainerID==this.state.containerDragging.conID)
        //            {
        //             let containerStateObj = {
        //                 controllerUnitContainerID:containerState.controllerUnitContainerID,
        //                 size:containerState.size,
        //                 position:{
        //                     x:this.props.mousePos.x-this.state.refPos.x,
        //                     y:this.props.mousePos.y-this.state.refPos.y,
        //                 },
        //                 zIndex:containerState.zIndex, 
        //                 showing:containerState.showing
        //             }
        //             return containerStateObj
        //            }
        //            else
        //            {
        //                return containerState
        //            }
        //         })
        //         this.setState({
        //             ControllerUnitContainerState : output
        //         })
        //     }
        // }
    }

    appendShadowContainer=()=>{
        if(this.state.tabDragging)
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
          this.setState({
            tabDragging:true,
            needMousePos:true,
            shadowContainer:msg
          })
        }
        else
        {
          this.setState({
            tabDragging:false,
            needMousePos:false,
            shadowContainer:{},
            mousePos:{
                x:0,
                y:0
            }
          })
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


    getContainerZIndexUpdate = (msg) => {
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
        this.setState({
            ControllerUnitContainerState:containerStateToken
        })
    }

    onContainerExtending = (msg)=>{
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
                needMousePos:true
                //refPos:msg.refPos
            })
        }
        else
        {
            this.setState({
                containerExtending:{
                    status:false,
                    conID:conIDToken,
                    subView:msg.subView
                },
                needMousePos:false,
                mousePos:{
                    x:0,
                    y:0
                }
                //refPos:msg.refPos
            })
        }
        
        this.getContainerZIndexUpdate(msg)

    }

    onContainerDragging = (msg) => {
        let conIDToken = 0 
        if(msg.containerDragging)
        {
            conIDToken = msg.conID
            this.setState({
                containerDragging:{
                    status:msg.containerDragging,
                    conID:conIDToken
                },
                needMousePos:true
                //refPos:msg.refPos
            })
        }
        else
        {
            this.setState({
                containerDragging:{
                    status:false,
                    conID:conIDToken
                },
                needMousePos:false,
                mousePos:{
                    x:0,
                    y:0
                }
                //refPos:msg.refPos
            })
        }
        
        this.getContainerZIndexUpdate(msg)
        //this.props.needMousePos(msg.containerDragging)
    }

    createControllerUnitContainer = () => {
        //console.log('ControllerUnitLayout createControllerUnitContainer')
        return (
            this.state.ControllerUnitContainerState.map(container=> container.showing?
                (<ControllerUnitContainer key={container.controllerUnitContainerID} conID={container.controllerUnitContainerID} initialPos={container.position} mousePos={this.state.mousePos} offset={this.props.offset}
                controllerUnitStateProps={this.state.controllerUnitState} containerDragging={this.onContainerDragging} anyOtherDragging={this.state.containerDragging.status} anyOtherExtending={this.state.containerExtending.status} rotationValue={this.sendRotationValueBack} frontViewToggle={this.sendFrontViewToggle} sideViewToggle={this.sendSideViewToggle} containerExtending={this.onContainerExtending} getContainerNewSize={this.getContainerNewSize} onTabDragging={this.onTabDragging} tabDraggingBooling={this.state.tabDragging} containerShowing={this.controllerUnitToggle} zIndex={container.zIndex} getContainerZIndexUpdate={this.getContainerZIndexUpdate}/>):null
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

    onMouseUp = () => {
        //console.log('ControllerUnitLayout tabDragging complete !!')
        this.setState({
            needMousePos:false,
            tabDragging:false,
            mousePos:{
                x:0,
                y:0
            },
            shadowContainer:{}
        })
    }
    
    changeCursorWhenTabDragging=()=>{
        let cursor = 'default'
        if(this.state.tabDragging)
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