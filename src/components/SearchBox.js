import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import SingleDataRow from './SingleDataRow'
import { debounce } from 'lodash'
import GridHeader from './GridHeader'
import Loader from '../stylesComponents/Loader'
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
        this.state = {value:"", data:{ancients:[]}, cache:{}, loading: false}
        // The debounce was used to help the implementation of the search while you type
        // It will only execute the function half a second after the last keystroke
        // It means that a request is not made ever time the user enters a letter but only after the user 
        // Has stopped typing.
        this.searchRequest = debounce(this.searchRequest, 500);
    }
    
    searchRequest = async(value) => {
        this.setState({loading:true})
        //This if statement deals with the issue if you do search="" then everything is returned
        //Or if the user presses spacebar multiple times
        if(value.trim()){
            let URL = `https://athena-7.herokuapp.com/ancients.json?search=${value}`
            if(URL in this.state.cache){
                this.setState({data:this.state.cache[URL], loading:false}, )
            }
            else{
                const response = await Axios.get(URL);
                this.setState({data:response.data, loading:false,
                    cache: {
                        ...this.state.cache,
                        [URL]: response.data
                    } })
            }
        }
        else{
            this.setState({data:{ancients:[]}, loading:false})
        }
    };

    handleChange = (event) => {
        const value = event.target.value
        // Need to set the value in the state here becasue of the deboumced function
        // If we put this inside the funtion then the textbox will not update as the function
        // Only executes when the user has stopped typing
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
                
                {this.state.loading && <Loader/>}
                {!this.state.loading && <div>
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
                </div>}
            </div>
        </Fragment>
        )
    }
}

export default SearchBox;