export const validateUsername = (login: string | null, setUsernameError: (e: string) => void) => {
    if(!login) {
        setUsernameError('Username can not be empty!');
    }
};

export const validatePassword = (password: string | null, setPasswordError: (e: string) => void) => {
    if(!password) {
        setPasswordError('Password can not be empty!');
        return;
    }
    if(password?.length < 8) {
        setPasswordError('Password has to have at least 8 characters!');
    }
};

export const validatePhone = (phone: string | null, setPhoneError: (e: string) => void) => {
    if(!phone) {
        setPhoneError('Phone number can not be empty!');
        return;
    }
    if(phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
        setPhoneError('Phone is not valid phone number!');
    }
}

export const validateMail = (mail: string | null, setMailError: (e: string) => void) => {
    if(!mail) {
        setMailError('Mail can not be empty!');
        return;
    }
    if(!mail.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
        setMailError('Mail is not valid email address!');
    }
};

export const validatePasswords = (password: string | null, passwordAgain: string | null, setPasswordsError: (e: string) => void) => {
    if(password !== passwordAgain) {
        setPasswordsError('Passwords should match!');
    }
};
