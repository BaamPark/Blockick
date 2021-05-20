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
                {name: "0xB08452f93E63c44dCbE25Af479ae8fe42c716F98"}
            ]
        }
        
        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentWillMount() {
        const contactData = localStorage.contactData;

        if(contactData) {
            this.setState({
                contactData: JSON.parse(contactData)
            })
        }
    }

    componentDidUpdate(prevState) {
        if(JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)) {
            localStorage.contactData = JSON.stringify(this.state.contactData);
            //update된 거 지우고 싶으면 console창에서 localStorage.clear() 
        }
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
            <div className="card mb-4" >
                <div className="card-body">
                    <div>
                        <p className="float-left"><b>User</b></p>
                    </div>
                    <br/>
                    <div className="float-left">{mapToComponents(this.state.contactData)}</div>
                    <ContactCreate
                        onCreate={this.handleCreate}/>
                </div>
            </div>
            
        );
    }

}

export default UserList;