import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Surveillance} from '../model/Surveillance';
import {ServiceSurveillance} from '../service/surveillance/service-surveillance';
import {SurveillanceNotice} from '../model/SurveillanceNotice';
import {SurveillanceOfficer} from '../model/SurveillanceOfficer';
import {LigneCommande} from '../model/LigneCommande';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-camera-surveillance',
  templateUrl: './camera-surveillance.component.html',
  styleUrls: ['./camera-surveillance.component.scss']
})
export class CameraSurveillanceComponent implements OnInit {
  closeResult = '';
  listSurveillance: Surveillance[];
  listSurveillanceNotice: SurveillanceNotice[];
  listSurveillanceOfficer: SurveillanceOfficer[];
  listLigneCommande: LigneCommande[]=[];
  listcategory:string[]=['CAMERA_SANS_FIL','CAMERA_SURVEILLANCE_HD','CAMERA_IP','FISHEYE_360','CAMERA_MOTORISEE_PTZ','ACCESSORY'];
  notice:SurveillanceNotice = new SurveillanceNotice();
  idsurnotice:any;
  min:any;
  max:any;
  nombre: number =0;


  constructor(private ss: ServiceSurveillance, private modalService: NgbModal, private notif : ToastrService) {
  }

  ngOnInit(): void {
    this.ss.surveillanceClient().subscribe(data=>{this.listSurveillance=data});
    this.ss.getAllAgent().subscribe(next=>{this.listSurveillanceOfficer=next});
  }

  open(content) {
    this.modalService.open(content, {windowClass: 'modal-search'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openAvis(content,idSurveillance) {
    this.ss.surveeillanceNotice(idSurveillance).subscribe(data=>{
      this.listSurveillanceNotice=data,
        console.log(data)});
    this.modalService.open(content, {windowClass: 'modal-search'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.idsurnotice=idSurveillance;
    console.log(idSurveillance);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  like(idsur , i){
    this.ss.addlike(idsur).subscribe(data=>{console.log(data),
      this.listSurveillance[i].jaime=data.jaime,
        this.listSurveillance[i].test2=!this.listSurveillance[i].test2}
      );
  }
  deslike(idsur , i){
    this.ss.adddeslike(idsur).subscribe(data=>{console.log(data),
      this.listSurveillance[i].jaimeplus=data.jaimeplus,
      this.listSurveillance[i].test1=!this.listSurveillance[i].test1});
  }

  saveNotice(){
    this.ss.addNotice(this.notice,this.idsurnotice).subscribe(data=>{
      this.listSurveillanceNotice.push(data);
    });
  }

  newproduct(){
    this.ss.newProduct().subscribe(data=>{
      this.listSurveillance=data;
    });
  }
  allprodut(){
    this.ss.surveillanceClient().subscribe(data=>{this.listSurveillance=data;});}
  bylike(){
    this.ss.byLike().subscribe(data=>{this.listSurveillance=data;});}
  pricedes(){
    this.ss.priceDesc().subscribe(data=>{this.listSurveillance=data;});}
  priceas(){
    this.ss.priceAsc().subscribe(data =>{this.listSurveillance=data;});
  }
  searchbyprice(){
    this.ss.searchbyprice(this.min,this.max).subscribe(data=>this.listSurveillance=data);
  }
  searchbyprovider(io){
    this.ss.searchByProvider(this.listSurveillanceOfficer[io].userName).subscribe(next=>this.listSurveillance=next);
  }
  searchbycategory(ic){
    this.ss.searchBycategery(this.listcategory[ic]).subscribe(next=>this.listSurveillance=next);
  }

  choose(idSurveillance){
    this.ss.addLigneCommand(idSurveillance).subscribe(next=>this.listLigneCommande.push(next));
    this.ss.postlistlignecommande(this.listLigneCommande);
    this.notif.success('ad was added successfully','success',{
      timeOut : 2000,
      progressBar : true,
      positionClass: 'toast-top-center',
      progressAnimation : 'increasing'

    });
    this.nombre=this.nombre+1;
    this.ss.postnbelignecommande(this.nombre);
  }



}
