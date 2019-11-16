import { Component, Inject } from '@angular/core';
import { fromEvent, Observable, throwError } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { getBaseUrl } from 'src/main';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  files: File[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  containers: ContainerInfo[] = []
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  imageToBase64(fileReader: FileReader, fileToRead: File): Observable<string> {
    console.log(fileToRead);
    fileReader.readAsDataURL(fileToRead);
    return fromEvent(fileReader, 'load').pipe(pluck('currentTarget', 'result'));
  }

  uploadFile(event) {
    if (event[0].type.includes('image/')) {
      const element = event[0];
      this.files.push(element)
    }
  }
  deleteAttachment(index) {
    this.files.splice(index, 1)
  }

  onSubmit() {
    console.log(this.files);
    if (this.files.length > 0) {
      const fileReader = new FileReader();
      let imageToUpload = this.files[0];
      const img: BaseImage = { in_base64_string: '' };
      this.imageToBase64(fileReader, imageToUpload)
        .subscribe(base64image => {
          img.in_base64_string = base64image.split("base64,")[1];
          const header = new HttpHeaders()
            .set('Content-type', 'application/json');
          console.log(img);
          console.log(JSON.stringify(img));
          this.http.post<ContainerInfo[]>(this.baseUrl + "baseimage", JSON.stringify(img), { headers: header }).subscribe(response => {
            console.log(response);
            this.containers = response;
          }, error => { console.log(error) });
        });
      console.log(this.containers);
      this.containers.forEach(container => {
        switch (container.containerSize) {
          case 1:
            container.containerSizeString = 'S';
            break;
          case 2:
            container.containerSizeString = 'M';
            break;
          case 3:
            container.containerSizeString = 'L';
            break;
          case 4:
            container.containerSizeString = 'XL';
            break;
          default:
            container.containerSizeString = '';
            break;
        }
      });
      console.log(this.containers);
    }
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

interface BaseImage {
  in_base64_string: string;
}

interface ContainerInfo {
  containerPrice: number;
  containerSize: number;
  containerType: string;
  containerSizeString: string;
  remaining: string[];
}