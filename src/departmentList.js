import React from 'react';

function departmentList(props){
const{departmentName, employees, destroy, remove, reassign} =props;
console.log(departmentName)

return(
  <div>
  <h3>{departmentName} ({employees.length})</h3>
  {employees.map(employee => {
    const removeButton = departmentName==="Employees Without Departments" ? null:<button onClick={()=>{remove(employee.id)}}>Remove From Department</button>
    return (
      <div key={employee.id}>
      <h4>{employee.firstName} {employee.lastName}</h4>
      <div className="buttonPanel">
      <button onClick={()=>{destroy(employee.id)}}>X</button>
      { removeButton }
      <button onClick={()=>{reassign(employee.id)}}>Reassign Employee</button>
      </div>
      </div>
      )}
    )
  }
  </div>
)
}

export default departmentList;
