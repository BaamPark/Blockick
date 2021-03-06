import React, { Component } from 'react'

class ContactCreate extends Component{
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            amount: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState)
    }

    handleClick() {
        const contact = {
            name: this.state.name,
            amount: this.state.amount
        }
        this.props.onCreate(contact);

        this.setState({ //초기화
            name: '',
            amount: ''
        })
    }

    render() {
        return(
            <div>
                <p>
                    <input className="input-group mb-4" type="text" name="name" placeholder="adress" value={this.state.name} onChange={this.handleChange}/>
                    {/* <input type="text" name="amount" placeholder="amount" value={this.state.amount} onChange={this.handleChange}/> */}
                </p>
                <button className="btn btn-primary btn-block btn-lg" onClick={this.handleClick}>Create</button>
            </div>
        )
    }

}

export default ContactCreate;