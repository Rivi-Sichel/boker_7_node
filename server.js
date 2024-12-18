const http = require("http");
const url = require("url");
const fs = require("fs").promises;

//http://localhost:8080/all?id=1

let arr = [
    { id: 1, name: "necklace", price: 5000 },
    { id: 2, name: "earing", price: 1150 },
    { id: 4, name: "braclates", price: 4000 },
]

const app = http.createServer((req, res) => {

    let urlData = url.parse(req.url, true);;
    if (urlData.pathname == "/all" && req.method == "GET") {
        res.write(JSON.stringify(arr))
        res.end()
    }
    else if (urlData.pathname == "/byid" && req.method == "GET") {// urlData.query--כאן נשמרים הפרמטרים
        let id = urlData.query.id;
        let jewe = arr.find(item => item.id == id)
        if (!jewe) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "plain/text")
            res.write("מצטערים לא היה כזה תכשיט")
            return res.end();
        }
        res.setHeader("Content-Type", "application/json")
        res.write(JSON.stringify(jewe))
        res.end();

    }
    else if (urlData.pathname == "/byid" && req.method == "DELETE") {// urlData.query--כאן נשמרים הפרמטרים
        let id = urlData.query.id;
        let indx = arr.findIndex(item => item.id == id)
        if (indx == -1) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "plain/text")
            res.write("מצטערים לא היה כזה תכשיט")
            return res.end();
        }
        let deleted = arr.splice(indx, 1)[0];
        res.setHeader("Content-Type", "application/json")
        res.write(JSON.stringify(deleted))
        res.end();

    }
    //http://localhost:8080/picture?name=boy.jpg
    else if (urlData.pathname == "/picture" && req.method == "GET") {
        let name = urlData.query.name;
        fs.readFile("./images/" + name).then(data => {
            res.setHeader("Content-Type", "image/jpeg")
            res.write(data)
            res.end()
        }).catch(err => {
            res.statusCode = 400;
            res.write("תקלה " + err.message)
            res.end()
        })

    }
    else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "plain/text")
        res.write("כותבת לא קיימת")
        res.end()
    }
})

app.listen(8080, "localhost", () => {
    console.log("app is litening on port 8080 for client's requests")
})