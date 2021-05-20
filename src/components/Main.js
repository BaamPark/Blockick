import React, { Component } from 'react'
import BuyForm from './BuyForm'
import SellForm from './SellForm'
import Kick from './Kick'
import UserList from './UserList'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentForm: 'buy',
    };

  }


  render() {
    let content
    if(this.state.currentForm === 'buy') {
      content = <BuyForm
        ethBalance={this.props.ethBalance}
        tokenBalance={this.props.tokenBalance}
        buyTokens={this.props.buyTokens}
      />
    } else if (this.state.currentForm === 'sell') {
      content = <SellForm
        ethBalance={this.props.ethBalance}
        tokenBalance={this.props.tokenBalance}
        sellTokens={this.props.sellTokens}
      />
    } else {
      content = <Kick
        ethBalance={this.props.ethBalance}
        tokenBalance={this.props.tokenBalance}
        kickTokens={this.props.kickTokens}
      />
    }

    return (
      <div id="content" className="mt-3">

        <div className="d-flex justify-content-between mb-3">
          <button
              className="btn btn-light"
              onClick={(event) => {
                this.setState({ currentForm: 'buy' })
              }}
            >
            Buy
          </button>
          <span className="text-muted">&lt; &nbsp; &gt;</span>
          <button
              className="btn btn-light"
              onClick={(event) => {
                this.setState({ currentForm: 'sell' })
              }}
            >
            Sell
          </button>

          <span className="text-muted">&lt; &nbsp; &gt;</span>
          <button
              className="btn btn-light"
              onClick={(event) => {
                this.setState({ currentForm: 'kick' })
              }}
            >
            Kick
          </button>
          
        </div>

        <div className="card mb-4" >

          <div className="card-body">

            {content}
          </div>

        </div>
        <UserList/>
        <p>Click <a href="http://192.168.0.52/">here</a> after you kick with your token.</p>
        {/* <a href = "http://192.168.0.52/"
                onClick={(event) => {
                  window.alert("User and Password will recieve after you kick")
                }}>
                  <p3>Click here and Unlock</p3></a> */}
      </div>
    );
  }
}

export default Main;
