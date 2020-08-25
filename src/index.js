import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import DepartmentList from './departmentList'

class Main extends React.Component{
  constructor(){
    super();
    this.state={
      employees:[],
      departments:[]
    }
    this.destroy=this.destroy.bind(this);
    this.remove=this.remove.bind(this);
    this.reassign=this.reassign.bind(this);
  }

async componentDidMount(){

  const employeeResponse =await axios.get('/api/employees');
  const departmentReponse = await axios.get('/api/departments');

  this.setState({
    employees:employeeResponse.data,
  departments:departmentReponse.data
})
}

async destroy(employeeId){

  await axios.delete(`/api/employees/${employeeId}`)
  const employeeResponse =await axios.get('/api/employees');
  this.setState({
    employees:employeeResponse.data
})
}

async remove(employeeId){

const updatedEmployee=await axios.put(`/api/employees/${employeeId}`,{departmentId:null})
console.log(updatedEmployee);
const employeeResponse =await axios.get('/api/employees');
this.setState({
  employees:employeeResponse.data
})
}

async reassign(employeeId){

  const randomDepartment=Math.floor(Math.random() * 5) + 1;
  const updatedEmployee=await axios.put(`/api/employees/${employeeId}`,{departmentId:randomDepartment})
  console.log(updatedEmployee);
  const employeeResponse =await axios.get('/api/employees');
  this.setState({
    employees:employeeResponse.data
  })
  }

render(){
return(
<div>
<h1>Acme Employees and Departments</h1>
  <h4>{this.state.employees.length} Total Employees</h4>
  <div className="flexcontainer">
  <DepartmentList departmentName="Employees Without Departments" employees={this.state.employees.filter(employee => employee.departmentId===null)} destroy={this.destroy} remove={this.remove} reassign={this.reassign}/>
  {this.state.departments.map(element => {

    return (<DepartmentList key={element.id} departmentName={element.name} employees={this.state.employees.filter(employee => employee.departmentId===element.id)} destroy={this.destroy} remove={this.remove} reassign={this.reassign}/>)
  })
  }
  </div>
</div>
)
}



}

ReactDOM.render(
  <Main />,
  document.getElementById("main")
);
