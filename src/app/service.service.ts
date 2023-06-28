import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export class Task {
  id!: number;
  parentId!: number;
  title!: string;
  start!: Date;
  end!: Date;
  progress!: number;
}

export class Dependency {
  id!: number;
  predecessorId!: number;
  successorId!: number;
  type!: number;
}

export class Resource {
  id!: number;
  text!: string;
}

export class ResourceAssignment {
  id!: number;
  taskId!: number;
  resourceId!: number;
}



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

   //private apiUrl = 'http://localhost:80';

    private apiUrl = 'http://localhost:8016';

    //private apiUrl = 'https://178.170.116.28/NADOR_BACK';

  constructor(private httpClient: HttpClient) {
  }

  public getProvinecs():Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/rest/getProvinecs`)
  }

  public getFonciers():Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/rest/getFonciers`)
  }

  public getNiveau():Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/rest/getNiveau`)
  }

  public getProjets():Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/rest/getProjets`)
  }

  public saveProject(data:any):Observable<any>{
    return this.httpClient.post<any>(`${this.apiUrl}/rest/saveProject`,data)
  }


  public saveMarchetoLot(data:any):Observable<any>{
    return this.httpClient.post<any>(`${this.apiUrl}/rest/saveMarchetoLot`,data)
  }
  public saveMarcheAfterInit(data:any):Observable<any>{
    return this.httpClient.post<any>(`${this.apiUrl}/rest/saveMarcheAfterInit`,data)
  }


  public getGeomProjet(data:any):Observable<any>{
    return this.httpClient.post<any>(`${this.apiUrl}/rest/getGeomProjet`,data)
  }


  public getGeomProjetwithSomeAdditionalData(data:any):Observable<any>{
    return this.httpClient.post<any>(`${this.apiUrl}/rest/getGeomProjetwithSomeAdditionalData`,data)
  }

  public getLastSituationForMarche(data:any):Observable<any>{
    return this.httpClient.post<any>(`${this.apiUrl}/rest/getLastSituationForMarche`,data)
  }


  public saveMarche(data:any):Observable<any>{
    return this.httpClient.post<any>(`${this.apiUrl}/rest/saveMarche`,data)
  }



  public saveSituation(data:any):Observable<any>{
    return this.httpClient.post<any>(`${this.apiUrl}/rest/saveSituation`,data)
  }

  // public getEvolutionAvancement(data:any):Observable<any>{
  //   return this.httpClient.post<any>(`${this.apiUrl}/rest/getEvolutionAvancement`,data)
  // }

  public getEvolutionAvancement(marcheId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/rest/getEvolutionAvancement/${marcheId}`);
  }

  public getRadar(marcheId: number):Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/rest/getRadar/${marcheId}`)
  }


  public getSituationGlobal(): Observable<any> {
       return this.httpClient.get<any>(`${this.apiUrl}/rest/getSituationGlobal`);
      }

  public getSituationGlobalNiv(niveauId: number): Observable<any> {
     return this.httpClient.get<any>(`${this.apiUrl}/rest/getSituationGlobal?niveauId=${niveauId}`);
      }

  public getSituationGlobalNivAndProjet(niveauId: number,projetId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/rest/getSituationGlobal?niveauId=${niveauId}&projetId=${projetId}`);
   }

 public getSituationGlobalNivAndProjetAndLot(niveauId: number,projetId: number,lotId: number): Observable<any> {
  return this.httpClient.get<any>(`${this.apiUrl}/rest/getSituationGlobal?niveauId=${niveauId}&projetId=${projetId}&lotId=${lotId}`);
 }

public getSituationGlobalNivAndProjetAndLotAndMarche(niveauId: number, projetId : number , lotId : number , marcheId : number): Observable<any> {
  return this.httpClient.get<any>(`${this.apiUrl}/rest/getSituationGlobal?niveauId=${niveauId}&projetId=${projetId}&lotId=${lotId}&marcheId=${marcheId}`);
  }










}
