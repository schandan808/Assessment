
import { Request, Response, NextFunction } from 'express'
const success = (res: Response, message: string, data: any) => {
    try {
        return res.status(200).json({
            "success": true,
            "code": 200,
            "message": message,
            "body": data
        })

    } catch (error) {
        console.log(error);
    }
}
const failError = (res:Response,message:string,err:any)=>{
    try {
        return res.status(500).json({
            "success": false,
            "code": 400,
            "message": message,
            "body": {}
        })
    } catch (error) {
        console.log(error);  
    }
}

const fail = (res:Response,message:string,err:any)=>{
    try {
        return res.status(500).json({
            "success": false,
            "code": 500,
            "message": message,
            "body": err
        })
    } catch (error) {
        console.log(error);  
    }
}

export {
    success,fail,failError
}