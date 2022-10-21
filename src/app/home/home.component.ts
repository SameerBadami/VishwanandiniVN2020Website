import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public displayLanguage = 'KANNADA';
  public topicsData: any;
  public topicIconImagePathUrl: any ;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
     this.getImageIconPath();
  }

  getImageIconPath(){
    this.http.get('http://3.109.163.108:3000/api/topicsImageViewIconPath').subscribe( (resp: any) =>{
      this.topicIconImagePathUrl = resp;
      if(this.topicIconImagePathUrl == '' || this.topicIconImagePathUrl == null || this.topicIconImagePathUrl == undefined){
        this.getImageIconPath();
      } else {
        this.getAllBlogs();
      }
    });
  }

  getAllBlogs(){
    let a = this.topicIconImagePathUrl.path;
    this.http.get('http://3.109.163.108:3000/api/getAllPublishedTopicsAPI').subscribe( (resp: any) =>{
      resp.forEach(function (value) {
            value.topicIconImagePath = a+'/'+value.topicIconImageName;
       });
       this.topicsData = resp;
      console.log("HERERERER---"+JSON.stringify(resp));
    });
  }

  changeToKannada(){
    this.displayLanguage = 'KANNADA';
  }

  changeToEnglish(){
    this.displayLanguage = 'ENGLISH';
  }

  changeToTelugu(){
    this.displayLanguage = 'TELUGU';
  }

  changeToTamil(){
    this.displayLanguage = 'TAMIL';
  }

  changeToHindi(){
    this.displayLanguage = 'HINDI';
  }

}
