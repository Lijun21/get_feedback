module.exports = (req, res, next) => {
    // console.log('user credit is :' + req.user.credits);
    if (req.user.credits < 1){
        return res.status(403).send({ error: 'Not enought credit' });
    }
    next();
}