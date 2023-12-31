const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
const db = require('./db')

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const storage = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

const getBuckets = () => {
    return storage.listBuckets().promise();
};

const uploadToBucket = (bucketName,file) => {
    const stream = fs.createReadStream(file.tempFilePath);
    const params = {
        Bucket:bucketName,
        Key:file.name,
        Body:stream
    };
    return storage.upload(params).promise();
};

const uploadToDB = async (name, file) => {
    try {
        const rows = await db.execute('INSERT INTO docs (name) VALUES (?)', [name]);
        
        return rows;
    } catch (error) {
        throw new Error('Error al subir a la base de datos: ' + error.message);
    }
};

const getDocs = async () => {
    try {
        const rows = await new Promise((resolve, reject) => {
            db.query("SELECT * FROM docs", (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
        return rows;
    } catch (error) {
        throw new Error('Error al obtener los documentos: ' + error.message);
    }
}

module.exports = {
    getBuckets,
    uploadToBucket,
    uploadToDB,
    getDocs
};