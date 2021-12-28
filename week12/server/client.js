import fetch from "node-fetch"

let data = {
    "id": "151",
    "name": "Georgi",
    "age": "33",
    "city": "Yambol",
    "has-certificate": "true"
}

let url = `http://localhost:8000/users `
fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },
     body: JSON.stringify(data) 
})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))