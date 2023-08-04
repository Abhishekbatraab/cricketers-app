export const calculateAge = (dob) => {
    dob = new Date(dob);
    const birthyear = dob.getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthyear;
    return age
}

export const getDOB = (dob) => {
    dob = new Date(dob);
    const birthDate = dob.getDate();
    const birthyear = dob.getFullYear();
    let birthMonth = dob.getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    birthMonth = monthNames[birthMonth];
    return `${birthDate}, ${birthMonth}, ${birthyear}`
}