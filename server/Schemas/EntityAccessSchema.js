const mongoose = require("mongoose")

const PathAccessSchema = mongoose.Schema({
    UserId: {
        type: String,
        required: true,
    },
})
const EntityAccessSchema = mongoose.Schema({

    Path: {
        type: String,
        required: true,
        unique: true
    },
    PathOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    PathAccess: [PathAccessSchema]



}, { timestamps: true })

const EntityAccess = mongoose.model('Entityaccess', EntityAccessSchema)
module.exports = EntityAccess