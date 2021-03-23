import React, { Component } from 'react'

class User extends Component{

    render() {
        return(
            <div>{this.props.contact.name}, {this.props.contact.amount}</div>
        )
    }

}

export default User;