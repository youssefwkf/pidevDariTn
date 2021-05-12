import { Component, OnInit } from '@angular/core';
import {Surveillance} from '../../model/Surveillance';
import {ToastrService} from 'ngx-toastr';
import {ServiceSurveillance} from '../../service/surveillance/service-surveillance';


@Component({
  selector: 'app-gestion-surveillance',
  templateUrl: './gestion-surveillance.component.html',
  styleUrls: ['./gestion-surveillance.component.scss']
})
export class GestionSurveillanceComponent implements OnInit {
  selectedFile: File;
  selectedFile1: File;
  URL1: any;
  s: Surveillance = new Surveillance();
  table: string[];
  listSurveillanceAgent: Surveillance[];
  s1: Surveillance = new Surveillance();

  constructor(private ss: ServiceSurveillance, private notif : ToastrService) { }

  ngOnInit(): void {
    this.ss.surveillanceAgent().subscribe(rest => {
      console.log(rest), this.listSurveillanceAgent = rest
    });
    this.table = ['photo','productName','categorySurveillance',
      'codeSurveillance', 'price','capteur','indiceProtection','porteeInfrarouge',
      'resolution', 'jaime', 'jaimeplus'];
  }
  onFileChanged(event) {
    this.selectedFile1 = event.target.files[0];
    this.selectedFile = event.target.files;
    console.log(this.selectedFile);
    if(this.selectedFile) {
      var reader = new FileReader();
      reader.readAsDataURL(this.selectedFile[0])
      reader.onload = (e:any) => {
        this.URL1 = e.target.result;
      }
    }
  }

  save() {
    this.ss.addSurveillance(this.s, this.selectedFile1).subscribe();
    this.notif.success('ad was added successfully','success',{
      timeOut : 2000,
      progressBar : true,
      positionClass: 'toast-top-center',
      progressAnimation : 'increasing'

    });
  }

  getSurveillanceByCode(code){
    this.ss.searchCode(code).subscribe(data=>{this.s1=data,console.log(data)});
  }

  delete(code){
    this.ss.searchCode(code).subscribe(data=>{this.s1=data;
      this.ss.deleteSurveillance(this.s1.idSurveillance).subscribe(()=>
        this.ss.surveillanceAgent().subscribe(rest =>{this.listSurveillanceAgent = rest,this.s1.codeSurveillance=null}));
    });
  }
  modify(s1){
    this.ss.modifySurveillance(s1).subscribe(()=>
      this.ss.surveillanceAgent().subscribe(rest =>this.listSurveillanceAgent = rest));
  }



}
