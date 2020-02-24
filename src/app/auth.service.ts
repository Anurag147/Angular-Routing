
//A fake service used for log in and log out a serve
export class AuthService{

    loggedIn=false;

    //Method to authenticate a user against a user
    isAuthenticate(){
        const promise = new Promise((resolve,reject)=>{
        setTimeout(()=>{
        resolve(this.loggedIn)
        },1000);
        });
        return promise;
    }

    login(){
        this.loggedIn=true;
    }

    logout(){
        this.loggedIn=false;
    }
}