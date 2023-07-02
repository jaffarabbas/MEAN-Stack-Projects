export class ApiUrls{
    public static API_URL = 'http://localhost:3000/blogs-app/v1/api/';
    public static API_CONTROLLERS = {
        user: 'user',
        blogs: 'blogs',
    };
    public static API_ENDPOINTS = {
        user:{
            login: 'login',
            register: 'register',
            sendResetPasswordEmail: 'send-reset-password-email',
            resetPassword: 'reset-password',
            changePassword: 'changePassword',
            loggedUser: 'loggedUser',
        },
        blogs:{
            add: 'add',
            update: 'update',
        }
    };
}