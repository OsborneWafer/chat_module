import pino from 'pino'
import logger from 'pino-http'
import Container from 'typedi'

export const initializeLogger = async () => {
    const pinoLogger = logger( {
        logger: pino( {
            transport: {
                target: 'pino-pretty',
            },
        } ),
        genReqId: ( req ) => req.id,
        customReceivedMessage: ( req, res ) => {
            return `\x1b[33m Request received: ${ req.method } ${ req.url } from ${ req.headers[ 'x-forwarded-for' ] || req.headers[ 'x-forwarded-for' ] || req.connection.remoteAddress }`
        },
        customSuccessMessage: ( req, res ) => {
            return `Request completed: ${ req.method } ${ req.url } from ${ req.headers[ 'x-forwarded-for' ] || req.headers[ 'x-forwarded-for' ] || req.connection.remoteAddress } with status code ${ res.statusCode }`
        },
        customErrorMessage: ( req, res ) => {
            return `\x1b[31m Request failed: ${ req.method } ${ req.url } from ${ req.headers[ 'x-forwarded-for' ] || req.headers[ 'x-forwarded-for' ] || req.connection.remoteAddress } with status code ${ res.statusCode }`
        },
        serializers: {
            req: ( req ) => `> ${req.method} ${req.url}`,
            res: ( res ) => `< ${res.statusCode} ${res.headers[ 'content-type' ]}`
        },
    } )

    Container.set( 'logger', pinoLogger )   
}