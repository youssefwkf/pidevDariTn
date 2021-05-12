import {Component, Input, OnInit} from '@angular/core';
import {ServiceSurveillance} from '../../service/surveillance/service-surveillance';
import {LigneCommande} from '../../model/LigneCommande';
import {Router} from '@angular/router';

@Component({
  selector: 'app-request-devis',
  templateUrl: './request-devis.component.html',
  styleUrls: ['./request-devis.component.scss']
})
export class RequestDevisComponent implements OnInit {

  constructor(private ss: ServiceSurveillance , private router: Router) {

  }

  listshopping: LigneCommande[] = [];
  total: number = 0;
  tot: number = 0;

  ngOnInit(): void {
    this.listshopping = this.ss.getlistlignecommande();
  }

  refresh(idLigneCommand, quantity, i) {
    this.ss.updatelignecommand(idLigneCommand, quantity).subscribe(next => {
      this.listshopping[i] = next;
    });
  }

  delete(idlc, i) {
    this.ss.deleteLignecommande(idlc).subscribe();
    this.listshopping.forEach((item,idex)=>{
      if(idex === i) this.listshopping.splice(idex,1);
    });
    this.ss.postnbelignecommande(this.ss.getnbelignecommande()-1);
  }

  addDevis() {
    this.ss.demandeDevis(this.listshopping).subscribe(()=>
    this.router.navigateByUrl("/activities"));
    this.listshopping.length=0;
    this.ss.postnbelignecommande(0);
  }

}
