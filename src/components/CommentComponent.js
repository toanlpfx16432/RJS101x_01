import React, { Component } from "react";
import { Label, Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Submit Comment</ModalHeader>
        <ModalBody>
            <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                <Row className="form-group">  
                    <Label htmlFor="rating" md={2}>Rating</Label>   
                    <Col md={10}>
                        <Control.select model=".rating" name="rating" id="rating"
                            className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                    </Col>
                </Row>
                <Row className="form-group">
                    <Label htmlFor="author" md={2}>Your Name</Label>
                    <Col md={10}>
                        <Control.text model=".author" id="author" name="author"
                            placeholder="Your Name"
                            className="form-control"
                            validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}
                                />
                        <Errors
                            className="text-danger"
                            model=".author"
                            show="touched"
                            messages={{
                                required: 'Required',
                                minLength: 'Must be greater than 2 characters',
                                maxLength: 'Must be 15 characters or less'
                            }}
                            />
                    </Col>
                </Row>
                <Row className="form-group">
                    <Label htmlFor="comments" md={2}>Your Feedback</Label>
                    <Col md={10}>
                        <Control.textarea model=".comments" id="comments" name="comments"
                            rows="6"
                            className="form-control" />
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col md={{size:10, offset: 2}}>
                        <Button type="submit" color="primary">
                        Submit
                        </Button>
                    </Col>
                </Row>
            </LocalForm>
        </ModalBody>
      </Modal>
    );
  }
}
export default CommentForm;