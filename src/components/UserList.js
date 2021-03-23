import React, { Component } from 'react'
import User from './User'
import ContactCreate from './ContactCreate'
import update from 'react-addons-update'

class UserList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedKey: -1,
            contactData: [
                {name: "000xx", amount: '10'},
                {name: "001xx", amount: '10'},
                {name: "010xx", amount: '10'}
            ]
        }
        
        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleCreate(contact) {
        this.setState({
            contactData: update(this.state.contactData, { $push: [contact]}) 
        })
    }

    handleRemove() {
        this.setState({
            contactData: update(this.state.contactData,
                { $splice: [[this.state.selectedKey, 1]]}
                ),
                selectedKey: -1
        })
    }

    render() {
        const mapToComponents = (data) => {
            return data.map((contact, i) => {
                return(<User contact={contact} key={i}/>)
            })
        }
        return(
            <div>
                <h1>User</h1>
                <input 
                    name="keyword"
                />
                <div>{mapToComponents(this.state.contactData)}</div>
                <ContactCreate
                    onCreate={this.handleCreate}/>
            </div>
            
        );
    }

}

export default UserList;