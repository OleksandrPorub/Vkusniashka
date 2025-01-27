import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
const ADMIN_LOGIN = process.env.ADMIN_LOGIN;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const authConfig:AuthOptions = {
    providers: [
        // GoogleProvider({
        //     clientId: "",
        //     clientSecret: "",
        // }),
        CredentialsProvider({
            name:"Credentials",
            credentials: {
                login: { label: "login", type: "text",required:true },
                password: { label: "password", type: "password", required:true },
            },
            async authorize(credentials, req) {
                if (credentials?.login === ADMIN_LOGIN && credentials?.password === ADMIN_PASSWORD) {
                    // const user = { id: "1", name: credentials.login, email: "vkusniashka@gmail.com", type: "admin" };
                    const user = { id: "admin", name: credentials?.login, password: credentials?.password };
                    return user as User;
                } else return null;
            },
        }),
    ],
    // pages:{
    //     signIn:"/signIn"
    // }
};
