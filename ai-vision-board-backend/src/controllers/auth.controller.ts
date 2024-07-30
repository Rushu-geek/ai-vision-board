import { NextFunction, Request, RequestHandler, Response } from "express";
import authService from "../services/auth.service";
import { IUser } from "../repositories/user.repository";
import { ServerActionResponse } from "../models/server.model";
import bcrypt from "bcrypt";
import { DOMAIN } from "../configs/env.config";

export class AuthController {

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            if (!(email || password)) {

                console.error("Email and Password inputs are required.");
                return res.status(400).json({ success: false, data: null, error: "Email and Password inputs are required." });
            }

            const user: IUser | null = await authService.findUser(email);
            console.log(user);

            if (!user) {
                console.error("User not found.");
                return res.status(400).json({ success: false, data: null, error: "User not found." });
            }

            if (user && bcrypt.compareSync(password, user.password) && user.isDeleted == false) {

                const updatedUser: IUser | null | {} = await authService.generateSaveAccessToken(user);
                if ("token" in updatedUser) {

                    // TODO  need to add domain in env.
                    res.cookie('jwt', updatedUser?.token, {
                        httpOnly: true,
                        domain: DOMAIN,
                        maxAge: 1000 * 60 * 60 * 24 * 10,
                        sameSite: 'lax',
                        // secure: true
                    });

                    if ("password" in updatedUser) {
                        const res = delete updatedUser.password
                        console.log(res)
                    }
                    console.log("updatedUser ")
                    console.log(updatedUser)

                    return res.status(200).json({ success: true, data: updatedUser, error: null, msg: "User Logged in Successfully." });
                }
            } else if (user && bcrypt.compareSync(password, user.password) && user.isDeleted == true) {

                console.error("User Does not exist");
                return res.status(400).json({ success: false, data: null, error: "User Does not exist" });
            }
            else {

                console.error("Invalid Login credentials.")
                res.status(400).json({ success: false, data: null, error: "Invalid Login credentials." });
            }
        } catch (err: unknown) {
            console.error(err)
            return res.status(400).json({ success: false, data: null, error: err, msg: "Unable to Login the User." });
        }
    }

    register = async (req: Request, res: Response) => {

        try {
            const saltRounds = 10;
            let userData: IUser = req.body;

            const { email, password } = userData;
            // TODO Add the condition for the required fields.
            if (!userData) {
                console.error("User Data are required.");
                return res.status(400).json({ success: false, data: null, error: "User Data are required." });
            }
            const user: IUser | null = await authService.findUser(email);
            console.log(user)

            if (user) {
                console.error("User already exists.");
                return res.status(400).json({ success: false, data: null, error: "User already exists." });
            }

            bcrypt.hash(password!, saltRounds, async (err: Error, hash: string) => {
                if (err) {
                    console.error("Error in bcrypt Pass hash")
                    console.error(err)
                    return res.status(400).json({ success: false, data: null, error: "Error in Password encryption" });
                } else {
                    try {
                        const encryptedPass: string = hash;
                        userData.password = encryptedPass;
                        const userRole = await authService.getRole(userData?.userRole);

                        userData.userRole = String(userRole?._id);
                        const createUser = await authService.createUser(userData);

                        if (createUser != null && (createUser && Object.keys(createUser).length > 0)) {

                            // if (userRole?.role.toLowerCase() == 'client') {
                            //     const createdClient = await authService.createClient(String(createUser?._id));
                            //     console.log('client Created.')

                            //     if (createdClient == null || (!createdClient || Object.keys(createdClient).length <= 0))
                            //         return res.status(400).json({ status: 400, success: false, data: null, error: "Error in creating the Trainer.Problem in registering the user." });
                            // }
                            // if (userRole?.role.toLowerCase() == 'trainer') {
                            //     const trainer = { ...userData?.trainer, userId: String(createUser?._id) } as ITrainer;
                            //     const createdTrainer = await authService.createTrainer(trainer);
                            //     console.log('trainer Created.')

                            //     if (createdTrainer == null || (!createdTrainer || Object.keys(createdTrainer).length <= 0))
                            //         return res.status(400).json({ status: 400, success: false, data: null, error: "Error in creating the Trainer.Problem in registering the user." });
                            // }
                            return res.status(200).json({ success: true, data: createUser, error: null });
                        }
                        else {
                            console.error("Error in Password encryption.Problem in registering the user.");
                            return res.status(400).json({ status: 400, success: false, data: null, error: "Error in Password encryption.Problem in registering the user." });
                        }
                    } catch (err: unknown) {
                        console.error(err)
                        return res.status(500).send({ success: false, data: [], error: err, msg: "Encountered error while registering the User." });
                    }
                }
            })
        }
        catch (err: unknown) {
            console.error(err)
            return res.status(400).json({ success: false, data: null, error: err, msg: "Unable to Register the User." });
        }
    }

    logout = async (req: Request, res: Response) => {
        try {

            console.log(req?.query?.id)

            res.cookie('jwt', null, {
                httpOnly: true,
                domain: DOMAIN,
                maxAge: 1000 * 60 * 60 * 24 * 10,
                sameSite: 'lax',
                // secure: true
            });

            const user: IUser | null = await authService.findUserById(String(req?.query?.id));
            console.log(user);

            if (!user) {
                console.error("User not found.");
                return res.status(400).json({ success: false, data: null, error: "User not found." });
            }

            const response = await authService.removeTokens(user);
            if (response) {
                console.log("User Logged out Successfully.");
                return res.status(200).json({ success: true, data: { id: user?.id }, error: null, msg: "User Logged out Successfully." });
            }
            console.error("Something went wrong while logging out the User.");
            return res.status(400).json({ success: false, data: null, error: "Something went wrong while logging out the User." });
        } catch (err: unknown) {
            console.error(err)
            return res.status(400).json({ success: false, data: null, error: err, msg: "Unable to logout the User." });
        }
    }
}