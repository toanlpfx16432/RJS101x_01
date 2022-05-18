import React from "react";
import {Card, CardBody,CardText, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';

function Salary (props) {
    const renderSalary=props.salary.map((x)=>{
        return(
            <Card kex={x.id} className='col-md-4 col-sm-6 col-12'>
                <CardBody>
                    <CardTitle>{x.name}</CardTitle>
                    <CardText>Mã nhân viên: {x.id}</CardText>
                    <CardText>Hệ số lương: {x.salaryScale}</CardText>
                    <CardText>Số ngày làm thêm: {x.overTime}</CardText>
                    <CardText>Lương: {parseInt(x.salaryScale
                    *3000000+x.overTime*200000)}</CardText>
                </CardBody>
            </Card>
        );
    })   
    return(
    <div className="container">
        <div className='row'>
            <Breadcrumb>
                <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to='/department' active>Phòng ban</Link></BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div className="row">
            {renderSalary}
        </div>
    </div>
    )
}   

export default Salary