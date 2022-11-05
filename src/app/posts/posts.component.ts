import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';


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
  public pdfUrl = 'http://3.109.163.108:3000/api/sendMePdf/'

  constructor(
    private scroller: ViewportScroller,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private ngxLoader: NgxUiLoaderService
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
      //this.postId = sessionStorage.getItem('TopicId');
      //this.getSelectedLanguage();
      this.router.navigate(['/']);
    } else {
      this.updatePostViews();
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

  goToCommentsScroll(){
    this.scroller.scrollToAnchor("targetRed");
  }

  goToAudioScroll(){
    this.scroller.scrollToAnchor("audio");
  }

  goToVideoScroll(){
    this.scroller.scrollToAnchor("video");
  }

  goToPDFScroll(){
    this.scroller.scrollToAnchor("pdf");
  }


  getIndividualPosts(){
    this.ngxLoader.start();
    this.http.get('http://3.109.163.108:3000/api/getIndividualPostDetailsAPI/'+this.postId).subscribe( (resp: any) =>{
       this.topicsPosts = resp;
       this.topicsPosts[0].postAudioName = this.audioUrl+this.topicsPosts[0].postAudioName;
       this.topicsPosts[0].postPdfName = this.pdfUrl+this.topicsPosts[0].postPdfName;
       this.ngxLoader.stop();
    });
  }

  getAllIndividualPostsComments(){
    this.http.get('http://3.109.163.108:3000/api/getAllSpecificPostComments/'+this.postId).subscribe( (resp: any) =>{
       this.allPostCommentsDisplayData = resp;
    });
  }

  updatePostViews(){
    var headers = new HttpHeaders();
    headers.append('content-Type', 'application/json');
    this.http.put('http://3.109.163.108:3000/api/updatePostViews/'+this.postId, {headers: headers}).subscribe( (resp: any) =>{
    });
  }

  getTrustedUrl(value){
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

}
