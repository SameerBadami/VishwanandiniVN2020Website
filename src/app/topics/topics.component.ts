import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  public displayLanguage : any = '';
  public topicInfo: any;
  public topicId:any;
  public topicsPosts: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private ngxLoader: NgxUiLoaderService
  ) {

  }

  ngOnInit(): void {
    this.getSelectedLanguage();
  }

  getSelectedLanguage(){
    var lang = sessionStorage.getItem('userLanguageSelected');
    //this.displayLanguage = lang;
    if(lang == 'KANNADA'){
      this.displayLanguage = 'KANNADA';
    } else if(lang == 'ENGLISH'){
      this.displayLanguage = 'ENGLISH';
    } else if(lang == 'TELUGU'){
      this.displayLanguage = 'TELUGU';
    } else if(lang == 'TAMIL'){
      this.displayLanguage = 'TAMIL';
    } else if(lang == 'HINDI'){
      this.displayLanguage = 'HINDI';
    } else {
      this.displayLanguage = 'KANNADA';
    }
    this.topicId = sessionStorage.getItem('TopicId');
    const  newJSON  =sessionStorage.getItem('TopicInfo');
    const newPlay = JSON.parse(newJSON)
    this.topicInfo = newPlay;
    if(this.topicId == null || this.topicId == undefined || this.topicId == ''){
      //this.topicId = sessionStorage.getItem('TopicId');
      //this.getSelectedLanguage();
      this.router.navigate(['/']);
    } else {
      this.getTopicsPosts();
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

  getTopicsPosts(){
    //topicsPosts
    this.ngxLoader.start();
    this.http.get('https://www.vishwanandini.com/api/getAllTopicsPostWithDescription/'+this.topicId).subscribe( (resp: any) =>{
       this.topicsPosts = resp;
       this.ngxLoader.stop();
    });
  }

  goToPosts(val){
    const json = JSON.stringify(val.postId);
    sessionStorage.setItem('PostID', json);
    this.router.navigate(['/posts']);
  }


}
