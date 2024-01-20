let Name = document.getElementById('Name')
let Password = document.getElementById('Password')

function getValue() {
    fetch("http://localhost:3000/addInfo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: Name.value, password: Password.value }),
    })

}