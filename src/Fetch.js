import React, { Component } from 'react';
import Ticket from './Ticket.js';
import Perimeter from 'react-perimeter'
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

class Fetch extends Component {

  constructor(props){
      super(props);
      this.state = {current : "", results: [], showSearch: true};
    }

    fire = () => {
      this.setState({showSearch: false});
      // setTimeout(() => {
      //   this.setState({showSearch: false});
      // }, 500)
    }

    fireBack = () => {
      this.setState({showSearch: true});
    }

  onChange = (e) => {
    const results = [];
    this.setState({current: e.target.value});
    const resultsObj = cities.filter(place => {
      const regex = new RegExp(e.target.value, 'gi');
      return place.state.match(regex) || place.city.match(regex);
    });
    if (e.target.value) {
      resultsObj.forEach((e) => {
        results.push(e.city+", "+e.state)
      })
      this.setState({results});
    }
    else {
      results.slice();
      this.setState({results});
    }
  }

  componentWillMount = () => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => cities.push(...data))
  }

  render() {
    return (
      <div className="appBody">
        {
          this.state.showSearch ?
        <input
          autoFocus
          type="text"
          onChange={this.onChange}
          value={this.state.current}
          className="search hover focusNow"
          placeholder='search for a city or state'
        /> : <Perimeter padding={0} onBreach={this.fireBack} className="searchAgain">
          {/* <div>🔍</div> */}
          <input
            autoFocus
            type="text"
            onChange={this.onChange}
            value={this.state.current}
            className="search hover notFocus"
            placeholder="search for a city or state"
          />
         </Perimeter>
      }
        {
          this.state.results.length != 0 ?
        <Perimeter padding={0} onBreach={this.fire} >
          <ul className="results">
          {
            this.state.results.map((v, i) => {
              return(
                <Ticket name={v} index={i} />
              )
            })
          }
          </ul>
      </Perimeter> : <div className="emptyNotif">Nothing Here...</div>
      }
      </div>
    );
  }
}

export default Fetch;
