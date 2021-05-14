import {Directive, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Surveillance} from '../../model/Surveillance';
import {Observable} from 'rxjs';
import {SurveillanceNotice} from '../../model/SurveillanceNotice';
import { SurveillanceOfficer } from 'src/app/model/SurveillanceOfficer';
import {LigneCommande} from '../../model/LigneCommande';
import {SurveillanceCommand} from '../../model/SurveillanceCommand';
import {MyMessage} from '../../model/MyMessage';

@Directive({
  selector: '[appServiceSurveillance]'
})
@Injectable({ providedIn:
    'root' })

export class ServiceSurveillance {

  constructor(private http: HttpClient) {
  }
  url = 'http://localhost:8089/dari/servlet';
  idas=5;
  idc=1;
  listshopping: LigneCommande[]=[];
  nbelignecommande: number=0;

  addSurveillance(surveillance: Surveillance, selectedFile: File) {
    const Data = new FormData();
    Data.append('surveillance', JSON.stringify(surveillance));
    Data.append('imageFile', selectedFile);
    return this.http.post(this.url+'/addSurveillance/'+this.idas, Data);
  }

  surveillanceAgent():Observable<Surveillance[]>{
    return this.http.get<Surveillance[]>(this.url+'/retrieveAllSurveillanceByOfficer/'+this.idas);
  }

  surveillanceClient():Observable<Surveillance[]>{
    return this.http.get<Surveillance[]>(this.url+'/retrieveAllSurveillance');
  }

  addlike(idSurveillance: number):Observable<Surveillance>{
    return this.http.put<Surveillance>(this.url+'/like/'+this.idc, idSurveillance);
  }

  adddeslike(idSurveillance: number):Observable<Surveillance>{
    return this.http.put<Surveillance>(this.url+'/deslike/'+this.idc, idSurveillance);
  }

  deleteSurveillance(idSurveillance : number){
    return this.http.delete(this.url+'/RemoveSurveillance/'+idSurveillance+'/'+this.idas);
  }

  modifySurveillance(surveillance : Surveillance):Observable<Surveillance>{
    return  this.http.put<Surveillance>(this.url+'/modifySurveillance/'+this.idas , surveillance);
  }
  /******************************SERVICE NOTICE**********************************/
  surveeillanceNotice(idSurveillance: number):Observable<SurveillanceNotice[]>{
    return this.http.get<SurveillanceNotice[]>(this.url+'/retrieveAllSurveillanceNoticeBySurveillance/'+idSurveillance);
  }

  addNotice(notice: SurveillanceNotice ,idSurveillance: number){

   return this.http.post<SurveillanceNotice>(this.url+'/addNotice/'+this.idc+'/'+idSurveillance,notice) ;
  }
  /********************************** Filtre **********************************************/
  newProduct():Observable<Surveillance[]>{
    return this.http.get<Surveillance[]>(this.url+'/displaySurveillanceByDate');
  }

  priceDesc():Observable<Surveillance[]>{
    return this.http.get<Surveillance[]>(this.url+'/displaySurveillanceByPriceDesc');
  }

  priceAsc():Observable<Surveillance[]>{
    return this.http.get<Surveillance[]>(this.url+'/displaySurveillanceByPriceAsc');
  }

  byLike():Observable<Surveillance[]>{
    return this.http.get<Surveillance[]>(this.url+'/displaySurveillanceByLike');
  }

  getAllAgent():Observable<SurveillanceOfficer[]>{
   return this.http.get<SurveillanceOfficer[]>(this.url+'/getAllOfficer');
  }
  searchByProvider(name : string):Observable<Surveillance[]>{
   return this.http.get<Surveillance[]>(this.url+'/searchSurveillanceByProvider/'+name);
  }
  searchBycategery(category : string):Observable<Surveillance[]>{
    return this.http.get<Surveillance[]>(this.url+'/searchSurveillanceByCategory/'+category);
  }

  searchbyprice(price:any, price2:any):Observable<Surveillance[]>{
    return this.http.get<Surveillance[]>(this.url+'/searchSurveillanceByPrice/'+price+'/'+price2);
  }

  searchCode(code : string):Observable<Surveillance>{
    return this.http.get<Surveillance>(this.url+'/displaySurveillanceByCode/'+code);
  }
  /*********************************ligne commande************************************/

  addLigneCommand(idSurveillance :any):Observable<LigneCommande>{
    return this.http.post<LigneCommande>(this.url+'/addLigneCommand',idSurveillance);
  }

  updatelignecommand(idlc : any , quantity : any):Observable<LigneCommande>{
    return this.http.put<LigneCommande>(this.url+'/updateLigneCommandByQuantity/'+idlc,quantity);
  }

  deleteLignecommande(idlc : any){
    return this.http.delete(this.url+'/removeLigneCommand/'+idlc);
  }

  /************************************* Commande *******************************************/

  postlistlignecommande(list:LigneCommande[]){
    return this.listshopping=list;
  }

  getlistlignecommande(){
    return this.listshopping;
  }

  postnbelignecommande(nbe:number){
    return this.nbelignecommande=nbe;
  }

  getnbelignecommande(){
    return this.nbelignecommande;
  }

  demandeDevis(lc :LigneCommande []){
    return this.http.post(this.url+'/AddDevis/'+this.idc,lc);
  }
  /*************************************** Message ************************************************/
  /*postMessage(message:MyMessage):Observable<MyMessage>{
    return this.http.post<MyMessage>(this.url+'/AddMessage',message)
  }

  getMessages(from: string , to: string):Observable<MyMessage[]>{
    return this.http.get<MyMessage[]>(this.url+'/getMessages/'+from+'/'+to);
  }*/


}
