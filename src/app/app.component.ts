import { Component } from '@angular/core';
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
  url: any
  previews: any = []
  selected = 'HD';
  resizeSize: any[] = [
    { value: 'vga', viewValue: 'VGA' },
    { value: 'hd', viewValue: 'HD' },
    { value: 'fullHD', viewValue: 'fullHD' },
  ];

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

  cancelAll() {
    this.previews = []
    this.fileArray = []
  }

  validateImages() {
    if (this.file.length === 5) {
      this.upload = false
    }
  }

  resize() {
    let width = 0
    let height = 0

    if (this.selected === 'vga') {
      width = 640
      height = 480
    }
    if (this.selected === 'hd') {
      width = 1280
      height = 720
    }
    if (this.selected === 'fullHD') {
      width = 1920
      height = 1080
    }

    let files = this.sortFilesForSend(width, height)

    this.apiService.resizeAndUpload(files).subscribe({
      next: (data) => {
        console.log('registered');
      },
      error: (e) => {
        console.log(e);
      },
    })
  }

  sortFilesForSend(width: any, height: any) {
    let formData = new FormData();
    let temp: any[] = []

    for (let i = 0; i < this.fileArray[0].length; i++) {
      temp.push(this.fileArray[0][i])
    }

    temp.forEach((file: any) => {
      formData.append('files[]', file);

    });

    formData.append('height', height);
    formData.append('width', width)

    return formData
  }

  download() { }
}
