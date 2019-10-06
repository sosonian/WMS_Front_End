import React, { Component } from 'react';
//import ThreeDLayer from './ThreeDLayer';

class ThreeDGridItem extends Component {

    constructor(props) {
        super(props)
    }
    componentDidUpdate(){
        console.log(this.props)
    }

    render() {
      return (
        <div {...this.props} className={`threeDLayerGridItem ${this.props.className}`}>
        </div>
      );
    }
}

export default ThreeDGridItem;