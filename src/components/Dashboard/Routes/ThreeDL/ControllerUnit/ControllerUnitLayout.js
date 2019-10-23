import React, { Component } from 'react';
import ControllerUnitContainer from './ControllerUnitContainer'


class ControllerUnitLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            controllerUnitState:[
                {
                    name:'datGui',
                    ContainerUnitContainerID:1,
                    tabSequence:1,
                },
                {
                    name:'subViewFrom',
                    ContainerUnitContainerID:2,
                    tabSequence:1,
                }
            ],
        }
    }

    createControllerUnitContainer = () => {
        console.log('ControllerUnitLayout createControllerUnitContainer : ')
        console.log(this.state.controllerUnitState)
        return (
            this.state.controllerUnitState.map(unit=>
                <ControllerUnitContainer PosX={this.props.PosX} PosY={this.props.PosY} />  
            )
        )
    }



    render(){
        console.log('ControllerUnitLayout render :')
        const containerStyle = {
            width: '100%',
            height: '100%',
            position:'absolute',
            top:'0px',
            left:'0px'
        }

        return(
            <div style={containerStyle}> 
                {this.createControllerUnitContainer()}
            </div>
        )
    }
}

export default ControllerUnitLayout