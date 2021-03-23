import React, { Component } from 'react'
import tokenLogo from '../token-logo.png'
import ethLogo from '../eth-logo.png'
import Identicon from 'identicon.js'

class Kick extends Component {
  constructor(props) {
    super(props)
    this.state = {
      output: '0',
      receiver: ''
    }
  }

  render() {
    return (
      //form tag is used for user input. The form element can contain one or more following elements:<input>, <output>, <button>, <lable>
      <form className="mb-3" onSubmit={(event) => { 
            event.preventDefault()
            let etherAmount
            let receiver
            etherAmount = this.input.value.toString()
            etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
            receiver = this.state.receiver
            this.props.kickTokens(receiver, etherAmount)
            console.log(receiver)
            window.alert("your payment has been done")
        }}>
       <div>
          <label className="float-left"><b>Input</b></label>
          <span className="float-right text-muted">
            Balance: {window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')}
          </span>
        </div>
        <div className="input-group mb-4">
          <input
            type="text"
            onChange={(event) => {
              const tokenAmount = this.input.value.toString()
              this.setState({
                output: tokenAmount / 100
              })
            }}
            ref={(input) => { this.input = input }}
            className="form-control form-control-lg"
            placeholder="0"
            required />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={tokenLogo} height='32' alt=""/>
                DApp
            </div>
          </div>
        </div>
        <div>
          <label className="float-left"><b>Output</b></label>
          <span className="float-right text-muted">
            Balance: {window.web3.utils.fromWei(this.props.ethBalance, 'Ether')}
          </span>
        </div>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="0"
            value={this.state.output}
            disabled
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={ethLogo} height='32' alt=""/>
                  ETH
            </div>
          </div>
        </div>
        <div className="mb-5">
          <span className="float-left text-muted">Exchange Rate</span>
          <span className="float-right text-muted">100 DApp = 1 ETH</span>
        </div>

        <label className="float-left"><b>Receiver</b></label>
        <div className="input-group mb-4">
          <input
            type="text"
            onChange={(event) => {    //onChange handler
            //   const receiver = this.input.value.toString() 이거 잘못됨
              this.setState({receiver: event.target.value})
              console.log(this.state.receiver)
              console.log(event.target.value)
            }}
            className="form-control form-control-lg"
            placeholder="type address here"
            required />
          <div className="input-group-append">
            <div className="input-group-text">
            { this.props.account
              ? <img
                className="ml-2"
                width='30'
                height='30'
                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                alt=""
              />
              : <span></span>
            }
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block btn-lg">Pay!</button> {/*type이 submit */} 
      </form>
    );
  }
}

export default Kick;