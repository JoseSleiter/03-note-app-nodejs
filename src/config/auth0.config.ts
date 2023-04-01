import dotenv from 'dotenv';
dotenv.config();

const auth0Config = {
    authRequired: Boolean(process.env.AUTH_REQUIRED) ?? false,
    auth0Logout: Boolean(process.env.AUTH0_LOGOUT) ?? true,
    secret: process.env.SECRET ?? '',
    baseURL: process.env.BASE_URL ?? '',
    clientID: process.env.CLIENT_ID ?? '',
    issuerBaseURL: process.env.ISSUER_BASE_URL ?? '',
};

export { auth0Config }