import { errors } from 'celebrate'
import express, { Express } from 'express'
import expressBasicAuth from 'express-basic-auth'
import { StatusCodes } from 'http-status-codes'
import swaggerUi from 'swagger-ui-express'
import { swaggerDocs } from '~/docs'
import { errorHandler } from '~/errors'
import { router } from '~/routes'

export const getServerApp = () => {
    const app: Express = express()
    const port = process.env[ 'PORT' ]
    app.set( 'port', port )
    app.use( express.json() )
    app.use( express.urlencoded( { limit: '300mb', extended: true } ) )
    app.use( '/api-docs',
        expressBasicAuth( {
            users: {
                admin: process.env[ 'SWAGGER_PASSWORD' ],
            },
            challenge: true,
        } ),
        swaggerUi.serve,
        swaggerUi.setup( swaggerDocs )
    )
    app.use( errors() )

    app.use( '/api', router )
    app.get( '/', ( _, res ) => {
        res.status( StatusCodes.OK ).send( 'ok 🦇' )
    } )

    app.use( errorHandler )

    return app
}
