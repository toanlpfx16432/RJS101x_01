import React, { Component } from "react";
import { Card, CardImg, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

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
    render() {
        const staffList = this.props.staffs.map((staff) => {
            return (
                <div className={this.state.columDefault}>
                    <Card className='mt-4'>
                        <Link to={`/staffs/${staff.id}`} >
                                <CardImg width="100%" src={staff.image} alt={staff.name} />
                                <CardTitle>{staff.name}</CardTitle>
                        </Link>
                    </Card>
                </div>
            )
        })
        
        return (
                <div className="container">
                    <div className="row m-3">
                        <h3>Chế độ hiển thị:</h3>
                        <button onClick={() => this.onColumSelect('col-md-2 text-center')} className='btn btn-success btn-lg ml-4'> 6 cột
                        </button>
                        <button onClick={() => this.onColumSelect('col-md-3 text-center')} className='btn btn-success btn-lg ml-4'> 4 cột
                        </button>
                        <button onClick={() => this.onColumSelect('col-md-6 text-center')} className='btn btn-success btn-lg ml-4'> 2 cột 
                        </button>
                    </div>
                    <hr />
                    <h2>Nhân viên</h2>
                    <div className="row">{staffList}</div>
                </div>
        )
    }
}

export default StaffList