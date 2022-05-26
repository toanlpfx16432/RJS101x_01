import React, { Component } from "react";
import { Card, CardImg, CardTitle, Form, FormGroup, FormFeedback, Label,
    Button, Input, Col, Modal, ModalBody, ModalHeader, } from "reactstrap";
import { Link } from "react-router-dom";

class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            findStaff: "",
            columDefault: "col-6 col-md-4 col-lg-2 mt-1 text-center",
            name: "",
            doB: "",
            startDate: "",
            department: "sale",
            salaryScale: 1,
            annualLeave: 0,
            overTime: 0,
            salary: 30000,
            isModalOpen: false,
            touched: {
                name: false,
                doB: false,
                department: false,
                startDate: false,
                salaryScale: false,
                annualLeave: false,
                overTime: false,
            }
        };
        this.handlefindStaff = this.handlefindStaff.bind(this);
        this.filterStaff = this.filterStaff.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleNewstaff = this.handleNewstaff.bind(this);
        this.handleNewstaffChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
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


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleNewstaff(event) {
        event.preventDefault();
        const newStaff = {
            name: this.state.name,
            doB: this.state.doB,
            salaryScale: this.state.salaryScale,
            startDate: this.state.startDate,
            department: this.state.department,
            annualLeave: this.state.annualLeave,
            overTime: this.state.overTime,
            salary: this.state.salary,
            image: '/assets/images/alberto.png',
        };

        this.props.onAdd(newStaff);
    } 

    handleBlur = (field) => (event) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }
    validate(name, doB, startDate, salaryScale, annualLeave, overTime) {
        const errors = {
            name: '',
            doB: '',
            startDate: '',
            department: '',
            salaryScale: '',
            annualLeave: '',
            overTime: '',
        };

        if (this.state.touched.name && name.length < 1 )
            errors.name = 'Yêu cầu nhập';
        else if (this.state.touched.name && name.length < 2)
            errors.name = 'Tên nhân viên phải nhiều hơn 2 ký tự';
        else if (this.state.touched.name && name.length > 30)
            errors.name = 'Tên nhân viên phải ít hơn 30 ký tự';

        if (this.state.touched.doB && doB.length < 1)
            errors.doB = 'Yêu cầu nhập';

        if (this.state.touched.startDate && startDate.length < 1)
            errors.startDate = 'Yêu cầu nhập';

        if (this.state.touched.salaryScale && salaryScale.length < 1)
            errors.salaryScale = 'giá trị nhập: 1.0 -> 3.0';

        if (this.state.touched.annualLeave && annualLeave.length < 1)
            errors.annualLeave = 'Yêu cầu nhập';

        if (this.state.touched.overTime && overTime.length < 1)
            errors.overTime = 'Yêu cầu nhập';

        return errors;

    }

    onColumSelect(col) {
        this.setState({
            columDefault: col,
        });
    }

    render() {

        const errors = this.validate(this.state.name, this.state.doB, this.state.startDate, this.state.salaryScale, this.state.annualLeave, this.state.overTime);
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
                                <h3>Danh Sách Nhân Viên</h3>
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
                        <Form onSubmit={this.handleNewstaff}>
                            <FormGroup row>
                                <Label htmlFor="name" md={4}>Tên</Label>
                                <Col md={8}>
                                    <Input type="text" id="name" name="name"
                                        placeholder="Tên Nhân Viên"
                                        value={this.state.name}
                                        valid={errors.name === ''}
                                        invalid={errors.name !== ''}
                                        onBlur={this.handleBlur('name')}
                                        onChange={this.handleNewstaffChange} />
                                    <FormFeedback>{errors.name}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="doB" md={4}>Ngày sinh</Label>
                                <Col md={8}>
                                    <Input type="date" id="doB" name="doB"
                                        value={this.state.doB}
                                        valid={errors.doB === ''}
                                        invalid={errors.doB !== ''}
                                        onBlur={this.handleBlur('doB')}
                                        onChange={this.handleNewstaffChange} />
                                    <FormFeedback>{errors.doB}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="startDate" md={4}>Ngày vào công ty</Label>
                                <Col md={8}>
                                    <Input type="date" id="startDate" name="startDate"
                                        value={this.state.startDate}
                                        valid={errors.startDate === ''}
                                        invalid={errors.startDate !== ''}
                                        onBlur={this.handleBlur('startDate')}
                                        onChange={this.handleNewstaffChange} />
                                    <FormFeedback>{errors.startDate}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="department" md={4}>Phòng ban</Label>
                                <Col md={8}>
                                    <Input type="select" id="department" name="department"
                                        value={this.state.department}
                                        valid={errors.department === ''}
                                        invalid={errors.department !== ''}
                                        onBlur={this.handleBlur('department')}
                                        onChange={this.handleNewstaffChange}>
                                    <option>Sale</option>
                                    <option>HR</option>
                                    <option>Marketing</option>
                                    <option>IT</option>
                                    <option>Finance</option>
                                        </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                                <Col md={8}>
                                    <Input type="number" step="0.1" min="1" max="3" id="salaryScale" name="salaryScale"
                                        value={this.state.salaryScale}
                                        valid={errors.salaryScale === ''}
                                        invalid={errors.salaryScale !== ''}
                                        placeholder={errors.salaryScale}
                                        onBlur={this.handleBlur('salaryScale')}
                                        onChange={this.handleNewstaffChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                                <Col md={8}>
                                    <Input type="number" min="0" id="annualLeave" name="annualLeave"
                                        value={this.state.annualLeave}
                                        valid={errors.annualLeave === ''}
                                        invalid={errors.annualLeave !== ''}
                                        onBlur={this.handleBlur('annualLeave')}
                                        onChange={this.handleNewstaffChange} />
                                    <FormFeedback>{errors.annualLeave}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                                <Col md={8}>
                                    <Input type="number" min="0" id="overTime" name="overTime"
                                        value={this.state.overTime}
                                        valid={errors.overTime === ''}
                                        invalid={errors.overTime !== ''}
                                        onBlur={this.handleBlur('overTime')}
                                        onChange={this.handleNewstaffChange} />
                                    <FormFeedback>{errors.overTime}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Thêm
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
                <div className="row">{staffList}</div>
            </div>
        );
    }
}

export default StaffList;
