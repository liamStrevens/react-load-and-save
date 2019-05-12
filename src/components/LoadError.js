import React, { Component } from 'react'
import Axios from 'axios';
class LoadError extends Component {

    state = {data:[], error: ""}
componentDidMount() {
    
    Axios.get("https://athena-7.herokuapp.com/ancients.json?error=true").then((response) =>(
        this.setState({data:response.data})
    )).catch((error) =>{
        this.setState(error.response.data)
})}
    
  render() {
    return (
      <div style={{ background: '#fff', padding: 24, minHeight: 400 }}>
          <header className="App-header">
                Error
            </header>
            <p>{this.state.error}</p>
      </div>
    )
  }
}

export default LoadError