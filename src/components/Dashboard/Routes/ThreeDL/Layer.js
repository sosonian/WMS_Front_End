import React, {Component} from 'react';
import ThreeDLayer from './ThreeDLayer';
import GridLayout from 'react-grid-layout';
import ThreeDGridItem from './ThreeDGridItem';
import TestComponent1 from './TestComponent1';
import 'react-grid-layout/css/styles.css';
  

class Layer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      changeCount : 0,
      static : false,
      layoutc:[
         {i: 'a', x: 0, y: 0, w: 1, h: 7},
         {i: 'b', x: 1, y: 0, w: 5, h: 7},
         {i: 'c', x: 0, y: 6, w: 6, h: 1}
      ]
    }
    this.refGridLayout = React.createRef()
  }
  
  onResize = () => {
    this.tempCount = this.state.changeCount +1
    this.setState({changeCount:this.tempCount})
    //console.log('size changed!')
    //console.log('change count :'+this.state.changeCount)
  }

  componentWillUnmount(){
    console.log('Layer would nmount in seconds!!')
  }

  threeDLayerFixStart = (e) => {
    console.log('key down')
    if(e.key === 'c')
    {
      console.log('c is pressed')
      this.setState({static: true})
      let newLayouts5 = this.refGridLayout.current.state.layout
      newLayouts5[1].static = true
      this.refGridLayout.current.setState({layout:newLayouts5})
      //setTimeout(()=>console.log('static when key pressed : '+this.state.layoutc[1].static),3000)
    }
    else if(e.key === 'r')
    {
      console.log('r is pressed')
      this.setState({static: false})
      let newLayouts5 = this.refGridLayout.current.state.layout
      newLayouts5[1].static = false
      this.refGridLayout.current.setState({layout:newLayouts5})
      //setTimeout(()=>console.log('static when key pressed : '+this.state.layoutc[1].static),3000)
    }
  }

   threeDLayerResize = () => {
      this.tempCount = this.state.changeCount +1
      this.setState({changeCount:this.tempCount})
      console.log('start dragging!')
    }

  render() {
    let changeStyle
    if(this.state.static)
    {
      changeStyle = {
        borderStyle:'solid',
        borderColor:'red'
      }
    }
    else
    {
      changeStyle = {
        borderStyle:'solid',
        borderColor:'black'
      }
    }
    const myStyle1 = {
      borderStyle:'solid',
    }
    const myStyle2 = {
      width: '100%',
      height: '100%',
    }

  return (
    <GridLayout className="layout" layout={this.state.layoutc} cols={12} rowHeight={45} width={2000} ref={this.refGridLayout} onResizeStart = {this.threeDLayerResizeStart} onResize = {this.threeDLayerResize} onResizeStop = {this.threeDLayerResize}>
      <div style={myStyle1} key="a" >
          <TestComponent1/>
      </div>
      <div style={changeStyle} key="b" >
      <div style={myStyle2} onKeyDown={this.threeDLayerFixStart} onKeyUp={this.threeDLayerFixEnd} tabIndex='0'>
        <ThreeDLayer testProp={this.state.changeCount}/>
      </div>
      </div>
      <div style={myStyle1} key="c" >c</div>
    </GridLayout>
  )
}
}

export default Layer;