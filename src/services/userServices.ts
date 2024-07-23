import { UserInterface } from '../interfaces/interfaces';
import { userModel } from '../schemas/userSchema';
const bcrypt = require('bcrypt');

export class User {
    static async getUserList(){
        const allUsers = await userModel.find();
        return allUsers;
    }

    static getUser(id:string){
        const user = userModel.findById(id);
        if (!user) 
            throw new Error('Cannot find user');
        return user;
    }

    static async createUser(user:UserInterface){
        let hashedPassword;
        console.log("Moments before disaster "+process.env.SALT_ROUNDS);
        await bcrypt.hash(user.password, process.env.SALT_ROUNDS) //, function(_err, hash) { hashedPassword = hash; }
        console.log("Hash"+hashedPassword);
        const newUser = new userModel({ ...user, password: hashedPassword});
        const insertedUser = await newUser.save();
        return insertedUser;
    }

    static async updateUser(user:UserInterface){
        const id = user._id;
        await userModel.updateOne({ id }, user);
        const updatedUser = await userModel.findById(id);
        return updatedUser;
    }

    static async deleteUser(id:string){
        const deletedUser = await userModel.findByIdAndDelete(id);
        if (!deletedUser) 
            throw new Error(`Cannot delete user because it doesn't exist`);
        return deletedUser;
    }
}
