import { Document } from "mongoose";
import Users, { IUser } from "../repositories/user.repository";
import { createJwtAccessToken } from "../configs/auth.config";
import UserRole, { IRole } from "../repositories/role.repository";

class AuthService {
    constructor() { }

    findUser = async (email: string): Promise<IUser | null> => {

        try {
            let role: IRole;
            const user: IUser = await Users.findOne({
                email, isDeleted: false,
            }).populate({ path: 'userRole' });
            console.log(user);
            return user;
        } catch (err: unknown) {
            console.error(err);
            return null;
        }
    }
    findUserById = async (id: string): Promise<IUser | null> => {

        try {
            const user: IUser = await Users.findOne({
                _id: id, isDeleted: false,
            });
            console.log(user);
            return user;
        } catch (err: unknown) {
            console.log("findUserById err")
            console.error(err);
            return null;
        }
    }
    createUser = async (userData: IUser): Promise<Document<IUser> | null> => {

        try {
            const createUser = new Users(userData);
            const createdUser: Document<IUser> = await createUser.save() as Document<IUser>;
            return createdUser;

        } catch (err: unknown) {
            console.error(err)
            return null;
        }
    }

    generateSaveAccessToken = async (user: IUser): Promise<Document<IUser, {}> | null> => {
        try {
            const token: string = createJwtAccessToken({ email: user.email });
            user.token = token;
            const userData = await user.save() as Document<IUser, {}>;
            return userData;

        } catch (err: unknown) {
            console.error(err)
            return null;
        }
    }
    removeTokens = async (user: IUser): Promise<boolean> => {

        try {
            user.token = "";
            user.refreshToken = "";
            const updatedUser = await user.save();
            if (updatedUser)
                return true;
            return false
        } catch (err: unknown) {
            console.error(err)
            return null;
        }
    }
    getRole = async (role: string): Promise<IRole | null> => {
        try {

            return await UserRole.findOne({ role });
        } catch (err: unknown) {
            console.error(err)
            return null;
        }
    }
}

export default new AuthService();