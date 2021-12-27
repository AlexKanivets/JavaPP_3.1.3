const url = '/api/admin'
let userInfo = $('#tableAllUsers')
let allUsers = []

getAllUser()

function getAllUser() {
    fetch(url).then(res => {
        console.log(res.statusText + res.status)
        if (res.ok) {
            res.json().then(users => {
                users.forEach(user => {
                    console.log(user)
                    addUserForTable(user)
                    allUsers.push(user)
                })
            })
            console.log(allUsers)
        } else {
            console.error(res.statusText + res.status)
        }
    })
}

function addUserForTable(user) {
    userInfo.append(
        '<tr>' +
        '<td>' + user.id + '</td>' +
        '<td>' + user.name + '</td>' +
        '<td>' + user.lastname + '</td>' +
        '<td>' + user.age + '</td>' +
        '<td>' + user.email + '</td>' +
        '<td>' + user.roles.map(roleUser => roleUser.name) + '</td>' +
        '<td>' +
        '<button onclick="editUserById(' + user.id + ')" class="btn btn-info edit-btn" data-toggle="modal" data-target="#edit">Edit</button></td>' +
        '<td>' +
        '<button onclick="deleteUserById(' + user.id + ')" class="btn btn-danger" data-toggle="modal" data-target="#delete">Delete</button></td>' +
        '</tr>'
    )
}

function newUser() {
    let roleList = () => {
        let array = []
        let options = document.querySelector('#addRole').options
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                let role = {
                    id: options[i].value, name: options[i].text
                }
                array.push(role)
            }
        }
        return array;
    }

    let user = {
        name: document.getElementById("addName").value,
        lastname: document.getElementById("addLastname").value,
        age: document.getElementById("addAge").value,
        email: document.getElementById("addEmail").value,
        password: document.getElementById("addPassword").value,
        roles: roleList()
    }

    let headers = new Headers()
    headers.append('Content-Type', 'application/json; charset=utf-8')
    let request = new Request('/api/users', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(user)
    })
    console.log(user)

    fetch(request).then(res => {
        res.json().then(userAdd => {
            allUsers.push(userAdd)
            addUserForTable(userAdd)
            console.log(userAdd)
        })
        console.log(allUsers)

        $('#usersTableActive').tab('show')
    })
}

// function userClearModal() {
//     $('#addFirstname').empty().val('')
//     $('#addLastname').empty().val('')
//     $('#addAge').empty().val('')
//     $('#addEmail').empty().val('')
//     $('#addPassword').empty().val('')
//     $('#addRole').empty().val('')
// }

// Edit
function editUserById(id) {
    fetch("/api/admin/" + id, {method: "GET", dataType: 'json',})
        .then(res => {
            res.json().then(user => {
                $('#editId').val(user.id)
                $('#editName').val(user.name)
                $('#editLastname').val(user.lastname)
                $('#editAge').val(user.age)
                $('#editEmail').val(user.email)
                $('#editPassword').val(user.password)
                $('#editRole').val(user.roles)
                console.log(user)
            })
        })
}

function updateUser() {
    let roleList = () => {
        let array = []
        let options = document.querySelector('#editRole').options
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                let role = {
                    id: options[i].value,
                    name: options[i].text
                }
                array.push(role)
            }
        }
        return array
    }

    let editUser = {
        id: document.getElementById('editId').value,
        name: document.getElementById('editName').value,
        lastname: document.getElementById('editLastname').value,
        age: document.getElementById('editAge').value,
        email: document.getElementById('editEmail').value,
        password: document.getElementById('editPassword').value,
        roles: roleList()
    }
    console.log(editUser)

    let headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8')
    let request = new Request(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(editUser)
    })

    let userEditId = ($('editId').val())
    console.log(userEditId)
    fetch(request).then(res => {
        res.json().then(userEdit => {
            console.log(userEdit)
            userInfo.empty()
            allUsers = allUsers.map(user => user.id !== userEdit.id ? user : userEdit)
            console.log(allUsers)
            allUsers.forEach(user => {
                addUserForTable(user)
            })
        })
        $('#edit').modal('hide')
    })
}

// Delete
function deleteUserById(id) {
    fetch("/api/admin/" + id, {method: 'GET', dataType: 'json',})
        .then(res => {
            res.json().then(user => {
                $('#deleteId').val(user.id)
                $('#deleteFirstname').val(user.firstname)
                $('#deleteLastname').val(user.lastname)
                $('#deleteAge').val(user.age)
                $('#deleteEmail').val(user.email)
                $('#deletePassword').val(user.password)
                $('#deleteRole').val(user.roles)
            })
        })
}

function deleteUser() {
    let userId = ($('#deleteId').val())
    console.log(userId)
    fetch("/api/admin/" + userId, {method: "DELETE"})
        .then(res => {
            userInfo.empty()
            allUsers = allUsers.filter(user => user.id !== Number(userId))
            console.log(allUsers)

            allUsers.forEach(user => {
                addUserForTable(user)
            })
            $('#delete').modal('hide')
        })
}