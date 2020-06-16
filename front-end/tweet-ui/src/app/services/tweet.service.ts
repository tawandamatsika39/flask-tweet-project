import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TweetService {

    private readonly basePath: string = 'http://127.0.0.1:5000';
    private readonly usersPath: string = 'users';
    private readonly usersPosts: string = 'posts';

    constructor(private http: HttpClient){
    }

    getAllUsers(){
        return this.http.get(`${this.basePath}/${this.usersPath}`).toPromise();
    }


    getTweets(){
        return this.http.get(`${this.basePath}/${this.usersPosts}`).toPromise();
    }
}