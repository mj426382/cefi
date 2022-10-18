export const validateUsername = (login: string | null, setUsernameError: (e: string) => void) => {
    if (!login) {
        setUsernameError('Username can not be empty!');
    }
};

export const validatePassword = (password: string | null, setPasswordError: (e: string) => void) => {
    if (!password) {
        setPasswordError('Password can not be empty!');
        return;
    }
    if(password?.length < 8) {
        setPasswordError('Password has to have at least 8 characters!');
    }
};
