
class Contacts {
    constructor() {} 
    //getter and setter
    get id() { return this._id }
    set id(id) {
        this._id = id;
    }
    get fullName() { return this._fullName }
    set fullName(fullName) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(fullName))
            this._fullName = fullName;
        else throw 'Fullname is Incorrect!';
    }
    get address() { return this._address }
    set address(address) {
        // let addressRegex = RegExp('^[A-Za-z]{4,}$');
        // if (addressRegex.test(address))
            this._address = address;
        // else throw 'address is Incorrect!';
    }
    get city() { return this._city }
    set city(city) {
        this._city = city;
   
    }
    get state() { return this._state }
    set state(state) {
            this._state = state;
    }

    get phoneNumber() { return this._phoneNumber }
    set phoneNumber(phoneNumber) {
        let phoneNumberRegex = RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')
        if (phoneNumberRegex.test(phoneNumber))
            this._phoneNumber = phoneNumber
        else throw 'phoneNumber is Incorrect';
    }

    get pinCode() { return this._pinCode }
    set pinCode(pinCode) {
        let pinCodeRegex = RegExp('^[1-9]{1}[0-9]{2}\\s?[0-9]{3}$')
        if (pinCodeRegex.test(pinCode))
            this._pinCode = pinCode
        else throw 'Pincode is Incorrect';
    }

    toString() {
        return "Id: " + this.id + ", FullName: " + this.fullName + ", Address: "
            + this.address + ", City: " + this.city + ", State: " + this.state + " Pincode: " + this.pinCode + " Phone Number: " + this.phoneNumber;
    }
}

let isUpdate = false;
let contactDataObj = {};

const addData = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    try {
        setContactDataObj();
        createAndUpdateStorage();
        resetForm();
        // window.location.replace(site_properties.home_page);
        window.location.replace("addressHomePage.html");
    }
    catch (err) {
        console.log(err);
    }
}

const setContactDataObj = () => {
    // employeePayrollObj.id = id++;
    contactDataObj._fullName = document.getElementById('fullname').value;
    contactDataObj._address = document.getElementById('address').value;
    contactDataObj._city = document.getElementById('city').value;
    contactDataObj._state = document.getElementById('state').value;
    contactDataObj._phoneNumber = document.getElementById('phone_number').value;
    contactDataObj._pinCode = document.getElementById('zip').value;
}

const createAndUpdateStorage = () => {
    let contactList = JSON.parse(localStorage.getItem("ContactList"));
    console.log(contactList)
    if (contactList) {
        console.log("Inside Create UPdate: Id Is "+ contactDataObj._fullName);
        let contactData = contactList.find(contactdata => contactdata._id == contactDataObj._id);
        console.log("Contacts: "+ contactData)
        if (!contactData) contactList.push(createContactData());
        else {
            const index = contactList.map(contactdata => contactdata._id).indexOf(contactData._id);
            console.log("Index is  "+index)
            contactList.splice(index, 1, createContactData(contactData._id));
        }
    }
    else {
        console.log("Inside Else:");
        contactList = [createContactData()]
    }
    // alert(employeePayrollList)
    localStorage.setItem("ContactList", JSON.stringify(contactList));
}

const createContactData = (id) => {
    let contactData = new Contacts();
    if (!id) contactData.id = createNewContactId();
    else {
        contactData.id = id;
    }
    setContactData(contactData);
    return contactData;
}

const setContactData = (contactData)=>{

    try {
        contactData.fullName = contactDataObj._fullName;
    } catch (error) {
        setTextValue('.text-error', error);
        throw error;
    }
    contactData.address = contactDataObj._address;
    contactData.city = contactDataObj._city;
    contactData.state = contactDataObj._state;
    contactData.phoneNumber = contactDataObj._phoneNumber;
    contactData.pinCode = contactDataObj._pinCode;
    alert(contactData.toString());
}
const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}
const createNewContactId = () => {
    let contactId = localStorage.getItem("ContactId");
    contactId = !contactId ? 1 : (parseInt(contactId) + 1).toString();
    localStorage.setItem("ContactId", contactId);
    return contactId;
}

const resetForm = () => {
    document.forms[0].reset();
}

window.addEventListener('DOMContentLoaded', (event) => {

    const fullName = document.querySelector('#fullname');
    const textError = document.querySelector('.text-error');
    fullName.addEventListener('input', function(){
        if(fullName.value.length == 0){
            textError.textContent=""
            return;
        }
        try {
            (new Contacts()).fullName = fullName.value;
            textError.textContent = ""
        } catch (error) {
            textError.textContent = error;
        }
    });

    const phone = document.querySelector('#phone_number');
    const phoneError = document.querySelector('.phone-error');
    phone.addEventListener('input', function(){
        if(phone.value.length == 0){
            phoneError.textContent=""
            return;
        }
        try {
            (new Contacts()).phoneNumber = phone.value;
            phoneError.textContent = ""
        } catch (error) {
            phoneError.textContent = error;
        }
    });

    checkForUpdate();
});


const checkForUpdate = () => {
    const contactDataJson = localStorage.getItem('editContact');
    isUpdate = contactDataJson ? true : false;
    if (!isUpdate) return;
    contactDataObj = JSON.parse(contactDataJson);
    setForm();
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setForm = () => {
    setValue('#fullname', contactDataObj._fullName);
    console.log("Obj ID " + contactDataObj._id)
    let name = document.querySelector('#fullname').value = contactDataObj._fullName;
    console.log("Name is " + name)
    setValue('#phone_number', contactDataObj._phoneNumber);
    setValue('#address', contactDataObj._address);
    setValue('#city', contactDataObj._city);
    setValue('#state', contactDataObj._state);
    setValue('#zip', contactDataObj._pinCode);
}