import { Component, OnInit } from '@angular/core';
import {SurveillanceCommand} from '../../model/SurveillanceCommand';
import {ServiceSurveillance} from '../../service/surveillance/service-surveillance';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LigneCommande} from '../../model/LigneCommande';

@Component({
  selector: 'app-activies-agent',
  templateUrl: './activies-agent.component.html',
  styleUrls: ['./activies-agent.component.scss']
})
export class ActiviesAgentComponent implements OnInit {
  closeResult = '';
  state: number;
  listrequestdevis:SurveillanceCommand[];
  listresponsetdevis:SurveillanceCommand[];
  listrequestpasscommand:SurveillanceCommand[];
  listresponsepasscommand:SurveillanceCommand[];
  listannulercommand:SurveillanceCommand[];
  listokcommand:SurveillanceCommand[];
  listDetailsCommand: LigneCommande[];
  idCommad:number;
  bonnus:string;
  description:string;
  constructor(private ss: ServiceSurveillance, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.state=0;
    this.ss.displayRequestDevis().subscribe(next=>
      this.listrequestdevis =next);
  }
  /****************************Devis********************************/
  requestdevis(){
    this.state=0;
    this.ss.requestDevisAgent().subscribe(next=>
      this.listrequestdevis =next);
  }
  responsedevis(){
    this.ss.responseDevis(this.bonnus,this.description,this.idCommad).subscribe(()=>{
      this.state=1,
      this.ss.displayRequestDevis().subscribe(next=>
        this.listrequestdevis =next),
        this.ss.responsedevisagent().subscribe(next=>this.listresponsetdevis=next)
    });
  }
  displayresponsedevis(){
    this.state=1
    this.ss.responsedevisagent().subscribe(next=>this.listresponsetdevis=next);
  }

 /****************************Command************************************/
  displayresquespasscommand(){
    this.state=2;
    this.ss.requestpasscommand().subscribe(next=>this.listrequestpasscommand=next);
  }
  responsecommand(){
    this.ss.resppnsepasscommand(this.description,this.idCommad).subscribe(()=>{
      this.state=3,
      this.ss.requestpasscommand().subscribe(next=>this.listrequestpasscommand=next),
        this.ss.responsepasscommand().subscribe(next=>this.listresponsepasscommand=next)
    });
  }
  displayresponsepassCommand(){
    this.state=3;
    this.ss.responsepasscommand().subscribe(next=>this.listresponsepasscommand=next);
  }

  displayAnnuler(){
    this.ss.commandAnnulerAgent().subscribe(next=>{
      this.state=4,
    this.listannulercommand=next});
  }

  displayok(){
    this.ss.commandokAgent().subscribe(next=>{
      this.state=5,
        this.listokcommand=next
    });
  }
  confirmer(idcommand){
    this.ss.confirmerCommand(idcommand).subscribe(()=>{
      this.ss.commandokAgent().subscribe(next=>{
        this.state=5,
          this.listokcommand=next});

    });

  }

  openDetails(content , idCommand) {
    this.ss.detailsCommand(idCommand).subscribe(data=>this.listDetailsCommand=data);
    this.modalService.open(content, {windowClass: 'modal-search'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
  openResponse(content,idCommand) {
    this.modalService.open(content, {windowClass: 'modal-search'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.idCommad=idCommand;
  }
}
