let empPayrollList;

window.addEventListener('DOMContentLoaded', (event) => {
  empPayrollList = getEmployeePayrollDataFromStorage();
  console.log("Employee PAAyroll List: "+empPayrollList)
  document.querySelector('.employee-count').textContent = empPayrollList.length;
  createInnerHtml();
  // localStorage.removeItem('editEmp')
});

const createInnerHtml = () => {
  const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>StartDate</th><th>Actions</th>";
  if(empPayrollList.length == 0) {
    console.log("Emploee List MEptt")
    return;}
  let innerHtml = `${headerHtml}`;
  console.log("EmployeeList"+ empPayrollList)
  for(const employeePayroll of empPayrollList){
    innerHtml = ` ${innerHtml}
  <tr>
    <td><img class="profile" src="${employeePayroll._profilePic}"></td>
      <td>${employeePayroll._name}</td>
      <td>${employeePayroll._gender}</td>
      <td>${getDeptHtml(employeePayroll._department)}</td>
      <td>${employeePayroll._salary}</td>
      <td>${employeePayroll._startDate}</td>
      <td>
        <img id="${employeePayroll._id}" onclick="remove(this)" alt="delete" src="assets\\icons\\delete-black-18dp.svg">
            &nbsp;
        <img id="${employeePayroll._id}" onclick="remove(this)" alt="update" src="assets\\icons\\create-black-18dp.svg">
    </td>
</tr>`;
  }
    document.querySelector('#display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList)=>{
  let deptHtml = '';
  for(const dept of deptList){
    deptHtml = `${deptHtml} <div class = 'dept-label'>${dept}</div>`
  }
  return deptHtml
}

const getEmployeePayrollDataFromStorage = () =>{
  return localStorage.getItem('EmployeeList') ? JSON.parse(localStorage.getItem('EmployeeList')) : [];
}