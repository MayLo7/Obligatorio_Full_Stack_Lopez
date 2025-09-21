const app = express();

//ENDPOINTS
app.get("/v1/ordermeals", (req, res) => {
    res.status(200).json(bd.ordermeals);
})

app.get("/v1/ordermeals/:id", (req, res) => {
    const ordermealsId = Number(req.params.id);
    console.log(ordermealsId);

    if (isNaN(ordermealsId)) {
        res.status(400).send("Bad request" );
        return;
    }
    const ordermeal = bd.findOrdermealById(ordermealsId);

    if(!ordermeal) {
        res.status(404).send("Ordermeal not found");
        return;
    }
    res.status(200).json(ordermeal);
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});