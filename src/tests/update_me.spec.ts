import {faker} from '@faker-js/faker'
import { getUser, signUp } from './helper/user'

let user
let cookie
let token

describe('PATCH /updateMe', () => {

    const newName = faker.name.fullName()
    const newEmail = faker.internet.email()

    beforeAll() 
    
    // create a new user with Faker
    user = getUser('admin')

    // signup user
    const signUp = await signUp(user)
    
    expect(signUp.statusCode).toBe(201)

    it('user update name and email', () => {
        const updateUser = await updateUser

    })
})