import { Collection, MongoClient, ObjectId } from "mongodb";
import { getUser, signUp } from "../helper/user";

const dotenv = require('dotenv');
dotenv.config();

describe("MongoDB Connection and Operation", () => {
    let connection;
    let db;
    beforeAll(async () => {
try {
    connection = await MongoClient.connect(process.env.DATABASE_URL)
           db = await connection.db()
            } catch (error) {
              console.log(error)
              throw error;
            }
    })
    afterAll(async () => {
            await connection.close()  
    })
    it('find user using query', async () => {
        const users = await db.collection('users');
       // console.log(users, 'users collection');
        const user = await users.findOne({name: 'Samir59'})
        console.log(user, 'found user');
        expect(user.name).toBe('Samir59');
    })

    it('create new user with imported and data', async () => {
        const userImport = getUser('admin')
        console.log(userImport, 'imported user data');

        try {
            const res = await signUp(userImport)
            expect(res.status).toBe(201)
            console.log(res.body, 'signup response');
            const users = db.collection('users');
            const userData = await users.findOne({name: userImport.name})
            console.log(userData, 'user data from DB');
            if (!userData) {
                throw new Error('User not found in DB');
            }
            expect (userData.name).toBe(userImport.name);
            expect (userData.email).toBe(userImport.email.toLowerCase());
            expect (userData.role).toBe('admin');
            expect(userData._id.toString()).toEqual(res.body.data.user._id);
            let deleteData = await users.deleteOne({_id: new ObjectId(userData._id)});
            console.log(deleteData, 'deleteData')
            let findUser = await users.findOne({ _id: userData._id });
            console.log(findUser, 'findUser after delete');
            expect(findUser).toBeNull();
        } catch (error) {
            //console.log(error) ???
           // throw new Error(`Error during user creation test: ${error}`); ????

        }
    })
    it('find existing tour', async () => { //find existing tour
        const tours = db.collection('tours');
        const tourData = await tours.findOne({ name: 'Tour Name' });
        expect(tourData).toBeNull();
    })

})
