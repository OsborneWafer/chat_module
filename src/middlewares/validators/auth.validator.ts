import { celebrate, Joi, Segments } from 'celebrate'

export const signupBodyValidator = celebrate( {
    [ Segments.BODY ]: Joi.object( {
        email: Joi.string().email().required(),
        mobile: Joi.string().regex( /^[0-9]+$/ ).min( 10 ).max( 10 ).required().optional(),
        password: Joi.string().alphanum().trim().min( 6 ).required(),
        firstName: Joi.string().regex( /^[a-zA-Z]+$/ ).trim().min( 3 ).max( 20 ).required(),
        lastName: Joi.string().regex( /^[a-zA-Z]+$/ ).trim().min( 3 ).max( 20 ).required(),
    } )
} )

export const loginBodyValidator = celebrate( {
    [ Segments.BODY ]: Joi.object( {
        user_id: Joi.string().required(),
        client_email: Joi.string().email().required(),
        client_name: Joi.string().trim().required(),
        email: Joi.string().email().required(),
        firstName: Joi.string().alphanum().trim().required(),
        lastName: Joi.string().alphanum().trim().required(),
        role: Joi.string().alphanum().trim().optional()
        // password: Joi.string().alphanum().trim().min( 6 ).trim().required(),
    } )
} )

