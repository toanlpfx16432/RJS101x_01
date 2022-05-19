import React, {useState} from "react";
import {Card, CardBody,CardText, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';

function RenderSalary ({staff}) {
    return(
        <Card kex={staff.id} className='col-md-4 col-sm-6 col-12'>
            <CardBody>
                <CardTitle className='text-center'><h3>{staff.name}</h3></CardTitle>
                <CardText>Mã nhân viên: {staff.id}</CardText>
                <CardText>Hệ số lương: {staff.salaryScale}</CardText>
                <CardText>Số ngày làm thêm: {staff.overTime}</CardText>
                <Breadcrumb>Lương: {parseInt(staff.salaryScale
                *3000000+staff.overTime*200000)}</Breadcrumb>
            </CardBody>
        </Card>
    );
}

function Salary (props) {

    const [statesSalary, changeStateSalary] = useState("");
    const [name,changeName] = useState("");
    const displaysalary=
        props.staffs
        .sort((a,b)=>
            statesSalary=="salary"? parseInt(a.salaryScale*3000000+a.overTime*200000) - parseInt(b.salaryScale*3000000+b.overTime*200000):a.id-b.id
        )
        .filter((staff)=>{
            if(staff.name.toLowerCase().includes(name.toLowerCase())){return(staff)}
            else{return 0}
        })
        .map((staff) => {
            return(<RenderSalary staff={staff} />)
        })

    return(
    <div className="container">
        <div className='row'>
            <Breadcrumb>
                <BreadcrumbItem><Link to='/staffs'>Nhân Viên</Link></BreadcrumbItem>
                <BreadcrumbItem>Bảng Lương</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div className='row'>
            <div className="col-md-8">
                <span className=""><b>Sắp xếp theo: </b></span>
                <select onChange={()=>{
                    if (statesSalary!="salary"){return changeStateSalary("salary")}
                    else if (statesSalary=="salary"){return changeStateSalary("id")}
                }}>
                    <option >Mã nhân viên</option>
                    <option >Mức lương</option>
                </select>
            </div>
            <div className="col-md-4">
                <span className=""><b>Tìm theo tên: </b></span>
                <input id="search" type="text" placeholder="Tên nhân viên" value={name} onChange={(e)=>changeName(e.target.value)}></input>
            </div>
        </div>
        <div className="row">
            {displaysalary}
        </div>
    </div>
    )
}   

export default Salary