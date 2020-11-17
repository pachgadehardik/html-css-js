window.addEventListener('DOMContentLoaded', (event) => {
  createInnerHtml();
});

const createInnerHtml = ()=>{
    const headerHtml = "<th>Full Name</th><th>Address</th><th>City</th><th>State</th><th>ZipCode</th><th>PhoneNo</th><th>Actions</th>";
    const innerHtml = `${headerHtml}
    <tr>
    <td>John Doe</td>
    <td>SV Road Borivali West</td>
    <td>Mumbai</td>
    <td>Maharashtra</td>
    <td>400068</td>
    <td>02228484821</td>
    <td>
    <img id="1" onclick="remove(this)" alt="delete" src="assets\\delete-black-18dp.svg">
        &nbsp;
    <img id="1" onclick="remove(this)" alt="update" src="assets\\create-black-18dp.svg">
</td>
    </tr>`;
    document.querySelector('#display').innerHTML = innerHtml;
}