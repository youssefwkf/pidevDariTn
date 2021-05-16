import {Directive, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Surveillance} from '../../model/Surveillance';
import {Observable} from 'rxjs';
import {SurveillanceNotice} from '../../model/SurveillanceNotice';
import { SurveillanceOfficer } from 'src/app/model/SurveillanceOfficer';
import {LigneCommande} from '../../model/LigneCommande';
import {SurveillanceCommand} from '../../model/SurveillanceCommand';
import {MyMessage} from '../../model/MyMessage';
import {extractHostBindings} from '@angular/compiler-cli/src/ngtsc/annotations/src/directive';

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
  idc=6;
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

  detailsCommand(idCommand):Observable<LigneCommande[]>{
    return this.http.get<LigneCommande[]>(this.url+'/detailsCommand/'+idCommand);
  }

  /************************************* Devis client *******************************************/

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

  passcommandClient(idCommand : number){
    return this.http.put(this.url+'/requestPasseCommand/'+idCommand,null);
  }

  annulerCommandfunction(idCommand: number){
    return this.http.put(this.url+'/annulerCommand/'+idCommand,null);
  }

  /*******************************Display Devis client****************************************/
  displayRequestDevis():Observable<SurveillanceCommand[]>{
    return this.http.get<SurveillanceCommand []>(this.url+'/afficherRequestDevisClient/'+this.idc);
  }
  displayResponseDevis():Observable<SurveillanceCommand[]>{
    return this.http.get<SurveillanceCommand[]>(this.url+'/afficherResponseDevisClient/'+this.idc);
  }
  displayRequestPassCommand():Observable<SurveillanceCommand[]>{
    return this.http.get<SurveillanceCommand[]>(this.url+'/afficherRequestPassCommandClient/'+this.idc);
  }
  displayResponsePasseCommand():Observable<SurveillanceCommand[]>{
    return this.http.get<SurveillanceCommand[]>(this.url+'/afficherResponsePassCommandClient/'+this.idc);
  }

  displayannulerClient():Observable<SurveillanceCommand[]>{
    return this.http.get<SurveillanceCommand[]>(this.url+'/afficherAnnulerPassCommandClient/'+this.idc);
  }
  displayokClient():Observable<SurveillanceCommand[]>{
    return this.http.get<SurveillanceCommand[]>(this.url+'/afficherOKCommandClient/'+this.idc);
  }

  /*************************************** Display Command Agent ****************************************************/

  requestDevisAgent():Observable<SurveillanceCommand[]>{
  return  this.http.get<SurveillanceCommand[]>(this.url+'/afficherRequestDevisAgent/'+this.idas);
  }
  responseDevis(bonus1: string, description1: string, idCommand: number):Observable<SurveillanceCommand> {
    const params = new HttpParams({
      fromObject:{
        description: description1,
        bonus: bonus1,
      }
    });
    return this.http.put<SurveillanceCommand>(this.url+'/ReponseDevis/'+idCommand,params);
  }
  responsedevisagent():Observable<SurveillanceCommand[]>{
    return  this.http.get<SurveillanceCommand[]>(this.url+'/afficherReponseDevisAgent/'+this.idas);
  }
  requestpasscommand():Observable<SurveillanceCommand[]>{
    return  this.http.get<SurveillanceCommand[]>(this.url+'/afficherRequestPassCommandAgent/'+this.idas);
  }
  resppnsepasscommand(description1 : string , idCommand: number):Observable<SurveillanceCommand>{
    const params = new HttpParams({
      fromObject:{
        description: description1,
      }
    });
    return this.http.put<SurveillanceCommand>(this.url+'/responsePasseCommand/'+idCommand,params);
  }

  responsepasscommand():Observable<SurveillanceCommand[]>{
    return  this.http.get<SurveillanceCommand[]>(this.url+'/afficherResponsePassCommandAgent/'+this.idas);
  }

  commandAnnulerAgent():Observable<SurveillanceCommand[]>{
    return  this.http.get<SurveillanceCommand[]>(this.url+'/afficherAnnulerPassCommandAgent/'+this.idas);
  }
  commandokAgent():Observable<SurveillanceCommand[]>{
    return  this.http.get<SurveillanceCommand[]>(this.url+'/afficheeOkCommandAgent/'+this.idas);
  }
  confirmerCommand(idCommand: number):Observable<SurveillanceCommand>{

    return this.http.put<SurveillanceCommand>(this.url+'/confirmeCommand/'+idCommand,null);
  }

  /*************************************** Message ************************************************/
  postMessage(message:MyMessage):Observable<MyMessage>{
    return this.http.post<MyMessage>(this.url+'/AddMessage',message)
  }

  getMessages(from: string , to: string):Observable<MyMessage[]>{
    return this.http.get<MyMessage[]>(this.url+'/getMessages/'+from+'/'+to);
  }


}
