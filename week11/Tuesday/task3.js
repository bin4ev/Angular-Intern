import  {request}  from "http"
let url = 'http://eloquentjavascript.net/20_node.html'

function fetch1(url) {
  request({
    hostname: "eloquentjavascript.net",
    path: "/20_node.html",
    method: "GET",
    headers: { Accept: "text/html" }
  }, response => {
    console.log("Server responded with status code", response.statusCode);
  }).end();
}

fetch1(url)



