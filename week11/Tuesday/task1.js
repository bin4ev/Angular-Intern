import fetch from "node-fetch"
import { request } from "http"

fetch('http://eloquentjavascript.net/20_node.html', { headers: { Accept: "text/html" } })
  .then(res => console.log("Server responded with status code", res.status))
  .catch(err => console.log(err))


let requestStream = request({
  hostname: "eloquentjavascript.net",
  path: "/20_node.html",
  method: "GET",
  headers: { Accept: "text/html" }
}, response => {
  console.log("Server responded with status code",
    response.statusCode);
});
requestStream.end();

