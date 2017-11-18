import React, {Component} from 'react'
import logo from './logo.png'
import './App.css'

class App extends Component {

  state = {
    announcers: []
  }

  componentWillMount() {
    fetch('announcement.json')
      .then(res => res.json())
      .then(json => this.setState({ announcers: json }))
      .catch(console.error)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Semi-Final Round</h1>
        </header>
        <div>
          <button>Web Content</button>
          <button>Web Design</button>
          <button>Web Marketing</button>
          <button>Web Programing</button>
        </div>
        <div>
          {this.state.announcers.map(({firstName, lastName, major}, i) => (
            <div key={i}>
              <div>Name: {firstName} {lastName}</div>
              <div>Major: {major[0].toUpperCase()+major.slice(1)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App