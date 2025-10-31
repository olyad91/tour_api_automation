import {getUser, login, signUp} from "./helper/user" 

describe("LOGIN", () => {
    const user = getUser('admin')
    it("should sign up, and login", async () => {
        try {
         const res = await signUp(user)
         expect(res.status).toBe(201)
         const loginRes = await login(user)
         expect(loginRes.status).toBe(200)
         console.log(loginRes.body)
        } catch (error) {
            console.log(error);
            throw error;
        }
    })

    it("should sign up, and login using. then() ", async () => { 
        return signUp(user)
        .then((res)=>{
            console.log(res.body)
            expect(res.status).toBe(201)
            expect(res.body.data.user.email).toBe(user.email.toLowerCase())
            expect(res.body.status).toBe("success")
            return login(user)
        })
        .then((loginRes)=>{
            console.log(loginRes.body, 'login')
            expect(loginRes.status).toBe(200)
            expect(loginRes.body.data.user.email).toBe(user.email.toLowerCase())
            expect(loginRes.body.status).toBe("success")
        })
    })

    it.only("should sign up, and login using. end() ",  (done) => { 
        signUp(user)
        .end((err, res)=>{
            if(err) return done(err)
                expect(res.body.data.user.email).toBe(user.email.toLowerCase())
                expect(res.body.status).toBe("success")
                login(user)
                .end((err, res)=>{
                    if(err) return done(err)
                        expect(res.body.data.user.email).toBe(user.email.toLowerCase())
                        expect(res.body.status).toBe("success")
                        done()
                })
                done()
    })
    })
})

//home work user sign up negative переписали и отправить методы написать красиво как в login 