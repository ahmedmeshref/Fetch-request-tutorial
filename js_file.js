
document.getElementById('addText').addEventListener('click', getText);
document.getElementById('showPosts').addEventListener('click', printPosts);
document.getElementById("addPost").addEventListener('submit', addPost);

function getText() {
    // method_1 using normal functions
    // fetch('text.txt')
    // // this fetch gives us back a promise which can be used right after the
    // // fetch or using .then
    // .then(function(response) {
    //     // when we return the response text, it give the value of the promise data
    //     return response.text();
    // })
    // .then(function(resValue) {
    //     document.getElementById("showText").innerHTML = resValue;
    // })

    // method_2: using the arrow function => {}
    fetch("text.txt")
        .then((response) => {
            return response.text();
        })
        .then((responseValue) => {
            document.getElementById("showText").innerHTML = responseValue;
        })
        // catch errors
        .catch((error) => console.log(error.message))
}


function printPosts (){
    // get request fetch(url)
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: 'GET'
    })
        .then((response) => response.json())
        .then((posts) => {
            let output = "<h2>Posts</h2>";
            for (let i=0; i < posts.length; i++) {
                output += `
                            <div class="card card-body mb-3">
                                <h3>${posts[i].title}</h3>
                                <p>${posts[i].body}</p>
                            </div>`
            }
            document.getElementById('presentPosts').innerHTML = output;
        })
}


// post request with fetch
function addPost(e) {
    // prevent the default which is adding the output to a file
    e.preventDefault();
    let title = document.getElementById("title").value;
    let body = document.getElementById("body").value;
    fetch("https://jsonplaceholder.typicode.com/posts", { // init object methods
        method: 'POST', // method can be POST, PUT, DELETE, GET (by default) .... etc.
        headers: {
            'Content-type': 'application/json'
        },
        // Send json string
        body: JSON.stringify({
            title: title, body: body
        })
    })
    .then((response) => response.json())
    .then((resValue) => {
        DIV = document.createElement("div");
        DIV.className = 'card card-body';
        DIV.innerHTML = `<h1>${resValue.title}</h1>
                             <p>${resValue.body}</p>`;
        document.getElementById('presentPosts').appendChild(DIV);
        document.getElementById('title').value = null;
        document.getElementById('body').value = null;
    })
    .catch((err) => console.log('Error: '+ err))
}
