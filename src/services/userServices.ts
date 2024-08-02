import { UserInterface } from '../interfaces/interfaces';
import { userModel } from '../schemas/userSchema';
import { APIError } from '../utils/utils';
const bcrypt = require('bcryptjs');

export class User {
    static async getUserList(){
        const allUsers = await userModel.find();
        return allUsers;
    }

    static async getUser(id:string){
        const user = await userModel.findById(id);
        if (!user) 
            throw new APIError('Cannot find user', 404, true);
        return user;
    }

    static async createUser(user:UserInterface){
        try {
            const hashedPassword = await bcrypt.hash(user.password, parseInt(process.env.SALT_ROUNDS as string)); //, function(_err, hash) { hashedPassword = hash; }
            const newUser = new userModel({ ...user, password: hashedPassword});
            const insertedUser = await newUser.save();
            return insertedUser;
        } catch (error) {
            throw new APIError('Unexpected error while creating new user', 500, true);
        }
    }

    static async updateUser(user:UserInterface){
        try {
            const updatedUser = await userModel.findByIdAndUpdate(user._id, user, { new: true });
            return updatedUser;
        } catch (error) {
            throw new APIError('Unexpected error while updating user, make sure that the user exist in the Database', 500, true);
        }
    }

    static async deleteUser(id:string){
        const deletedUser = await userModel.findByIdAndDelete(id);
        if (!deletedUser) 
            throw new APIError('Cannot delete user because it does not exist', 404);
        return deletedUser;
    }
}
