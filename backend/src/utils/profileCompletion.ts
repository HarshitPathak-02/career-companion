export const calculateProfileCompletion = (
    profile: any
): number => {

    const fields = [
        "headline",
        "bio",
        "phone",
        "dateOfBirth",
        "gender",
        "location",
    ];


    let completed = 0;


    fields.forEach((field)=>{
        if(profile[field]){
            completed++;
        }
    });


    return Math.round(
        (completed / fields.length) * 100
    );
};