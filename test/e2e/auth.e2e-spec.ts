import { getServerApp } from './mocks/server.mock'
import request from 'supertest'

describe( 'Auth Route Test Suite', () => {
    const app = getServerApp()
    beforeAll( () => {} )

    it( 'should return a 200 OK', () => {
        request( app )
            .get( '/' )
            .expect( 200 )
    } )
} )