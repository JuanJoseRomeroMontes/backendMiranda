import { UserInterface } from '../interfaces/interfaces';
import { userModel } from '../schemas/userSchema';

export class User {
    static async getUserList(){
        const allUsers = await userModel.find();
        return allUsers;
    }

    static getUser(id:number){
        const user = userModel.findById(id);
        if (!user) 
            throw new Error('Cannot find user');
        return user;
    }

    static async createUser(user:UserInterface){
        const newUser = new userModel({ ...user });
        const insertedUser = await newUser.save();
        return insertedUser;
    }

    static async updateUser(user:UserInterface){
        const id = user.id;
        await userModel.updateOne({ id }, user);
        const updatedUser = await userModel.findById(id);
        return updatedUser;
    }

    static async deleteUser(id:number){
        const deletedUser = await userModel.findByIdAndDelete(id);
        if (!deletedUser) 
            throw new Error(`Cannot delete user because it doesn't exist`);
        return deletedUser;
    }
}
