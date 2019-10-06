import React, {Component} from 'react';
import ThreeDLayer from './ThreeDLayer';
import GridLayout from 'react-grid-layout';
import ThreeDGridItem from './ThreeDGridItem';
import 'react-grid-layout/css/styles.css';
  

class Layer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      changeCount : 0,
      static : false,
      // layout:[
      //   {i: 'a', x: 0, y: 0, w: 1, h: 7},
      //   {i: 'b', x: 1, y: 0, w: 5, h: 7, static: false},
      //   {i: 'c', x: 0, y: 6, w: 6, h: 1}
      // ]
    }
  }
  
  onResize = () => {
    this.tempCount = this.state.changeCount +1
    this.setState({changeCount:this.tempCount})
    //console.log('size changed!')
    //console.log('change count :'+this.state.changeCount)
  }

  threeDLayerFixStart = (e) => {
    console.log('key down')
    if(e.key == 'c')
    {
      console.log('c is pressed')
      //let newLayouts1 = this.state.layout
      //newLayouts1[1].static = true
      //this.setState({static:true, layout: newLayouts1})
      //console.log('static when key pressed : '+this.state.layout[1].static)
      this.setState({static:true})
      console.log(this.state.static)
    }
    else if(e.key == 'r')
    {
      console.log('r is pressed')
      // let newLayouts1 = this.state.layout
      // newLayouts1[1].static = false
      // this.setState({static:false, layout: newLayouts1})
      //console.log('static when key pressed : '+this.state.layout[1].static)
      this.setState({static:false})
      console.log(this.state.static)
    }
  }
  
  threeDLayerFixEnd = (e) => {
    // if(e.key == 'c')
    // {
    //   console.log('c is pressed')
    //   let newLayouts2 = this.state.layout
    //   newLayouts2[1].static = false
    //   this.setState({static:false, layout: newLayouts2})
    //   console.log('static when key pressed : '+this.state.layout[1].static)
    // }  
  }



  // threeDLayerDragStart = (e) => {
  //   this.tempCount = this.state.changeCount +1
  //   this.setState({changeCount:this.tempCount})
  //   console.log('mouse down!')
  //   //console.log('altKey boolean : '+e.altKey)
  //   if(e.altKey == true){
  //     console.log('start dragging!')
  //     this.setState({static : true})
  //     let newLayouts1 = this.state.layout
  //     newLayouts1[1].static = true
  //     this.setState({layout: newLayouts1})
  //     console.log('static : '+this.state.layout[1].static)
  //   }
  // }
  // // threeDLayerDrag = () => {
  // //   console.log('mouse move!')
  // // }

  // threeDLayerDragStop = () => {
  //   this.tempCount = this.state.changeCount +1
  //   this.setState({changeCount:this.tempCount})
  //   console.log('drag complete!')
  //   this.setState({static : false})
  //   let newLayouts3 = this.state.layout
  //   newLayouts3[1].static = false
  //   this.setState({layout: newLayouts3})
  // }

  handleLayoutChange = (layouts) => {
    let newLayouts2 = layouts
    if(this.state.static)
    {
      newLayouts2[1].static = true
      this.setState({layout: newLayouts2})
    }
    else
    {
      newLayouts2[1].static = false
      this.setState({layout: newLayouts2})
    }
    console.log('change layer static : '+this.state.layout[1].static)
  }

  render() {
    const myStyle1 = {
      borderStyle:'solid',
    }
    const myStyle2 = {
      width: '100%',
      height: '100%',
    }




  
  return (
    <GridLayout className="layout" layout={this.state.layout} cols={12} rowHeight={45} width={2000}>
      <div style={myStyle1} key="a" data-grid={{x: 0, y: 0, w: 1, h: 7}}>a</div>
      <div style={myStyle1} key="b" data-grid={{x: 1, y: 0, w: 5, h: 7}} isDraggable= {false}>
      <div style={myStyle2} onKeyDown={this.threeDLayerFixStart} onKeyUp={this.threeDLayerFixEnd} tabIndex='0'>
          <ThreeDLayer testProp={this.state.changeCount}/>
      </div>
      </div>
      <div style={myStyle1} key="c" data-grid={{x: 0, y: 6, w: 6, h: 1}}>c</div>
    </GridLayout>
  )
}
}

export default Layer;