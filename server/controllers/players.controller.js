// Import model
const Player = require("../models/players.model");

// Export functions to be called in Routes
module.exports = {
    // CREATE: Create one Player
    create(req, res) {
        Player.create(req.body)
            .then(Player => res.json(Player))
            .catch(err => res.status(400).json(err));
    },

    // READ: Get all Players
    getAll(req, res) {
        // Blank .find param gets all
        Player.find({})
            .then(Players => res.json(Players))
            .catch(err => res.status(400).json(err))
    },
    // READ: Get one Player by id
    getOne(req, res) {
        Player.findById({ _id: req.params.id })
            .then(Player => res.json(Player))
            .catch(err => res.status(400).json(err))
    },

    // UPDATE: Update one Player by id, re-running validators on any changed fields
    update(req, res) {
        Player.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true
        })
            .then(updatedPlayer => res.json(updatedPlayer))
            .catch(err => res.status(400).json(err));
    },

    // DESTROY: Delete one Player by id
    delete(req, res) {
        Player.findByIdAndDelete(req.params.id)
            .then(deletedPlayer => res.json(deletedPlayer))
            .catch(err => res.status(400).json(err));
    },
};

// Format:
// module.exports.FUNCTION_NAME = (req, res) => {
//   MODEL.MONGOOSE_FUNCTION(PARAMS)
//     .then(VAR => res.json({MODEL: VAR}))
//     .catch(err => res.json(err))
// }