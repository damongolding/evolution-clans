import React, { Component } from "react";
import Member from "./member";
import superagent from "superagent";

class Members extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BASE_URL: props.BASE_URL,
      API_KEY: props.API_KEY,
      groupId: props.groupId,
      clanName: props.clanName,
      platform: props.platform,
      members: [],
      failedCall: false,
    };
  }

  componentDidMount() {
    superagent
      .get(`${this.state.BASE_URL}/GroupV2/${this.state.groupId}/Members/`)
      .set("X-API-Key", this.state.API_KEY)
      .set("accept", "json")
      .end((err, res) => {
        if (!err) {
          this.setState({
            members: res.body.Response.results,
          });
        } else {
          this.setState({ failedCall: true });
        }
      });
  }

  render() {
    // Members sorted alphabetically by username
    const members = this.state.members
      .sort((a, b) =>
        a.destinyUserInfo.LastSeenDisplayName.toString().toLowerCase() >
        b.destinyUserInfo.LastSeenDisplayName.toString().toLowerCase()
          ? 1
          : -1
      )
      .map((member, index) => {
        const currentMember = member;
        return (
          <Member
            member={currentMember}
            platform={currentMember.destinyUserInfo.LastSeenDisplayNameType}
            BASE_URL={this.props.BASE_URL}
            API_KEY={this.props.API_KEY}
            key={index.toString()}
          />
        );
      });

    // Pull state into const to avoid this.state.blah 
    const { clanName, failedCall } = this.state;

    if (this.state.members.length === 0) {
      return (
        <div className={`clan ${clanName}-border`}>
          <header className={clanName}>
            <h2>{clanName}</h2>
            <div className="member-number">
              Number of members: <strong> 0 </strong>
            </div>  
          </header>
          <section className="members">
            <div className="loading">
              {failedCall ? "API call failed :(" : "Loading..."}
            </div>
          </section>
        </div>
      );
    } else {
      return (
        <div className={`clan ${clanName}-border`}>
          <header className={clanName}>
            <h2>{clanName}</h2>
            <div className="member-number">
              Number of members: <strong> {members.length} </strong>
            </div>
          </header>
          <section className="members">{members}</section>
        </div>
      );
    }
  }
}

export default Members;
