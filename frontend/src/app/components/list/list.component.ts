import { Component, OnInit } from '@angular/core';
import { VideoserviceService } from '../../services/videoservice.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  searchResult:Array<any>=[]
  constructor(private videoService: VideoserviceService) { }
  ngOnInit(): void {
    let videoList =  this.videoService.getVideoList().subscribe(data =>{
      this.searchResult = data.result;
     })
  }

  showDetails(videourl:string){
    this.videoService.routetodetailPage(videourl)
  }

  savedata(videourl:String){
    this.videoService.saveVideoDeatils(videourl).subscribe(data=>{
      console.log(data);
    });
  }
}
