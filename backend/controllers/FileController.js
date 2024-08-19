module.exports = fileController = (req, res) => {
    req.files.forEach(file=>{
        console.log(file);
    })
    res.json({
        status: "success"
    });
} 