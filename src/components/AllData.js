import React, { Component, Fragment } from 'react';
import SingleDataRow from './SingleDataRow'
import GridHeader from './GridHeader'
import Axios from 'axios';
import uuid from 'uuidv4'
const headingStyle = {
  padding:'10px',
  borderWidth: 0.5,
  borderColor: '#d6d7da',
  backgroundColor: "#fafafa",
  border: '1px solid grey'
}

class Alldata extends Component {
    state = {data:[]}

    componentDidMount() {
        Axios.get("https://athena-7.herokuapp.com/ancients.json").then((response) =>(
          this.setState({data:response.data})
        ))
    }

    render(){
        return (
          <Fragment>
            <div style={{ background: '#fff', padding: 24, minHeight: 400 }}>
              <header className="App-header">
              Load all Data
              </header>
              <GridHeader/>
              <div style={headingStyle}>
                {this.state.data.map((item) => (
                  <SingleDataRow key={uuid()} item={item}/>
                  ))
                }
              </div>
            </div>
          </Fragment>)
        
    }
}

export default Alldata;