import { Request, response, Response } from 'express';
import { Users,Products } from '../../../models';
import { uuid } from 'uuidv4';
import { success, fail, failError } from "../../common/helper";
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../token';
import { UserValid, LoginValid } from '../../../Validation/UserValidation'

export const Registor = async (req: Request, res: Response) => {
    try {
        const validUser = await UserValid(req.body)
        if (validUser?.error) {
            console.log(validUser.message)
            return failError(res, validUser.message, {})
        }
        const { email } = req.body;
        const emaildata = await Users.findOne({ email: email })
        if (emaildata) {
            return failError(res, "email allredy exist", {})
        }
        const data = await Users.create(req.body)
        return success(res, "User Register successfully", data)
    } catch (error) {
        const errorMessage = (error as Error).message
        return fail(res, "internal server Error", errorMessage)

    }
}


export const Login = async (req: Request, res: Response) => {
    try {

        const validUser = await LoginValid(req.body)
        if (validUser?.error) {
            console.log(validUser.message)
            return failError(res, validUser.message, {})
        }
        const { email, password, role } = req.body;
        const emaildata = await Users.findOne({ email: email, role: role })
        if (emaildata == null) {
            return failError(res, "email not extst please registor", {})

        }
        if (emaildata.password != password) {
            // throw "password not match"
            return failError(res, "password not match", {})
        }
        let token = jwt.sign({
            data: emaildata
        }, SECRET_KEY, { expiresIn: '1h' });
        return success(res, "Login Successfully", { emaildata, token })
    } catch (error) {
        console.log(error)
        const errorMessage = (error as Error).message
        return fail(res, "internal server Error", errorMessage)
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const token = req["token"].data
        const {role}= req.body
        if(role=="user"){
            return failError(res, "only Admin can get the list", {}) 
        }
        const user = await Users.find({ role: { $in: ["user"] } });
        return success(res, "Data Get Success", user)
    } catch (error) {
        return fail(res, "internal server Error", error)
    }
}



export const create = async (req: Request, res: Response) => {
    try {
       const data = req.body
       // if make validation apply the code here
        const user = await Products.create(data);
        return success(res, "Create Success", user)
    } catch (error) {
        return fail(res, "internal server Error", error)
    }
}

export const updateData = async (req: Request, res: Response) => {
    try {
       const data = req.body
       let {id} = req.params
        const user = await Products.findOneAndUpdate({_id:id},{...data}, { new: true });
        return success(res, "Update Success", user)
    } catch (error) {
        return fail(res, "internal server Error", error)
    }
}

export const deleteData = async (req: Request, res: Response) => {
    try {
    //    const data = req.body
    let {id} =req.params
        const user = await Products.findOneAndDelete({ _id: id },{new:true});
        return success(res, "Delete Success", user)
    } catch (error) {
        return fail(res, "internal server Error", error)
    }
}

export const FindData = async (req: Request, res: Response) => {
    try {
        const { name, category, price, band, page, pageSize } = req.query;

        const pageNumber = parseInt(page as string) || 1;
        const sizeOfPage = parseInt(pageSize as string) || 10;
        
        const filterCriteria: {
            name?: RegExp;
            category?: RegExp;
            price?: RegExp;
            band?: RegExp;
        } = {}; 
        
        if (name) filterCriteria.name = new RegExp(name as string, 'i');
        if (category) filterCriteria.category = new RegExp(category as string, 'i');
        if (price) filterCriteria.price = new RegExp(price as string, 'i');
        if (band) filterCriteria.band = new RegExp(band as string, 'i');

        // THIS functionalty make the aggration also if any join related work like category name and other 
        
        const products = await Products.find(filterCriteria)
            .sort({ createdAt: -1 })
            .limit(sizeOfPage)
            .skip((pageNumber - 1) * sizeOfPage);
        
        return success(res, "Products Found", products);
        
    } catch (error) {
        return fail(res, "internal server Error", error)
    }
}




