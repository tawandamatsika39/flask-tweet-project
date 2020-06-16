import { Component, OnInit } from '@angular/core';
import { TweetService } from '../services/tweet.service';
import { UserTweet } from '../api/user';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  activeUser: string;
  _usersMap: any;
  _tweetsMap: any;
  users: string[];
  followers;
  friendsTweets;

  constructor(private tweetService: TweetService) { }

  async ngOnInit() {
    this._usersMap = await this.tweetService.getAllUsers();
    this._tweetsMap = await this.tweetService.getTweets();
    this.users = Object.keys(this._usersMap);
    this.followers = this.getFollowersList(this.activeUser);
  }

  getUsers(){
    this.tweetService.getAllUsers().then(res => {
      this._usersMap = res;
      this.users = Object.keys(this._usersMap);
    }).catch((error)=> {
      console.log(error.message);
    })
  }

  getTweets(){
    this.tweetService.getTweets().then(res => {
      this._tweetsMap = res;
    }).catch((error) => {
      console.log(error.message);
    })
  }

  getSortedFriendsPosts(friends : string []) {
    let timeline = [];
    if(friends != null){
    for(let i = 0; i < friends.length;i++){
      let userTweets: UserTweet[] = this._tweetsMap[friends[i]];
      if(userTweets != null){
        for(let j = 0; j < userTweets.length; j++){
          let tweet = {name:'', details: <UserTweet>[]};
          tweet.name = friends[i];
          tweet.details = userTweets[j];
          timeline.push(tweet);
        }
      }
    }
  }
    return timeline.sort((a,b) => {
      if((a.details != null) && (b.details != null)){
        return new Date(a.details.time).getTime() - new Date(b.details.time).getTime();
      }
    });
  
  }

  getFollowersList(username: string){
    return username != null ? this._usersMap[username]:undefined;
  }

}
