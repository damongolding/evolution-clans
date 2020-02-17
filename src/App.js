import React, {
  Component
} from 'react';
import './App.css';

import Members from './components/members';

class App extends Component {

  constructor() {
    super();
    this.state = {
      BASE_URL: `https://www.bungie.net/Platform`,
      API_KEY: window.location.href === "http://localhost:3000/evolution-clans" ? `9c2fa45363f943bca1ab8b94c6d3fa59` : `5bae9685d44d40879a0a24da5e948e90`,  
    };
  }

  render() {
    return ( 
      <div className="container">
        <Members 
          clanName="Knights"
          groupId="1770080"
          BASE_URL={this.state.BASE_URL}
          API_KEY={this.state.API_KEY} />

        <Members 
          clanName="Fatebringers"
          groupId="2185897"
          BASE_URL={this.state.BASE_URL}
          API_KEY={this.state.API_KEY} />
          
        <Members 
          clanName="Storm"
          groupId="2057456"
          BASE_URL={this.state.BASE_URL}
          API_KEY={this.state.API_KEY} />
        
        <Members 
          clanName="Outlaws"
          groupId="4114610"
          BASE_URL={this.state.BASE_URL}
          API_KEY={this.state.API_KEY} />
          
      </div>
    );
  }
}

export default App;
