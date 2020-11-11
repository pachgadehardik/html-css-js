let employees = [];
const addData = (ev) => {
    ev.preventDefault();
    let employee = {
        name: document.getElementById('name').value,
        profile: getRadioValue(document.getElementsByName('profile')),
        gender: getRadioValue(document.getElementsByName('gender')),
        departments:getCheckBoxValue(document.getElementsByClassName('checkbox')),
        salary: output.textContent,
        startDate: document.getElementById('day').value + document.getElementById('month').value+ document.getElementById('year').value,
        notes: document.getElementById('notes').value
    }
    employees.push(employee)
    document.forms[0].reset();

    console.warn('added', { employees })
    localStorage.setItem('EmployeeList', JSON.stringify(employees, '\t', 2));

}

function getRadioValue(radios) {
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}
function getCheckBoxValue(boxes){
    let boxlist = []
    for(var i=0;i<boxes.length;i++){
        if(boxes[i].checked){
            boxlist.push(boxes[i].value)
        }
    }
    return boxlist;
}

const salary = document.querySelector('#salary')
const output = document.querySelector('.salary-output')
output.textContent = salary.value;
salary.addEventListener('input', function () {
    output.textContent = salary.value;
});