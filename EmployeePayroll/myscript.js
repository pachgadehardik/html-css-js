class EmployeePayrollData {

    constructor() { }

    get name() { console.log("GETTER NAME:"); return this._name }
    set name(name) {
        this._name = name;
    }

    get gender() { return this._gender }
    set gender(gender) {
        this._gender = gender
    }

    get salary() { return this._salary }
    set salary(salary) {
        this._salary = salary;
    }

    get profilePic() { return this._profilePic }
    set profilePic(profilePic) {
        this._profilePic = profilePic;
    }

    get department() { return this._department }
    set department(departments) {
        this._department = departments;
    }

    get note() { return this._note }
    set note(note) {
        this._note = note;
    }

    get startDate() { return this._startDate }
    set startDate(startDate) {
        let todayDate = new Date()
        console.log("StartDate::" + startDate)
        if (startDate <= todayDate && startDate >= todayDate.setDate(todayDate.getDate() - 30)) {
            this._startDate = startDate;
            console.log(this._startDate)
        }
        else {
            alert("DATE RANGE INVALID")
            throw 'Date Range Invalid!'

        }

    }
}

let employees = [];

const addData = (ev) => {
    ev.preventDefault();
    let employeePayroll = new EmployeePayrollData();
    try {
        employeePayroll.name = document.getElementById('name').value;
        employeePayroll.profilePic = getRadioValue(document.getElementsByName('profile'));
        employeePayroll.gender = getRadioValue(document.getElementsByName('gender'));
        employeePayroll.department = getCheckBoxValue(document.getElementsByClassName('checkbox'));
        employeePayroll.salary = output.textContent;
        employeePayroll.startDate = new Date(document.getElementById('month').value + " " + document.getElementById('day').value + "," + document.getElementById('year').value)
        employeePayroll.note = document.getElementById('notes').value
    }
    catch (err) {
        console.error(err)
    }
    employees.push(employeePayroll)
    document.forms[0].reset();
    console.log("Objext::" + employeePayroll)
    console.warn('added', { employees })
    localStorage.setItem('EmployeeList', JSON.stringify(employees, '\t', 2));
}
const resetForm = () => {
    document.forms[0].reset();
    const output = document.querySelector('.salary-output')
    output.textContent = ""
}

function getRadioValue(radios) {
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}
function getCheckBoxValue(boxes) {
    let boxlist = []
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) {
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