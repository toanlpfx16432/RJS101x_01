import React, {Component} from "react";
import { CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Row, Label, Col,}from 'reactstrap';
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";
import { Control, LocalForm} from 'react-redux-form';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderStaff({staff, finddepartment}){
    if (staff != null && finddepartment !=null)
        return(
            <FadeTransform
                        in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                <div className='row'>
                    <div className='col-12 col-md-4 col-lg-3'>
                        <CardImg src={staff.image} alt={staff.name} />
                    </div>
                    <div className='col-12 col-md-8 col-lg-9'>
                        <CardTitle>Họ và tên: {staff.name}</CardTitle>
                        <CardText>Ngày sinh: {dateFormat(staff.doB, 'dd/mm/yyyy')}</CardText>
                        <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                        <CardText>Phòng ban: {finddepartment.name}</CardText>
                        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                    </div>
                </div>
            </FadeTransform>
        ) 
    else {
        return (
            <div></div>
        )
    }
}

class Staffdetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            staff: props.staff,
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleupdatestaff = this.handleupdatestaff.bind(this);
    }


    toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
    }

    handleupdatestaff(values) {
        this.toggleModal();
        this.props.patchStaff(this.props.staff.id, values.name, values.doB, values.salaryScale, values.startDate, values.departmentId, values.annualLeave, values.overTime);
    }

    render() {
        if (this.props.staff != null) {
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/staffs">Nhân Viên</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.staff.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <div className='row'>
                                <h3 className='col-4'>{this.props.staff.name}</h3>
                                <Button className='col-2' color='primary' onClick={this.toggleModal}>Sửa thông tin</Button>
                                <Button className='col-2' color='danger' onClick={() => this.props.deleteStaff(this.props.staff.id)}>Xóa Nhân viên</Button>
                            </div>
                        <hr />            
                        </div>
                        <div className="col-12">
                            <Stagger in>
                                <Fade in>
                                    <RenderStaff staff={this.props.staff} finddepartment={ 
                                        this.props.department.filter((dp) => dp.id === this.props.staff.departmentId)[0]} />
                                    <br />
                                </Fade>
                            </Stagger>
                        </div>
                    </div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Sửa Thông Tin Nhân Viên</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleupdatestaff(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="name" md={4}>Tên</Label>
                                    <Col md={8}>
                                        <Control.text model=".name" id="name" name="name" 
                                            placeholder="Tên Nhân Viên"
                                            className='form-control'
                                            defaultValue={this.state.staff.name}                                          
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="doB" md={4}>Ngày sinh</Label>
                                    <Col md={8}>
                                        <Control type='date' model=".doB" id="doB" name="doB" 
                                            className='form-control'
                                            defaultValue={(this.state.staff.doB).substring(0, 10)}                                           
                                        />   
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="startDate" md={4}>Ngày vào công ty</Label>
                                    <Col md={8}>
                                        <Control type='date' model=".startDate" id="startDate" name="startDate" 
                                            className='form-control'
                                            defaultValue={(this.state.staff.startDate).substring(0, 10)}                                          
                                        />   
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="departmentId" md={4}>Phòng ban</Label>
                                    <Col md={8}>
                                        <Control.select model=".departmentId" id="departmentId" name="departmentId" defaultValue={this.state.staff.departmentId}
                                            className='form-control'>
                                                <option value="Dept01">Sale</option>
                                                <option value="Dept02">HR</option>
                                                <option value="Dept03">Marketing</option>
                                                <option value="Dept04">IT</option>
                                                <option value="Dept05">Finance</option>
                                            </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                                    <Col md={8}>
                                        <Control type='number' min="1" max="3" step="0.1" model=".salaryScale" id="salaryScale" name="salaryScale" 
                                            defaultValue={this.state.staff.salaryScale}
                                            className='form-control'
                                        />      
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                                    <Col md={8}>
                                        <Control type='number' min="0" model=".annualLeave" id="annualLeave" name="annualLeave" 
                                            className='form-control'
                                            defaultValue={this.state.staff.annualLeave}                                            
                                        /> 
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                                    <Col md={8}>
                                        <Control type='number' min="0" model=".overTime" id="overTime" name="overTime" 
                                            className='form-control'
                                            defaultValue={this.state.staff.overTime}                                          
                                        /> 
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size: 10, offset: 2}}>
                                        <Button type="submit" color="primary">
                                            Lưu thay đổi 
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}
export default Staffdetail