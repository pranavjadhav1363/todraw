const mongoose = require('mongoose')

const ParentFolderSchema = mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    FolderName: {
        type: String,
        required: true,
    }

}, { timestamps: true })
const EntitySchema = mongoose.Schema({
    EntityType: {
        type: String,
        enum: ['folder', 'file'],
        required: true,
    },
    EntityName: {
        type: String,
        required: true,
    }
}, { timestamps: true })
const FolderFileSchema = mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ParentFolder: ParentFolderSchema,
    Entities: [EntitySchema]

}, { timestamps: true })

const FolderFiles = mongoose.model('FolderFile', FolderFileSchema)
module.exports = FolderFiles