export const calculateAge = (dob) => {
    dob = new Date(dob);
    const birthyear = dob.getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthyear;
    return age
}