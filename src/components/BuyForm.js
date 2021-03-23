import React, { Component } from 'react'
import tokenLogo from '../token-logo.png'
import ethLogo from '../eth-logo.png'

class BuyForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      output: '0'
    }
  }

  render() {
    return (
      //form tag is used for user input. The form element can contain one or more following elements:<input>, <output>, <button>, <lable>
      <form className="mb-3" onSubmit={(event) => { 
          event.preventDefault() //prevent page refresh
          let etherAmount
          etherAmount = this.input.value.toString()
          etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
          this.props.buyTokens(etherAmount) //App.js 파일에 정의했음
        }}>
        <div>
          <label className="float-left"><b>Input</b></label>
          <span className="float-right text-muted">
            Balance: {window.web3.utils.fromWei(this.props.ethBalance, 'Ether')} {/*wei를 eth단위로 변환*/}
          </span>
        </div>
        <div className="input-group mb-4">
          <input
            type="text"
            onChange={(event) => {        //onChange handler
              console.log("changing..")
              const etherAmount = this.input.value.toString() 
              this.setState({output: etherAmount * 100})
            }}
            ref={(input) => { this.input = input }} //ref makes input field focused
            className="form-control form-control-lg"
            placeholder="0"
            required />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={ethLogo} height='32' alt=""/>
                  ETH
            </div>
          </div>
        </div>
        <div>
          <label className="float-left"><b>Output</b></label>
          <span className="float-right text-muted">
            Balance: {window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')}
          </span>
        </div>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="0"
            value={this.state.output} //output은 onChange쪽에서 적용된 대로 100*input이 나옴
            disabled 
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={tokenLogo} height='32' alt=""/>
                DApp
            </div>
          </div>
        </div>
        <div className="mb-5">
          <span className="float-left text-muted">Exchange Rate</span>
          <span className="float-right text-muted">1 ETH = 100 DApp</span>
        </div>
        <button type="submit" className="btn btn-primary btn-block btn-lg">SWAP!</button> {/*type이 submit */} 
      </form>
    );
  }
}

export default BuyForm;