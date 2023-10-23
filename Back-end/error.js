export const errorMsg=(status,message)=>{
    const newError=new Error()
    errorMsg.status=status
    errorMsg.message=message
    return newError
}