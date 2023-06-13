
const BASE_URL = 'http://localhost:3000/profiles';
export default class ProfilePersistService {

    async addProfile(profile) {
        let res;
        try{
        res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(profile)
        })
    }catch(er){
        alert(er)
    }
    return res;
    }

    async getProfileById(login){
        try{
        const prof = await fetch(`${BASE_URL}?login=${login}`);
        return prof.json();
        } catch (er){
            alert(er);
        }
    }

    async updateProfile(profile) {
    const urlForUpdate = `${BASE_URL}/${profile.id}`;
    let response;
    try{
    response = await fetch(urlForUpdate, {
        method: 'PUT',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(profile)
})
    } catch(er){
        alert(er)
    }
return response;
}

}