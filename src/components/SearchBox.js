import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import SingleDataRow from './SingleDataRow'
import { debounce } from 'lodash'
import GridHeader from './GridHeader'
import uuid from 'uuidv4'
const searchBarStyle = {
    justifyContent: 'center',
    display: 'flex',
    /* flex-direction: column; */
    alignItems: 'center',
    padding: '10px',
    fontWeight: 'bold'
}

const headingStyle = {
    padding:'10px',
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: "#fafafa",
    border: '1px solid grey'
  }
  
class SearchBox extends Component {
   
    constructor(props){
        super(props)
        this.state = {value:"", data:{ancients:[]}, cache:{}}
        this.searchRequest = debounce(this.searchRequest, 500);
    }
    
    searchRequest = async(value) => {
        //This if statement deals with the issue if you do search="" then everything is returned
        //Or if the user presses spacebar multiple times
        if(value.trim()){
            let URL = `https://athena-7.herokuapp.com/ancients.json?search=${value}`
            if(URL in this.state.cache){
                this.setState({data:this.state.cache[URL]})
            }
            else{
                const response = await Axios.get(URL);
                this.setState({data:response.data,
                    cache: {
                        ...this.state.cache,
                        [URL]: response.data
                    } })
            }
        }
        else{
            this.setState({data:{ancients:[]}})
        }
    };

    handleChange = (event) => {
        const value = event.target.value
        // Need to set the value in the state here becasue of the deboumced function
        this.setState({value:value})
        this.searchRequest(value)
    
    }
    

    render(){
        return( 
        <Fragment>
            <div style={{ background: '#fff', padding: 24, minHeight: 400}}>
                <header className="App-header">
                    Search
                </header>
                <div style={searchBarStyle} >
                
                    <label style={{padding:"10px"}}>Search</label>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </div>
                {this.state.data.ancients.length !== 0 && <GridHeader/>}
                {this.state.data.ancients.length !== 0 && <div style={headingStyle}>
                    {this.state.data.ancients && this.state.data.ancients.map((item) => (
                        <SingleDataRow key={uuid()} item={item}/>
                    ))}
                </div>}
                <div style={searchBarStyle}>
                    {this.state.data.ancients.length === 0 && this.state.value.trim() && <p>No results</p>}
                    {!this.state.value.trim() && <p>This will auto search as you type</p>}
                </div>
            </div>
        </Fragment>
        )
    }
}

export default SearchBox;