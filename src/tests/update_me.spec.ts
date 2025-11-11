import { faker } from "@faker-js/faker"
import { deleteUser, getUser, login, remainUser, signUp, updateUser, updateUserNegative, uploadUserPhoto, uploadUserPicture } from "./helper/user"
import * as path from "path"


let user
let cookie
let token

  describe('PATCH /updateMe', () => {

    const newName = faker.name.fullName()
    const newEmail = faker.internet.email()
  
    beforeAll(async () => {
        //create a test user with faker
        user = getUser('admin')

        //sign up user 
        const signUpRes = await signUp(user)  
        console.log(signUpRes.body, 'signup response')

        expect (signUpRes.statusCode).toBe(201)
        // log in to get token and cookie
        const loginRes = await login({
            email: user.email,
            password: user.password
        })
        expect(loginRes.statusCode).toBe(200)
        token = loginRes.body.token
        cookie = loginRes.headers['set-cookie'][0] // extra first cookie
    })
    afterAll(async () => {
        try {
            const res = await deleteUser(cookie)
            expect(res.statusCode).toBe(200)
            expect(res.body.message).toBe('User deleted successfully')
        } catch (error) {
            console.log(error)
            throw error;
        }
    })

    it('user update name and email', async () => {
        const updateUserAndEmail = await updateUser({
            name: newName,
            email: newEmail,
        }, token)
        expect(updateUserAndEmail.name).toBe(newName)
        expect(updateUserAndEmail.email.toLowerCase()).toBe(newEmail.toLowerCase())
    })

    it('should update user photo upload', async () => {
        const filePath = path.join(__dirname, '../../data/pasv.png');
        const photo = await uploadUserPhoto(filePath, token)
        expect(photo).toBeDefined()
    })
    it('should reject password update via this route', async () => { //done
        const res = await updateUserNegative({
            password: 'NewPassword123!',
            passwordConfirm: 'NewPassword123!'
        }, token)

        expect(res.statusCode).toBe(400)
        expect(res.body.status).toBe('fail')
        expect(res.body.message).toContain('This route is not for password updates.')
    })
    it('should reject updates without a token', async () => { //doesn't work
        const res = await updateUserNegative({
            name: 'Unauthorized User',
        }, '')
        expect(res.statusCode).toBe(401)
        expect(res.body.status).toBe('fail')
        expect(res.body.message).toContain('You are not logged in!')
    })

        it('should reject invalid email format', async () => { 
            // doesn't work 
            const res = await updateUserNegative({
                email: 'invalidEmail',
            }, token)
         
            expect(res.statusCode).toBe(400)
            expect(res.body.status).toBe('fail')
            expect(res.body.message).toContain('Please provide a valid email')
        })
        it('should reject empty request body', async () => { // doesn't work
            const res = await updateUserNegative({
            }, token)

           expect(res.statusCode).toBe(400)
           expect(res.body.status).toBe('fail')
           expect(res.body.message).toContain('No data provided for update.')
        })
        it('should reject unauthorized field updates (role, reset token)', async () => {
            const res = await remainUser(token)
// doesn't work
            expect(res.statusCode).toBe(200)
            expect(res.body.status).toBe('success')
            expect(res.body.data.user).toContain('Role should remain "user"')
        })

        it('should reject update with invalid token', async () => { //doesn't work
        const invalidToken = 'Invalid.token'
        const res = await request
         .patch('/updateMe')
         .set('Authorization', invalidToken)
         .send({ name: 'New Name' })

            expect(res.status).toBe(401)
            expect(res.body.status).toBe('fail')
            expect(res.body.message).toContain('Invalid token. Please log in again.')
    })

        it('should successfully update user name and email', async () => { //done
        const newName = faker.name.fullName()
        const newEmail = faker.internet.email()

        const updateNewUser = await updateUser({
            name: newName,
            email: newEmail,
        }, token)

          expect(updateNewUser.name).toBe(newName)
          expect(updateNewUser.email.toLowerCase()).toBe(newEmail.toLowerCase())
        })

        it('should successfully upload profile picture', async () => { //done
            const filePath = path.join(__dirname, '../../data/pasv.png')
            const picture = await uploadUserPicture(filePath, token)

            expect(picture).toBeDefined()
        })

        it.only('should succesfully ensure login still works after updates', async () => { //done
            const loginRes = await login({
                email: user.email,
                password: user.password
            })
            expect(loginRes.statusCode).toBe(200)
            expect(loginRes.body.token).toBeDefined()
        })
    })

