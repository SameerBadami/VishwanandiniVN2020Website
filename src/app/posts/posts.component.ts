import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public displayLanguage : any = '';
  public postId:any;
  public topicsPosts: any;
  public allPostCommentsDisplayData: any;
  public audioUrl = 'http://3.109.163.108:3000/api/sendMeAudio/';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getSelectedLanguage();
  }

  getSelectedLanguage(){
    var lang = sessionStorage.getItem('userLanguageSelected');
    this.displayLanguage = lang;
    //this.postId = sessionStorage.getItem('PostID');
    const  newJSON  =sessionStorage.getItem('PostID');
    const newPlay = JSON.parse(newJSON)
    this.postId = newPlay;
    if(this.postId == null || this.postId == undefined || this.postId == ''){
      this.postId = sessionStorage.getItem('TopicId');
      this.getSelectedLanguage();
    } else {
      this.getIndividualPosts();
      this.getAllIndividualPostsComments();
    }
  }

  changeToKannada(){
    this.displayLanguage = 'KANNADA';
    sessionStorage.setItem('userLanguageSelected', 'KANNADA');
  }

  changeToEnglish(){
    this.displayLanguage = 'ENGLISH';
    sessionStorage.setItem('userLanguageSelected', 'ENGLISH');
  }

  changeToTelugu(){
    this.displayLanguage = 'TELUGU';
    sessionStorage.setItem('userLanguageSelected', 'TELUGU');
  }

  changeToTamil(){
    this.displayLanguage = 'TAMIL';
    sessionStorage.setItem('userLanguageSelected', 'TAMIL');
  }

  changeToHindi(){
    this.displayLanguage = 'HINDI';
    sessionStorage.setItem('userLanguageSelected', 'HINDI');
  }


  getIndividualPosts(){
    this.http.get('http://3.109.163.108:3000/api/getIndividualPostDetailsAPI/'+this.postId).subscribe( (resp: any) =>{
       this.topicsPosts = resp;
       this.topicsPosts[0].postAudioName = this.audioUrl+this.topicsPosts[0].postAudioName;
    });
  }

  getAllIndividualPostsComments(){
    this.http.get('http://3.109.163.108:3000/api/getAllSpecificPostComments/'+this.postId).subscribe( (resp: any) =>{
       this.allPostCommentsDisplayData = resp;
    });
  }

}
