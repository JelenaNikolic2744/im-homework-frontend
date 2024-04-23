import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  file: any;
  selectedFiles?: FileList;
  fileArray: any[] = [];
  ifMinimum = false
  upload = true
  url:any
  previews:any=[]

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }


  uploadImage(event: any) {
    this.ifMinimum = true
    this.selectedFiles = event.target.files;
    this.fileArray.push(event.target.files)

    for (let i = 0; i < this.selectedFiles!.length; i++) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.previews.push(e.target.result);
      };

      reader.readAsDataURL(this.selectedFiles![i]);
    }
    
  }

  cancelAll(){
    // this.selectedFiles = new FileList
    this.previews = []
    this.fileArray = []
  }

  validateImages() {
    if (this.file.length === 5) {
      this.upload = false
    }
  }

  resize(){
    //console.log(this.fileArray);
    this.apiService.resizeAndUpload(this.fileArray).subscribe({
      next: (data) => {
        console.log('registered');
      },
      error: (e) => {
        console.log(e);
      },
    })
    
  }

  download(){}

}
