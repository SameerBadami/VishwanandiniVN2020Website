import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
     this.getImageIconPath();
     sessionStorage.setItem('ProductName', 'Mobile');
     sessionStorage.setItem('userLanguageSelected', 'KANNADA');
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
    var ProductName = sessionStorage.getItem('ProductName');
    console.log("local session ---"+ProductName);
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
    alert("here"+val);
    this.router.navigate(['/topics']);
  }

}
