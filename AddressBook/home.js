let contactdataList;

window.addEventListener('DOMContentLoaded', (event) => {
    contactdataList = getContactDataFromStorage();
    document.querySelector('.address-count').textContent = contactdataList.length;
    createInnerHtml();
    localStorage.removeItem('editContact')
});

const createInnerHtml = () => {
    const headerHtml = "<th>Full Name</th><th>Address</th><th>City</th><th>State</th><th>ZipCode</th><th>PhoneNo</th><th>Actions</th>";
    if (contactdataList.length == 0) {
        console.log("ContactData List Empty")
    }
    let innerHtml = `${headerHtml}`;
    for (const contactData of contactdataList) {
        innerHtml = ` ${innerHtml}
  <tr>
      <td>${contactData._fullName}</td>
      <td>${contactData._address}</td>
      <td>${contactData._city}</td>
      <td>${contactData._state}</td>
      <td>${contactData._pinCode}</td>
      <td>${contactData._phoneNumber}</td>
      <td>
        <img id="${contactData._id}" onclick="remove(this)" alt="delete" src="assets\\delete-black-18dp.svg">
            &nbsp;
        <img id="${contactData._id}" onclick="update(this)" alt="update" src="assets\\create-black-18dp.svg">
    </td>
</tr>`;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

const getContactDataFromStorage = () => {
    return localStorage.getItem('ContactList') ? JSON.parse(localStorage.getItem('ContactList')) : [];
}

const remove = (node) => {
    console.log("Node ID Value:" + node.id)
    let contactData = contactdataList.find(contactD => contactD._id == node.id)
    if (!contactData) return;
    const index = contactdataList.map(contactD => contactD._id).indexOf(contactData._id);
    contactdataList.splice(index,1);
    localStorage.setItem("ContactList", JSON.stringify(contactdataList));
    document.querySelector(".address-count").textContent = contactdataList.length;
    createInnerHtml();
  }
  
  
  const update = (node) => {  
    console.log("Node ID Value:" + node.id)
    let contactData = contactdataList.find(contactD => contactD._id == node.id)
    if (!contactData) return;
    localStorage.setItem('editContact', JSON.stringify(contactData,'\t', 2));
    window.location.replace("AddressBookForm.html");
  }