const {uploadToBucket, uploadToDB} = require('../helpers/s3');

const upload = async (req,res) => {
    const bucket = req.body.bucket;
    const name = req.body.name;
    const file = req.files.file;

    const result = await uploadToBucket(bucket,file);
    const result2 = await uploadToDB(name, file);

    res.json(result);
};

module.exports = {
    upload
}