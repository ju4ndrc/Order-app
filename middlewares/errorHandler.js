
export const ErrorHandler = (err,req,res,next)=>{

    const statusCode = err.statusCode || 500
    
    const message = err.message || 'unexpected error'
    const time = new Date().toDateString()

    console.error(`[ERROR += ${time} =+ ] -> <${statusCode}> \n <${message}>`)

    if(err.stack){
        console.error(`More information for error \n [${err.stack}]`)
    }

    res.status(statusCode).json({
        status:'error',
        statusCode,
        message,
        ...(process.env.NODE_ENV === 'development' && {stack: err.stack}) //cuadno la variable este en produccion me entrega otra info
    })

}