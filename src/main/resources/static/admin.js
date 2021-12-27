let userInfo = $('#tableAllUsers')
let getAllUser = []

getUsers()

function getUsers() {
    fetch("/api/users").then((response) => {
        response.json().then((users) => {
            users.forEach((user) => {
                addUserForTable(user)
                getAllUser.push(user)
            });
        });
    });
}
function addUserForTable(user) {
    userInfo.append(
        '<tr>' +
        '<td>' + user.id + '</td>' +
        '<td>' + user.name + '</td>' +
        '<td>' + user.lastname + '</td>' +
        '<td>' + user.age + '</td>' +
        '<td>' + user.email + '</td>' +
        '<td>' + user.roles.map(roleUser => roleUser.role) + '</td>' +
        '<td>' +
        '<button onclick="editUserById(' + user.id + ')" class="btn btn-info edit-btn" data-toggle="modal" data-target="#edit"' +
        '>Edit</button></td>' +
        '<td>' +
        '<button onclick="deleteUserById(' + user.id + ')" class="btn btn-danger" data-toggle="modal" data-target="#delete"' +
        '>Delete</button></td>' +
        '</tr>'
    )
}