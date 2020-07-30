import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import '../components/ErrorBoundry';
import ErrorBoundry from '../components/ErrorBoundry';

class App extends Component { // # loading with empry arr robots
  constructor() {
    super()
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount() { // ### fetcging the users after the file renders with empry arr.
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => { this.setState({ robots: users }) });
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !robots.length ? // ## with the rendering of the empty arr. before we fetch the users with componentDidMount - using cleaner sintax from [if (robots.length === 0) return]
      <h1>Loading</h1> :
      ( //## else rerurn this
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
            <ErrorBoundry>
              <CardList robots={filteredRobots} />
            </ErrorBoundry>
        </div>
      );
  }
}

export default App;