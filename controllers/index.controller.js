const {getBuckets, getDocs} = require('../helpers/s3');

const index = async (req,res) => {
    const data = await getBuckets();
    const docs = await getDocs();
    console.log(docs);

    res.render('index',{
        buckets:data.Buckets,
        docs:docs
    });
};

module.exports = {
    index
}