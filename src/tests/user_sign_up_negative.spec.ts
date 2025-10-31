import * as supertest from 'supertest'; 

const request = supertest('http://localhost:8001/api/v1/users'); 

    describe('USER SIGN UP NEGATIVE', () => {
        it('should not create a new user if all fields are missing', async () => {
            const userData = {}
            console.log(userData, 'user data')
            try{
                const res = await request.post('/signup').send(userData)
                console.log(res.body, 'response')
                expect(res.status).toBe(400)
                expect(res.body.error.status).toBe('fail')
                expect(res.body.error.statusCode).toBe(400)
                expect(res.body.error.message).toContain('Missing required fields: name, email, password, passwordConfirmation')

            }catch(err){
                console.log('Error during user sign up:', err)
                throw err;

            }
        })
        it('should not create a new user if name is missing', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                passwordConfirm: 'password123'
            }
            console.log(userData, 'user data')
            try{
                const res = await request.post('/signup').send(userData)
                console.log(res.body, 'response')
                expect(res.status).toBe(400)
                expect(res.body.status).toBeDefined()
                expect(res.body.error.status).toBe('fail')
                expect(res.body.error.statusCode).toBe(400)
                expect(res.body.message).toContain('Missing required fields: name')

            }catch(err){
                console.log('Error during user sign up:', err)
                throw err;

            }
        })
         it('should not create a new user if email is missing', async () => {
            const userData = {
                name: 'Test User',
                password: 'password123',
                passwordConfirm: 'password123'
            }
            console.log(userData, 'user data')
            try{
                const res = await request.post('/signup').send(userData)
                console.log(res.body, 'response')
                expect(res.status).toBe(400)
                expect(res.body.status).toBeDefined()
                expect(res.body.error.status).toBe('fail')
                expect(res.body.error.statusCode).toBe(400)
                expect(res.body.message).toContain('Missing required fields: email')

            }catch(err){
                console.log('Error during user sign up:', err)
                throw err;

            }
        })
         it('should not create a new user if password is missing', async () => {
            const userData = {
                name: 'Test User',
                email: 'test@example.com',
                passwordConfirm: 'password123'
            }
            console.log(userData, 'user data')
            try{
                const res = await request.post('/signup').send(userData)
                console.log(res.body, 'response')
                expect(res.status).toBe(400)
                expect(res.body.status).toBeDefined()
                expect(res.body.error.status).toBe('fail')
                expect(res.body.error.statusCode).toBe(400)
                expect(res.body.message).toContain('Missing required fields: password')

            }catch(err){
                console.log('Error during user sign up:', err)
                throw err;

            }
        })
        it('should not create a new user if passwordConfirm is missing', async () => {
            const userData = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            }
            console.log(userData, 'user data')
            try{
                const res = await request.post('/signup').send(userData)
                console.log(res.body, 'response')
                expect(res.status).toBe(400)
                expect(res.body.status).toBeDefined()
                expect(res.body.error.status).toBe('fail')
                expect(res.body.error.statusCode).toBe(400)
                expect(res.body.message).toContain('Missing required fields: passwordConfirm')

            }catch(err){
                console.log('Error during user sign up:', err)
                throw err;

            }
        })
         it('should not create a new user if multiple fields missing', async () => {
            const userData = {
                name: 'Test User',
                //email: '',
                //password: '',
                //passwordConfirm: ''
            }
            console.log(userData, 'user data')
            try{
                const res = await request.post('/signup').send(userData)
                console.log(res.body, 'response')
                expect(res.status).toBe(400)
                expect(res.body.status).toBeDefined()
                expect(res.body.error.status).toBe('fail')
                expect(res.body.error.statusCode).toBe(400)
                expect(res.body.message).toContain('Missing required fields: email, password, passwordConfirm')

            }catch(err){
                console.log('Error during user sign up:', err)
                throw err;

            }
        })
            it('should not create a new user if email is invalid format', async () => {
            const userData = {
                name: 'Test User',
                email: 'invalidEmailFormat',
                password: 'password123',
                passwordConfirm: 'password123'
            }
                console.log(userData, 'user data')
            try{
                const res = await request.post('/signup').send(userData)
                console.log(res.body, 'response')
                expect(res.status).toBe(400)
                expect(res.body.status).toBeDefined()
                expect(res.body.error.status).toBe('fail')
                expect(res.body.error.statusCode).toBe(400)
                expect(res.body.message).toContain('User validation failed: email: Please provide a valid email')
            }catch(err){
                console.log('Error during user sign up:', err)
                throw err;

            }
        })
            it.only('should not create a new user if password shorter than 8 characters', async () => {
            const userData = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'short',
                passwordConfirm: 'short'
            }
            console.log(userData, 'user data')
            try{
                const res = await request.post('/signup').send(userData)
                console.log(res.body, 'response')
                expect(res.status).toBe(400)
                expect(res.body.status).toBeDefined()
                expect(res.body.error.status).toBe('fail')
                expect(res.body.error.statusCode).toBe(400)
                expect(res.body.message).toContain('User validation failed: password')
            }catch(err){
                console.log('Error during user sign up:', err)
                throw err;

            }
    })
        it('should not create a new user if password longer then 30 characters', async () => {
            const userData = { 
                name: 'Test User',
                email: 'test@example.com',
                password: 'longeeeeeeeeeeeeeeeeeeeeeeeeeeerPasswoooooord12345',
                passwordConfirm: 'longeeeeeeeeeeeeeeeeeeeeeeeeeeerPasswoooooord12345'
            }
            console.log(userData, 'user data')
            try{
                const res = await request.post('/signup').send(userData)
                console.log(res.body, 'response')
                expect(res.status).toBe(400)
                expect(res.body.status).toBeDefined()
                expect(res.body.error.status).toBe('fail')
                expect(res.body.error.statusCode).toBe(400)
                expect(res.body.message).toContain('Password longer then 30 characters')
            }catch(err){
                console.log('Error during user sign up:', err)
                throw err;
            }
        })
            it('should not create a new user if passwordConfirm doeas not match password', async () => {
            const userData = { 
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                passwordConfirm: 'differentPassword123'
            }
            console.log(userData, 'user data')
            try{
                const res = await request.post('/signup').send(userData)
                console.log(res.body, 'response')
                expect(res.status).toBe(400)
                expect(res.body.status).toBeDefined()
                expect(res.body.error.status).toBe('fail')
                expect(res.body.error.statusCode).toBe(400)
                expect(res.body.message).toContain('User validation failed: passwordConfirm: Passwords are not the same!')
            }catch(err){
                console.log('Error during user sign up:', err)
                throw err;
            }
        })
    })
            it('should not create a new user if email already in registered', async () => {
            const userData = { 
                name: 'Test User',
                email: 'test@example.com', 
                password: 'password123',
                passwordConfirm: 'password123'
            }
            try{
                const res = await request.post('/signup').send(userData)
                console.log(res.body, 'response')
                expect(res.status).toBe(400)
                expect(res.body.status).toBeDefined()
                expect(res.body.error.status).toBe('fail')
                expect(res.body.error.statusCode).toBe(400)
                expect(res.body.message).toContain('This email is already in use. Please use another email')
            }catch(err){
                console.log('Error during user sign up:', err)
                throw err;
            }
        })
       
    
    