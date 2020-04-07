module.exports = (message, success, data) => {

    if(success){
        return{
            message: message +' from Custom Response',
            success: true,
            data: data
        }
    }
    else {
        return{
            message: message,
            success: false,
            error: data
        }
    }

}