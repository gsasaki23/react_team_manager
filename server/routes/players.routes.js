// Import controller
const PlayerController = require("../controllers/players.controller");

// Exports routes to be called in server.js
module.exports = app => {
    app.post("/api/players/new", PlayerController.create);
    app.get("/api/players/", PlayerController.getAll);
    app.get("/api/players/:id", PlayerController.getOne);
    app.put("/api/players/update/:id", PlayerController.update);
    app.delete("/api/players/delete/:id", PlayerController.delete);
};

// Format:
// app.MONGOOSE_FUNCTION("ROUTE", CONTROLLER_FUNCTION)