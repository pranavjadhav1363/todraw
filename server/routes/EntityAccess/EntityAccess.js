const express = require('mongoose')
const authuser = require('../../middleware/auth')
const EntityAccess = require('../../Schemas/EntityAccessSchema')
const User = require('../../Schemas/UserSchema')
const router = express.Router()

router.post('/giveaccess', authuser, async (req, res) => {
    try {
        if (!fs.existsSync(`./uploads/${req.user.id}/${req.body.Path}`)) {

            return res.status(404).json({ success: false, response: 'Path Not Found ' })
        }
        const CheckIfAccessIsAlreadyGiven = await EntityAccess.findOne({
            Path: req.body.Path,
            PathOwner: req.body.PathOwner,
            'PathAccess.UserId': req.body.UserId
        });
        if (CheckIfAccessIsAlreadyGiven) {
            return res.status(400).json({ success: false, response: "Access Already Given" })
        }
        const CheckIfAccessPathDocumentExist = await EntityAccess.findOne({
            Path: req.body.Path,
            PathOwner: req.body.PathOwner,
        })
        if (CheckIfAccessPathDocumentExist) {
            const GivenAccess = await EntityAccess.findOneAndUpdate(
                {
                    Path: req.body.Path,
                    PathOwner: req.body.PathOwner,
                },
                {
                    $push: { 'PathAccess': { $each: req.body.UserIds } },
                },
                { returnDocument: 'after' } // This option returns the updated document
            );
            return res.status(200).json({ success: true, response: GivenAccess })
        }
        const CreateAccessForTheUser = await EntityAccess.create({
            Path: req.body.Path,
            PathOwner: req.body.PathOwner,
            PathAccess: req.body.UserIds,
        });
        if (CreateAccessForTheUser) {
            return res.status(200).json({ success: true, response: CreateAccessForTheUser })
        }
    } catch (error) {
        return res.status(500).json({ success: false, response: 'Internal Server Error', error: error.message })
    }
})
router.put('/removeaccess', authuser, async (req, res) => {
    try {
        if (!fs.existsSync(`./uploads/${req.body.Path}`)) {
            return res.status(404).json({ success: false, response: 'Path Not Found ' })
        }
        const CheckIfAccessIsAlreadyGiven = await EntityAccess.findOne({
            Path: req.body.Path,
            PathOwner: req.body.PathOwner,
            'PathAccess.UserId': req.body.UserId
        });
        if (CheckIfAccessIsAlreadyGiven) {
            const Removeaccess = await EntityAccess.findOneAndUpdate(
                {
                    Path: req.body.Path,
                    PathOwner: req.body.PathOwner,
                },
                {
                    $pull: { 'PathAccess': { UserId: req.body.UserId } },
                },
                { returnDocument: 'after' }
            );
            return res.status(200).json({ success: true, response: Removeaccess })
        }
        return res.status(400).json({ success: false, response: "User Access Does Not Exist cannot remove access" })
    } catch (error) {
        return res.status(500).json({ success: false, response: 'Internal Server Error', error: error.message })
    }
})
router.put('/updateentitypath', authuser, async (req, res) => {
    try {
        if (!fs.existsSync(`./uploads/${req.user.id}/${req.body.Path}`)) {

            return res.status(404).json({ success: false, response: 'Path Not Found ' })
        }
        const oldPath = `./uploads/${req.user.id}/${req.body.Path}`;
        const newPath = `./uploads/${req.user.id}/${req.body.Path}`;

        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.error('Error renaming file:', err);
                return res.status(500).json({ success: false, response: 'Internal Server Error', error: err.message })
            } else {
                console.log('File renamed successfully.');
            }
        });
        const CheckIfPathExists = await EntityAccess.findOne({
            Path: req.body.OriginalPath,
            PathOwner: req.body.PathOwner,
        });
        if (CheckIfPathExists) {
            const UpdateThepath = await EntityAccess.findOneAndUpdate(
                {
                    Path: req.body.OriginalPath,
                    PathOwner: req.user.id,
                },
                { $set: { Path: req.body.Newpath } },
                { returnDocument: 'after' }
            );
            if (UpdateThepath) {
                return res.status(200).json({ success: true, response: OBJECT })
            }
        }
    } catch (error) {
        return res.status(500).json({ success: false, response: 'Internal Server Error', error: error.message })
    }
})
module.exports = router