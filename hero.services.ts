import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HeroService{
    constructor(private http:HttpClient){}
    
     getUsers(){
        return this.http.get("http://localhost:2525/")
     }
     postUser(user){
        return this.http.post("http://localhost:2525/", user);
     }
     getSelectedUser(user){
         return this.http.get("http://localhost:2525/"+user['_id']);
     }
     modifyUser(user){
         return this.http.post("http://localhost:2525/"+user['_id'], user);
     }
     deleteUserService(user){
         return this.http.get("http://localhost:2525/delete/"+user['_id'], user);
     }

}
