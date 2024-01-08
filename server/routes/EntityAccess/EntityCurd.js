const express = require('mongoose')
const authuser = require('../../middleware/auth')
const EntityAccess = require('../../Schemas/EntityAccessSchema')
const User = require('../../Schemas/UserSchema')
const router = express.Router()

async function convertToRegExpString(inputString) {
    const escapedString = await inputString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return `^${escapedString}`;
}



router.post('/createentity', authuser, async (req, res) => {
    try {
        const Entitypath = `./uploads/${req.user.id}/${req.body.Path}`
        if (!fs.existsSync(`./uploads/${req.user.id}/${req.body.Path}`)) {
            if (req.body.Folder === true) {
                fs.mkdir(Entitypath, { recursive: true }, async (err) => {
                    if (err) {
                        return res.status(500).json({ success: false, response: 'Internal Server Error', error: error.message })
                    } else {
                        const CreateTheEntity = await EntityAccess.create({
                            Path: Entitypath,
                            PathOwner: req.user.id,
                            PathAccess: []

                        })
                        if (CreateTheEntity) {
                            return res.status(200).json({ success: true, response: CreateTheEntity })
                        }

                    }
                });

            } else {



                fs.writeFile(Entitypath, async (err) => {
                    if (err) {
                        return res.status(500).json({ success: false, response: 'Internal Server Error', error: error.message })

                    } else {
                        const CreateTheEntity = await EntityAccess.create({
                            Path: Entitypath,
                            PathOwner: req.user.id,
                            PathAccess: []

                        })
                        if (CreateTheEntity) {
                            return res.status(200).json({ success: true, response: CreateTheEntity })
                        }

                    }
                });
            }
            return res.status(400).json({ success: false, response: "Path Already Exists Can't Create New One" })
        }
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

router.delete('/deleteentity', authuser, async (req, res) => {
    try {
        if (!fs.existsSync(`./uploads/${req.user.id}/${req.body.Path}`)) {

            return res.status(404).json({ success: false, response: 'Path Not Found ' })
        }
        if (req.body.folder === true) {
            fs.rmdir(folderPath, { recursive: true }, (err) => {
                if (err) {
                    return res.status(500).json({ success: false, response: 'Internal Server Error', error: err.message })
                } else {
                    const DeleteTheDocument = await
                    return res.status(200).json({ success: true, response: "Entity Deleted successfully" })
                }
            });
        }
        const inputString = `./uploads/${req.user.id}/${req.body.Path}`;
        const regExpString = await convertToRegExpString(inputString);
        const DeleteTheEntity = await EntityAccess.deleteMany({ Path: regExpString })
        if (DeleteTheEntity) {
            return res.status(200).json({ success: true, response: "Folder Deleted Successfully" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, response: 'Internal Server Error', error: error.message })
    }
})
module.exports = router