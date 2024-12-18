const express = require("express");

let arr = [
    { id: 1, name: "necklace", price: 5000 },
    { id: 2, name: "earing", price: 1150 },
    { id: 4, name: "braclates", price: 3000 },
    { id: 5, name: "ring", price: 1500 }
]

const app = express();
app.use(express.json())//הרבה פעמים נראה במקום השרוה הזאת app.use(bodyParser())
//http://localhost:8070/jewelry
app.get("/jewelry", (req, res) => {
    res.json(arr);

})
//http://localhost:8070/jewelry/1
app.get("/jewelry/:id", (req, res) => {
    let id = req.params.id;//כך מקבלים את הפרמטרים באקספרס
    let j = arr.find(item => item.id == id);
    if (!j)
        return res.status(404).send("מצטערים אין כזה קוד לשום תכשיט")
    res.json(j);

})
//http://localhost:8070/jewelry/1
app.delete("/jewelry/:id", (req, res) => {
    let id = req.params.id;//כך מקבלים את הפרמטרים באקספרס
    let index = arr.findIndex(item => item.id == id);
    if (index == -1)
        return res.status(404).send("מצטערים אין כזה קוד לשום תכשיט")
    let deletd = arr.splice(index, 1)[0]
    res.json(deletd)
})
//http://localhost:8070/jewelry
app.post("/jewelry", (req, res) => {
    let j = req.body;
    j.id = arr[arr.length - 1].id + 1;
    arr.push(j)
    res.status(201).json(j)

})

app.put("/jewelry/:id", (req, res) => {
    let id = req.params.id;//כך מקבלים את הפרמטרים באקספרס
    let j = arr.find(item => item.id == id);
    if (!j)
        return res.status(404).send("מצטערים אין כזה קוד לשום תכשיט")
    j.name = req.body.name || j.name;
    j.price = req.body.price || j.price;
    //לא מעדכנים לעולם את ה-id
    res.json(j)

})


app.listen(8070, "localhost", () => {
    console.log("app is runnig on port 8070")
})