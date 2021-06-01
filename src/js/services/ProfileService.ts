import {PlainObject} from "../types/interfaces/PlainObject";


export function formatProfileData(profilesList: Array<PlainObject>): Array<PlainObject> {
    let formattedProfiles: Array<PlainObject> = [];

    if (profilesList.length > 0) {
        formattedProfiles = profilesList.map((profile => {
            let newProfile: PlainObject = {};

            newProfile["profileId"] = profile.id && profile.id;
            newProfile["dateOfBirth"] = profile.dateOfBirth && profile.dateOfBirth;
            newProfile["specialities"] = profile.specialities && profile.specialities;
            newProfile["userId"] = profile.user && profile.user.id && profile.user.id;
            newProfile["firstName"] = profile.firstName ? profile.firstName : "no name";
            newProfile["lastName"] = profile.lastName ? profile.lastName : "no name";
            newProfile["email"] = profile.email ? profile.email : "no email";
            newProfile["telephone"] = profile.telephone ? profile.telephone : "no telephone";
// console.log("111111111111111111111", profile)
//             console.log("22222222222222222222222222222222222222", newProfile)
            return newProfile
        }));
    }

    return formattedProfiles;
}

export function findProfileById(profileId: number, profilesList: Array<PlainObject>): PlainObject {
    let searchResult: PlainObject = {};

    profilesList.forEach(profile=> {
        if (profile.id && profile.id === profileId) {
            searchResult = profile;
        }
    })

    return searchResult;
}