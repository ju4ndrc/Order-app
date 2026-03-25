

export const LoggerMiddleware = (req,res,next)=>{
    const timeString = new Date().toLocaleDateString()
    console.log(`DATE -> [${timeString}] || Method -> [${req.method}] [${req.url}] || IP [${req.ip}]`)
    next()
}