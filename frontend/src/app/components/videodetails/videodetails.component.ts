import { Component, OnInit } from '@angular/core';
import { VideoserviceService } from '../../services/videoservice.service'
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videodetails',
  templateUrl: './videodetails.component.html',
  styleUrls: ['./videodetails.component.css']
})
export class VideodetailsComponent implements OnInit {
  searchResult:Array<any>=[]
   safeSrc: SafeResourceUrl = ''
   safeUrl : string = ''
  constructor(private route:Router, private videoservice: VideoserviceService,private sanitizer: DomSanitizer) { 
    
  }

  ngOnInit(): void {
  
    let id = this.route.url.split('/')[2];
    let data = this.videoservice.getVideoDeatil(id).subscribe(data=>{
      this.searchResult = data.result;
     
     this.safeUrl = data.result[0].embededUrl + "?autoplay=1"
    })
  }
  transform(safeUrl: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(safeUrl);
  }
}
