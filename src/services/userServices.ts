import usersJson from '../data/usersData.json';
import { UserInterface } from '../interfaces/interfaces';

export class User {
    static getuserList():UserInterface[]{
        return usersJson;
    }

    static getuser(id:number):UserInterface{
        const user: UserInterface | undefined = usersJson.find(user => user.id === id);
        if (!user) 
            throw new Error('Cannot find user');
        return user;
    }

    static createuser(user:UserInterface):UserInterface{
        //Add user and return it
        return user;
    }

    static updateuser(user:UserInterface):UserInterface{
        //Update user and return it
        return user;
    }

    static deleteuser(id:number){
        //Delete user
        console.log(id)
    }
}
