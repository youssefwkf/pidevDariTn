import { Component, OnInit } from '@angular/core';
import {ServiceSurveillance} from '../../service/surveillance/service-surveillance';
import {SurveillanceCommand} from '../../model/SurveillanceCommand';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LigneCommande} from '../../model/LigneCommande';


@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.scss']
})
export class MyActivitiesComponent implements OnInit {
  closeResult = '';
  listrequestdevis:SurveillanceCommand[];
  listrsponsedevis:SurveillanceCommand[];
  listrequestpassCommand:SurveillanceCommand[];
  listresponepassCommand:SurveillanceCommand[];
  listannulerpassCommand:SurveillanceCommand[];
  listokCommand:SurveillanceCommand[];
  state:number;
  listDetailsCommand: LigneCommande[];

  constructor(private ss: ServiceSurveillance, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.state=0;
    this.ss.displayRequestDevis().subscribe(next=>
      this.listrequestdevis =next);
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

  requestdevis(){
    this.state=0;
    this.ss.displayRequestDevis().subscribe(next=>
    this.listrequestdevis =next);
  }

  responsedevis(){
    this.state=1;
    this.ss.displayResponseDevis().subscribe(next=>
    this.listrsponsedevis=next);
  }
  passcommand(idCommand){
    this.ss.passcommandClient(idCommand).subscribe(()=>{
      this.state=2,
      this.ss.displayResponseDevis().subscribe(next=>
        this.listrsponsedevis=next),
        this.ss.displayRequestPassCommand().subscribe(next=>this.listrequestpassCommand=next);
    });
  }
  afficheRequestPassCommand(){
    this.state=2;
    this.ss.displayRequestPassCommand().subscribe(next=>this.listrequestpassCommand=next);
  }
  afficherResponsePassCommand(){
    this.state=3;
    this.ss.displayResponsePasseCommand().subscribe(next=>this.listresponepassCommand=next);
  }
  afficherannulerCommand(){
    this.state=4
    this.ss.displayannulerClient().subscribe(next=>
    this.listannulerpassCommand=next);
  }

  annulerCommand(idCommad){
    this.ss.annulerCommandfunction(idCommad).subscribe(()=>{
      this.state=4,
      this.ss.displayannulerClient().subscribe(next=>
        this.listannulerpassCommand=next),
        this.ss.displayResponsePasseCommand().subscribe(next=>this.listresponepassCommand=next)
    });
  }
  okcommand(){
    this.ss.displayokClient().subscribe(next=>{
      this.state=5,
      this.listokCommand=next
    });
  }


}
