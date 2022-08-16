import React, { Component } from "react";
import Footer from "./FooterComponent";
import Header from "./HeaderComponent";
import StaffList from "./StafflistComponent";
import Staffdetail from "./StaffdetailComponent";
import Department from "./DepartmentComponent";
import Departmentdetail from "./Departmentdetailcomponent";
import Salary from "./SalaryComponent";
import Text from "./test";
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { postStaff, patchStaff, deleteStaff, fetchStaffs, fetchDepartment, fetchSalary} from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// dùng kết nối state của component với state trong store của redux
const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    department: state.department,
    salary: state.salary
  }
}

// dùng kết nối các method của component với các hành động của store tới Action của redux
const mapDispatchToProps = (dispatch) => ({
    fetchStaffs: () => {dispatch(fetchStaffs())},
    fetchDepartment: () => {dispatch(fetchDepartment())},  
    fetchSalary: () => {dispatch(fetchSalary())},
    postStaff: (name, doB, salaryScale, startDate, departmentId, annualLeave, overTime) => dispatch(postStaff(name, doB, salaryScale, startDate, departmentId, annualLeave, overTime)),
    patchStaff: (staffId, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime) => dispatch(patchStaff(staffId, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime)),
    deleteStaff: (staffid) => {dispatch(deleteStaff(staffid))},
});

class Main extends Component {
    // được gọi khi chương trình chạy lần đầu tiên, chạy sau render 
    componentDidMount() {
        this.props.fetchStaffs();
        this.props.fetchDepartment();
        this.props.fetchSalary();
    }
    
    render() {
        
        const StaffWithId = ({ match }) => {
            return (
                <Staffdetail
                    staff={
                        this.props.staffs.staffs.filter(
                            (staff) => staff.id === parseInt(match.params.staffId, 10)
                        )[0]}
                        department={this.props.department.department}
                        patchStaff={this.props.patchStaff}
                        deleteStaff={this.props.deleteStaff}
                />
            );
        };
                  
        const DepartmentWithId = ({ match }) => {
            return ( 
                <Departmentdetail department={this.props.department.department.find((department) => department.id === match.params.departmentId)}
                staffs={this.props.staffs.staffs}
                />
            );
        };

        return (
            <div>
                <Text />
                <Header />
                <TransitionGroup>
                    <CSSTransition  key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                        <Route exact path="/staffs" component={() =>
                            <StaffList
                            staffs={this.props.staffs} 
                            isLoading={this.props.staffs.isLoading}
                            errMess={this.props.staffs.errMess}
                            postStaff={this.props.postStaff}
                            deleteStaff={this.props.deleteStaff}
                        />} />
                        <Route path="/staffs/:staffId" component={StaffWithId} />
                        <Route exact path="/department" component={() =>
                            <Department
                            staffs={this.props.staffs}
                            department={this.props.department}
                            isLoading={this.props.department.isLoading}                            
                            errMess={this.props.department.errMess}
                        />} />
                        <Route path="/department/:departmentId" component={DepartmentWithId} />
                        <Route path="/salary" component={() => 
                            <Salary
                            salary={this.props.salary}
                            isLoading={this.props.salary.isLoading}
                            errMess={this.props.salary.errMess}
                        />} />
                        <Redirect to="/staffs"/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
