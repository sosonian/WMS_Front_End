import React, {Component} from 'react';

class TestComponent1 extends Component {

    constructor(props) {
      super(props)
      this.state = {
          clickCount:0,
          value:''
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }
    
    render() {
     
      return (
       
          <div >
              <form onSubmit={this.handleSubmit}>
                <label>
                   Name:
                   <input  type="text"  style={{width:'75%'}} value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
              </form>
            {this.state.value}
          </div>
      )
    }

}

export default TestComponent1;