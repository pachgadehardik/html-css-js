let empPayrollList;

window.addEventListener('DOMContentLoaded', (event) => {
  empPayrollList = getEmployeePayrollDataFromStorage();
  console.log("Employee PAAyroll List: "+empPayrollList)
  document.querySelector('.employee-count').textContent = empPayrollList.length;
  createInnerHtml();
  localStorage.removeItem('editEmp')
});

const createInnerHtml = () => {
  const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>StartDate</th><th>Actions</th>";
  if(empPayrollList.length == 0) {
    console.log("Emploee List MEptt")
    // return;
  }
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
      <td>${stringifyDate(employeePayroll._startDate)}</td>
      <td>
        <img id="${employeePayroll._id}" onclick="remove(this)" alt="delete" src="assets\\icons\\delete-black-18dp.svg">
            &nbsp;
        <img id="${employeePayroll._id}" onclick="update(this)" alt="update" src="assets\\icons\\create-black-18dp.svg">
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

const remove = (node) => {
  console.log("Node ID Value:" + node.id)
  let employeePayrollData = empPayrollList.find(empData => empData._id == node.id)
  if (!employeePayrollData) return;
  const index = empPayrollList.map(empData => empData._id).indexOf(employeePayrollData._id);
  empPayrollList.splice(index,1);
  localStorage.setItem("EmployeeList", JSON.stringify(empPayrollList));
  document.querySelector(".employee-count").textContent = empPayrollList.length;
  createInnerHtml();
}


const update = (node) => {  
  console.log("Node ID Value:" + node.id)
  let empPayrollData = empPayrollList.find(empData => empData._id == node.id)
  if (!empPayrollData) return;
  localStorage.setItem('editEmp', JSON.stringify(empPayrollData,'\t', 2));
  window.location.replace(site_properties.add_emp_payroll_page);
}

const stringifyDate = (date)=>{
  const options = { day: 'numeric', month:'short', year:'numeric'};
  const newDate = !date? "undefined" :new Date(Date.parse(date)).toLocaleDateString('en-GB',options);
  return newDate;
}