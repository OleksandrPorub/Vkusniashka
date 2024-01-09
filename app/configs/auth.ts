import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

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
                if (credentials?.login === "admin" && credentials?.password === "vkus458") {
                    // const user = { id: "1", name: credentials.login, email: "vkusniashka@gmail.com", type: "admin" };
                    const user = { name: credentials.login };
                    return user as User;
                } else return null;
            },
        }),
    ],
    // pages:{
    //     signIn:"/signIn"
    // }
};
