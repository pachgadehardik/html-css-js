class EmployeePayrollData {

    constructor() { }

    get id() { return this._id }
    set id(id) {
        this._id = id
    }
    get name() { return this._name }
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

let isUpdate = false;
let employeePayrollObj = {};


let id = 0
const addData = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    // let employeePayroll = new EmployeePayrollData();
    try {
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace("homepage.html");
    }
    catch (err) {
        console.error(err);
    }
    // employees.push(employeePayroll)
    // document.forms[0].reset();
    // console.log("Objext::" + employeePayroll)
    console.warn('added', { employees })
    // localStoreData(employees);
}

const setEmployeePayrollObject = () => {
    // employeePayrollObj.id = id++;
    employeePayrollObj._name = document.getElementById('name').value;
    employeePayrollObj._profilePic = getRadioValue(document.getElementsByName('profile'));
    employeePayrollObj._gender = getRadioValue(document.getElementsByName('gender'));
    employeePayrollObj._department = getCheckBoxValue(document.getElementsByClassName('checkbox'));
    employeePayrollObj._salary = output.textContent;
    employeePayrollObj._startDate = new Date(document.getElementById('month').value + " " + document.getElementById('day').value + "," + document.getElementById('year').value)
    employeePayrollObj._note = document.getElementById('notes').value;
}

const createAndUpdateStorage = () => {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeeList"));
    if (employeePayrollList) {
        console.log("Inside Create UPdate: Id Is "+ employeePayrollObj._id);
        let empPayrollData = employeePayrollList.find(empData => empData._id == employeePayrollObj._id);
        console.log("EmployeePayrollData: "+ empPayrollData)
        if (!empPayrollData) employeePayrollList.push(createEmployeePayrollData());
        else {
            const index = employeePayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
            console.log("Index is  "+index)
            employeePayrollList.splice(index, 1, createEmployeePayrollData(empPayrollData._id));
        }

    }
    else {
        employeePayrollList = [createEmployeePayrollData()]
    }
    // alert(employeePayrollList)
    localStorage.setItem("EmployeeList", JSON.stringify(employeePayrollList));
}
const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if (!id) employeePayrollData.id = createNewEmployeeId();
    else {
        employeePayrollData.id = id;
    }
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const setEmployeePayrollData = (employeePayrollData) => {
    try {
        employeePayrollData.name = employeePayrollObj._name;
    } catch (error) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = employeePayrollObj._profilePic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.note = employeePayrollObj._note;
    employeePayrollData.startDate = new Date(Date.parse(employeePayrollObj._startDate));

    alert(employeePayrollData);
}

const createNewEmployeeId = () => {
    let empId = localStorage.getItem("EmployeeId");
    empId = !empId ? 1 : (parseInt(empId) + 1).toString();
    localStorage.setItem("EmployeeId", empId);
    return empId;
}
const localStoreData = (employees) => {
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

window.addEventListener('DOMContentLoaded', (event) => {
    checkForUpdate();
});


const salary = document.querySelector('#salary')
const output = document.querySelector('.salary-output')
output.textContent = salary.value;
salary.addEventListener('input', function () {
    output.textContent = salary.value;
});

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    console.log("Obj ID " + employeePayrollObj._id)
    console.log("EmployeeObj is: " + employeePayrollObj._department)
    let name = document.querySelector('#name').value = employeePayrollObj._name;
    console.log("Name is " + name)
    setSelectedValue('[name = profile]', employeePayrollObj._profilePic);
    setSelectedValue('[name = gender]', employeePayrollObj._gender);
    setCheckBox('[class=checkbox]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._note);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ")
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}

console.log("departments: " + employeePayrollObj._department)
const setSelectedValue = (property, value) => {
    let allitems = document.querySelectorAll(property);
    console.log("All items:" + allitems)
    allitems.forEach(item => {

        if (Array.isArray(value)) {

            if (value.includes(item.value)) item.checked = true;

        } else if (item.value === value) item.checked = true;
        console.log("Item is :" + item.value)
    });
}

const setCheckBox = (property, values) => {
    let items = document.querySelectorAll(property);
    console.log(items)
    items.forEach(item => {
        if (values.includes(item.value)) {
            console.log("True")
            item.checked = true;
        }
    });
}
const stringifyDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}