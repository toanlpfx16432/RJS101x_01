import React, { Component } from 'react';

class Text extends Component {
    constructor(props) {
        super(props);
        this.state = { a:0,input:'' }
        this.demso=this.demso.bind(this)
        this.formupdate=this.formupdate.bind(this)
    }
    demso(){
        this.setState({
            a: this.state.a + 1
        })
    }
    formupdate(event) {
        this.setState({
            input:event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const firstName=event.target.firstName.value;
        const lastName=event.target.lastName.value;
        alert('Ho :' + lastName + ' Ten: ' + firstName)
    }
    render() { 
        return ( 
            <div className='container'>
                <div>
                    <button onClick={this.demso}>cong them 1</button><p>{this.state.a}</p>
                </div>
                <div>
                    <label>Controlled Form</label>
                    <input type='text' placeholder='nhap du lieu' value={this.state.input} onChange={this.formupdate}></input>
                    <large>{this.state.input}</large>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>Ten: </label>
                        <input type='text' name='firstName'></input>
                        <label>Ho: </label>
                        <input type='text' name='lastName'></input>
                        <input type='submit' value='Submit'></input>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default Text;