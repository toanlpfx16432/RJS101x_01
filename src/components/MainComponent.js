import React, { Component } from "react";
import Footer from "./FooterComponent";
import Header from "./HeaderComponent";
import StaffList from "./StafflistComponent";
import StaffDetail from "./StaffdetailComponent";
import Department from "./DepartmentComponent";
import Salary from "./SalaryComponent";
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments
  }
}

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            staffs: this.props.staffs,
            departments: this.props.departments
        };

        this.addStaff = this.addStaff.bind(this);
    }
  
    addStaff = (staff) => {
        var department = this.props.departments.find((item) => item.id == staff.department);
        const id = Math.floor(Math.random() * 10000 + 1);
        const newStaff = { id, ...staff };
        this.setState({
        staffs: [...this.state.staffs, newStaff]
      });
    }
    
    render() {
        
        const StaffWithId = ({ match }) => {
            return (
                <StaffDetail
                    staff={
                        this.state.staffs.filter(
                            (staff) => staff.id === parseInt(match.params.staffid, 10)
                        )[0]
                    }
                />
            );
        };

        return (
            <div>
                <Header />
                <Switch>
                    <Route
                        exact
                        path="/staffs"
                        component={() => <StaffList onAdd={this.addStaff} staffs={this.state.staffs} />}
                    />
                    <Route path="/staffs/:staffid" component={StaffWithId} />
                    <Route
                        exact
                        path="/department"
                        component={() => <Department dept={this.state.departments} />}
                    />
                    <Route
                        exact
                        path="/salary"
                        component={() => <Salary staffs={this.state.staffs} />}
                    />
                    <Redirect to="/staffs" />
                </Switch>
                <Footer />
            </div>
        );
    }
}
export default withRouter(connect(mapStateToProps)(Main));
