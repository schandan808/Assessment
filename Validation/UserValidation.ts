import * as Joi from 'joi';

export const UserValid = (data: any) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')), // Password must be alphanumeric and between 3 to 30 characters
        role: Joi.string().valid('admin', 'user').required(), // Role must be either 'admin' or 'user'
        name: Joi.string()
    });
    const { error, value } = schema.validate(data);

    if (error) {
        console.error('Validation error:', error.details[0].message);
        return { message: error.details[0].message, error: true }
    } else {
        console.log('Data is valid:', value);
        return {}
    }

}

export const LoginValid = (data: any) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')), // Password must be alphanumeric and between 3 to 30 characters
        role: Joi.string().valid('admin', 'user').required(), // Role must be either 'admin' or 'user'
    });
    const { error, value } = schema.validate(data);

    if (error) {
        console.error('Validation error:', error.details[0].message);
        return { message: error.details[0].message, error: true }
    } else {
        console.log('Data is valid:', value);
        return {}
    }

}

export const createValid = (data: any) => {
    const schema = Joi.object({
        name: Joi.string().email().required(),
        category: Joi.string(),
        price: Joi.string()
        
    });
    const { error, value } = schema.validate(data);

    if (error) {
        console.error('Validation error:', error.details[0].message);
        return { message: error.details[0].message, error: true }
    } else {
        console.log('Data is valid:', value);
        return {}
    }

}