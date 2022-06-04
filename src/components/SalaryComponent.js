import React, {useState} from "react";
import {Card, CardBody,CardText, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';
import { Fade, Stagger } from 'react-animation-components';

function RenderSalary ({staffs}) {
    return(
        <Card className='col-md-4 col-sm-6 col-12'>
            <CardBody>
                <CardTitle className='text-center'>{staffs.name}</CardTitle>
                <CardText>Mã nhân viên: {staffs.id}</CardText>
                <CardText>Hệ số lương: {staffs.salaryScale}</CardText>
                <CardText>Số ngày làm thêm: {staffs.overTime}</CardText>
                <Breadcrumb>Lương: {Number(staffs.salaryScale
                *3000000+staffs.overTime*200000).toFixed()}</Breadcrumb>
            </CardBody>
        </Card>
    );
}

function Salary (props) {

    if (props.isLoading) {
        return (
            <div className="container">
            <div className="row">
                <Loading />
            </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
            <div className="row">
                <h4>{this.props.errMess}</h4>
            </div>
            </div>
        );
    } else if (props.salary != null) {

        
        const [statesSalary, changeStateSalary] = useState("");
        const [name,changeName] = useState("");
        const displaysalary=
            props.salary
            .sort((a,b)=>
                statesSalary ==="salary"? Number(a.salaryScale*3000000+a.overTime*200000) - Number(b.salaryScale*3000000+b.overTime*200000):a.id-b.id
            )
            .filter((salary)=>{
                if(salary.name.toLowerCase().includes(name.toLowerCase())){return(salary)}
                else{return 0}
            })
            .map((salary) => {
                return(<RenderSalary key={salary.id} staffs={salary} />)
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
                        if (statesSalary !== "salary"){return changeStateSalary("salary")}
                        else if (statesSalary === "salary"){return changeStateSalary("id")}
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
            <Stagger in>
                <Fade in>
                    <div className="row">
                        {displaysalary}
                    </div>
                </Fade>
            </Stagger>
        </div>
        )
    } else {
        return <div></div>
    }
}  

export default Salary;