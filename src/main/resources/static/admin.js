let userInfo = $('#tableAllUsers')
let getAllUser = []

getUsers()

function getUsers() {
    fetch("/api/users").then((response) => {
        console.log(response.statusText + response.status)
        if (response.ok) {
            response.json().then((users) => {
                users.forEach((user) => {
                    console.log(user)
                    addUserForTable(user)
                    getAllUser.push(user)
                });
            });
            console.log(getAllUser)
        } else {
            console.error(response.statusText + response.status)
        }
    });
}

function addUserForTable(user) {
    userInfo.append(
        '<tr>' +
        '<td>' + user.id + '</td>' +
        '<td>' + user.name + '</td>' +
        '<td>' + user.lastname + '</td>' +
        '<td>' + user.email + '</td>' +
        '</tr>'
    )
}