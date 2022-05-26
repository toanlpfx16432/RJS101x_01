import React, { Component } from "react";
import { Card, CardImg, CardTitle, Form, FormGroup, Row, Label,
    Button, Input, Col, Modal, ModalBody, ModalHeader, } from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from 'react-redux-form';

class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            findStaff: "",
            columDefault: "col-6 col-md-4 col-lg-2 mt-1 text-center",
            isModalOpen: false,
        };
        this.handlefindStaff = this.handlefindStaff.bind(this);
        this.filterStaff = this.filterStaff.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleNewstaff = this.handleNewstaff.bind(this);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
        }

    filterStaff() {
        this.setState({
            findStaff: this.findStaff.value
        });
    }

    handlefindStaff(event) {
        this.filterStaff();
        event.preventDefault();
    }

    handleNewstaff(value) {
        const newStaff = {
            name: value.name,
            doB: value.doB,
            salaryScale: value.salaryScale,
            startDate: value.startDate,
            department: value.department,
            annualLeave: value.annualLeave,
            overTime: value.overTime,
            salary: value.salary,
            image: '/assets/images/alberto.png',
        };

        this.props.onAdd(newStaff);
    } 

    onColumSelect(col) {
        this.setState({
            columDefault: col,
        });
    }

    render() {
        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => !(val) || (val.length >= len);
        const staffList = this.props.staffs
            .filter((staff) => {
                if (this.state.findStaff === "") {
                    return staff;
                }
                else if (staff.name.toLowerCase().includes(this.state.findStaff.toLowerCase())) {
                    return staff;
                } else {
                    return 0;
                }
            } )
            .map((staff) => {
            return (
                <div key={staff.id} className={this.state.columDefault}>
                    <Card className="mt-4">
                        <Link to={`/staffs/${staff.id}`}>
                            <CardImg width="100%" src={staff.image} alt={staff.name} />
                            <CardTitle>{staff.name}</CardTitle>
                        </Link>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 mt-2">
                        <div className="row">
                            <div className='col-10 col-md-8'>
                                <h3>Nhân Viên</h3>
                            </div>
                            <div className='col-2 col-md-4'>
                                <Button onClick={this.toggleModal}>
                                    <span className='fa fa-plus fa-lg'></span>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mt-2">
                        <Form className="form-search" onSubmit={this.handlefindStaff}>
                            <FormGroup className="row">
                                <Input
                                    type="text"
                                    className="form-control col-md-8"
                                    placeholder="Tên nhân viên"
                                    innerRef={(input) => this.findStaff = input}
                                />
                                <Button className="btn btn-success ml-4" type="submit">
                                    Tìm
                                </Button>   
                            </FormGroup>
                        </Form>
                    </div>
                </div>
                <div className="row m-3">
                    <h3>Chế độ hiển thị:</h3>
                    <button
                        onClick={() => this.onColumSelect("col-md-2 text-center")}
                        className="btn btn-success btn-lg ml-4"
                    >
                        6 cột
                    </button>
                    <button
                        onClick={() => this.onColumSelect("col-md-3 text-center")}
                        className="btn btn-success btn-lg ml-4"
                    >
                        4 cột
                    </button>
                    <button
                        onClick={() => this.onColumSelect("col-md-6 text-center")}
                        className="btn btn-success btn-lg ml-4"
                    >
                        2 cột
                    </button>
                </div>
                <hr />
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Thêm Nhân Viên</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleNewstaff}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={4}>Tên nhân viên</Label>
                                <Col md={8}>
                                    <Control.text model=".name" id="name" name="name" className="form-control"
                                        placeholder="Tên Nhân Viên" validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(30)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Vui lòng nhập họ tên ',
                                            minLength: 'Tên nhân viên phải nhiều hơn 2 ký tự',
                                            maxLength: 'Tên nhân viên phải ít hơn 30 ký tự'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="doB" md={4}>Ngày sinh</Label>
                                <Col md={8}>
                                    <Control type="date" model=".doB" id="doB" name="doB" className="form-control"
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".doB"
                                        show="touched"
                                        messages={{
                                            required: 'Vui lòng nhập ngày sinh ',
                                        }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="startDate" md={4}>Ngày vào công ty</Label>
                                <Col md={8}>
                                    <Control type="date" model=".startDate" id="startDate" name="startDate"
                                        className="form-control" validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".startDate"
                                        show="touched"
                                        messages={{
                                            required: 'Vui lòng nhập ngày vào làm',
                                        }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="department" md={4}>Phòng ban</Label>
                                <Col md={8}>
                                    <Control.select model=".department" id="department" name="department" defaultValue='Sale' className="form-control">     
                                    <option>Sale</option>
                                    <option>HR</option>
                                    <option>Marketing</option>
                                    <option>IT</option>
                                    <option>Finance</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                                <Col md={8}>
                                    <Control type="number" model=".salaryScale" min="1" max="3" id="salaryScale" name="salaryScale"
                                        className="form-control" defaultValue='1' validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".salaryScale"
                                        show="touched"
                                        messages={{
                                            required: 'Vui lòng nhập hệ số lương',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                                <Col md={8}>
                                    <Control type="number" model=".annualLeave" min="0" id="annualLeave" name="annualLeave"
                                        className="form-control" defaultValue='0' validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".annualLeave"
                                        show="touched"
                                        messages={{
                                            required: 'Vui lòng nhập số ngày nghỉ còn lại ',
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                                <Col md={8}>
                                    <Control type="number" model =".overTime" min="0" id="overTime" name="overTime"
                                        className="form-control" defaultValue='0' validators={{
                                            required
                                        }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".overTime"
                                    show="touched"
                                    messages={{
                                        required: 'Vui lòng nhập sô ngày đã làm thêm',
                                    }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Thêm
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <div className="row">{staffList}</div>
            </div>
        );
    }
}

export default StaffList;
