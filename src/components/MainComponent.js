import React, { Component } from "react";
import Footer from "./FooterComponent";
import Header from "./HeaderComponent";
import { Switch, Route, Redirect } from "react-router-dom";
import { DEPARTMENTS, STAFFS } from "../shared/staffs";
import StaffList from "./StafflistComponent";
import StaffDetail from "./StaffdetailComponent";
import Department from "./DepartmentComponent";
import Salary from "./SalaryComponent";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            staffs: STAFFS,
            department: DEPARTMENTS,
        };
        this.addStaff = this.addStaff.bind(this);
    }
  
    addStaff = (staff) => {
      const id = Math.floor(Math.random() * 10000 + 1);
      const newStaff = { id, ...staff };
      this.setState({
        staffs: [...this.state.staffs, newStaff]
      });
      console.log(newStaff);
      console.log(this.state.staffs);
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
                        component={() => <Department dept={this.state.department} />}
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
export default Main;
