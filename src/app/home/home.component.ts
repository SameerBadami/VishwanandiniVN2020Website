import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //public displayLanguage = 'KANNADA';
  public displayLanguage : any;
  public topicsData: any;
  public topicIconImagePathUrl: any ;

  constructor(
    private router: Router,
    private http: HttpClient,
    private ngxLoader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
     this.getSelectedLanguages();
     this.getImageIconPath();
     //sessionStorage.setItem('userLanguageSelected', 'KANNADA');
  }

  getSelectedLanguages(){
    //this.displayLanguage = 'KANNADA';
    let lang = sessionStorage.getItem('userLanguageSelected');
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
  }

  getImageIconPath(){
    this.http.get('https://www.vishwanandini.com/api/topicsImageViewIconPath').subscribe( (resp: any) =>{
      this.topicIconImagePathUrl = resp;
      if(this.topicIconImagePathUrl == '' || this.topicIconImagePathUrl == null || this.topicIconImagePathUrl == undefined){
        this.getImageIconPath();
      } else {
        this.getAllBlogs();
      }
    });
  }

  getAllBlogs(){
    this.ngxLoader.start();
    var ProductName = sessionStorage.getItem('ProductName');
    let a = this.topicIconImagePathUrl.path;
    this.http.get('https://www.vishwanandini.com/api/getAllPublishedTopicsAPI').subscribe( (resp: any) =>{
      resp.forEach(function (value) {
            value.topicIconImagePath = a+'/'+value.topicIconImageName;
       });
       this.topicsData = resp;
       this.ngxLoader.stop();
    });
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

  goToTopics(val){
    var info = {
                  "tnkannada":val.tnkannada,
                  "tnhindi":val.tnhindi,
                  "tndevanagari":val.tndevanagari,
                  "tntamil":val.tntamil,
                  "tntelugu":val.tntelugu,
                  "tnenglish":val.tnenglish
    };
    const json = JSON.stringify(info);
    sessionStorage.setItem('TopicInfo', json);
    sessionStorage.setItem('TopicId', val.topicId);
    this.router.navigate(['/topics']);
  }
}
