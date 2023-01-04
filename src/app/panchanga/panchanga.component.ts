import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-panchanga',
  templateUrl: './panchanga.component.html',
  styleUrls: ['./panchanga.component.css']
})
export class PanchangaComponent implements OnInit {

  public displayLanguage : any;
  public panchangaData: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private ngxLoader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    //sessionStorage.setItem('userLanguageSelected', 'KANNADA');
    this.getSelectedLanguages();
    this.getPanchanga();
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

  getPanchanga(){
    this.ngxLoader.start();
    this.http.get('https://www.vishwanandini.com/api/getLastPublishedpanchanga').subscribe( (resp: any) =>{
      this.panchangaData = resp;
      this.ngxLoader.stop();
    });
  }

}
