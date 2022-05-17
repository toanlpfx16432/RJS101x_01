import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import dateFormat from "dateformat";

class StaffList extends Component {
    constructor(pros) {
        super(pros)
        this.state={
            selectedStaff: null,
            columDefault: "col-6 col-md-4 col-lg-2 mt-1 text-center"
        }
    }

    onStaffSelect(staff) {
        this.setState({
            selectedStaff: staff
        })
    }

    onColumSelect(col) {
        this.setState({
            columDefault:col
        })
    }

    renderStaff(staff) {
        if (staff != null) {
            return (
                <div className="row ml-3">
                    <Card>
                        <CardImg width="100%" src={staff.image} alt={staff.name} />
                        <CardBody>
                            <CardTitle>Họ và tên: {staff.name}</CardTitle>
                            <CardText>Ngày sinh: {dateFormat(staff.doB, 'dd/mm/yyyy')}</CardText>
                            <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                            <CardText>Phòng ban: {staff.department.name}</CardText>
                            <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                            <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

    render() {
        const staffList = this.props.staffs.map((staff) => {
            return (
                <div className={this.state.columDefault}>
                    <Card key={staff.id} onClick={() => this.onStaffSelect(staff)} >
                        <CardBody>
                            <CardImg width="100%" src={staff.image} alt={staff.name} />
                            <CardTitle>{staff.name}</CardTitle>
                        </CardBody>
                    </Card>
                </div>
            )
        })
        
        return (
                <div className="container">
                    <div className="row m-3">
                        <button onClick={() => this.onColumSelect('col-md-2 mt-1 text-center')} className='btn btn-success btn-lg mr-4'> 6 cột
                        </button>
                        <button onClick={() => this.onColumSelect('col-md-3 mt-1 text-center')} className='btn btn-success btn-lg mr-4'> 4 cột
                        </button>
                        <button onClick={() => this.onColumSelect('col-md-6 mt-1 text-center')} className='btn btn-success btn-lg mr-4'> 2 cột 
                        </button>
                        <button onClick={() => this.onColumSelect('col-md-12 mt-1 text-center')} className='btn btn-success btn-lg mr-4'> 1 cột
                         </button>
                    </div>
                    <div className="row">{staffList}</div>
                    <div className="row mt-3">
                        {this.renderStaff(this.state.selectedStaff)}
                    </div>
                </div>
        )
    }
}

export default StaffList