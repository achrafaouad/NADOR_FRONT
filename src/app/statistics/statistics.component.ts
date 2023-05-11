import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';


export interface Marche {

  etape_etude:string;
  status_etude:string;
  delegation:string;
  status_marche:string;
    numero_marche:string;
    objet:string;
    titulaire:string;
    montant:number;
    os_commencement:Date;
    dateOverturePlit:Date;
    n_appel_offre:string;
    delai:number;
    estimationao:number;
    montantengage:number;
    prixes:any;
  }



export interface Prix {
    numprix:number;
    prix:string;
    unite:string;
    qte:number;
    pu:number;
    montant:number;
  }

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {



  ajout:boolean = false;

  niveau: any;
  selectedNiveau: any;

  projets: any;
  selectedProjet: any;

  lots: any;
  selectedLot: any;


  marche:Marche = {
    etape_etude:null,
    status_etude:null,
    delegation:null,
    status_marche:null,
    numero_marche:null,
    objet:null,
    titulaire:null,
    montant:null,
    os_commencement:null,
    dateOverturePlit:null,
    n_appel_offre:null,
    delai:null,
    estimationao:null,
    montantengage:null,
    prixes:[]

  }

  prix:Prix = {
    numprix:0,
    prix:null,
    unite:null,
    qte:0,
    pu:0,
    montant:0,
   };


  constructor(private service:ServiceService) {

    this.getNiveau()

  }

  getNiveau(){
    this.service.getNiveau().subscribe(
      res=>{
        console.log(res)
        this.niveau = res
      },
      err=>{
        console.log(err)
    
      },
    )
  }


  ngOnInit(): void {
  }

  changeNiveaux(event){
    const id = event.target.value;
    this.selectedNiveau = this.niveau.find(c => c.id === Number(id)) || null;
    this.projets = this.selectedNiveau.projets//this.getBooksByWriter(id)
    this.lots =null
    console.log(this.selectedNiveau)
  }

  changeProjets(event){
    const id = event.target.value;
    this.selectedProjet= this.projets.find(c => c.id === Number(id)) || null;
    this.lots = this.selectedProjet.lots
    console.log(this.selectedProjet)
  }

  changeLots(event){
    const id = event.target.value;
    this.selectedLot= this.lots.find(c => c.id === Number(id)) || null;
    //this.lots = this.selectedProjet.lots
    console.log(this.selectedLot)
  }

  changeMarche(event){
    const id = event.target.value;
    console.log(id)
    this.marche= this.selectedLot.marches.find(c => c.id_marche === Number(id)) || null;
    //this.lots = this.selectedProjet.lots
    console.log(this.marche)
  }


  ajoutermarcheToLot(){
    this.selectedLot.marches.push({
      objet:this.marche.objet
    })
  }


  getProjetsByNiveau(idniveau) {
    //return ALL_BOOKS.filter(book => book.wid === writerId);
  }
    addPrix(){

    this.marche.prixes.push(JSON.parse(JSON.stringify(this.prix) ))

    this.prix= {
      numprix:0,
      prix:null,
      unite:null,
      qte:0,
      pu:0,
      montant:0,
     };

    }


    calculateMontant(){
      this.prix.montant= 1.2* this.prix.qte* this.prix.pu;
    }

    delete(row_obj:any){
      // this.USER_DATA = this.USER_DATA.filter((value,key)=>{
      // return value.numposte != row_obj.numposte;
      // });
      // this.myDataArray = [...this.USER_DATA];//refresh the dataSource
      // //Swal.fire('Deleted successfully..!')
      }



      saveMarche(){   
        
        
        console.log(this.selectedLot)

        this.service.saveMarcheAfterInit(this.marche).subscribe(
          res=>{
            console.log(res)
            this.clear()
          },
          err=>{
            console.log(err)
          },
        )
      }


      saveLotMarche(){
        this.service.saveMarchetoLot(this.selectedLot).subscribe(
          res=>{
            this.ajout = !this.ajout
            this.clear()
          },
          err=>{
            console.log(err)
          },
        )
      }

      clear(){
        this.selectedNiveau = null;
        this.marche = {
          etape_etude:null,
          status_etude:null,
          delegation:null,
          status_marche:null,
          numero_marche:null,
          objet:null,
          titulaire:null,
          montant:null,
          os_commencement:null,
          dateOverturePlit:null,
          n_appel_offre:null,
          delai:null,
          estimationao:null,
          montantengage:null,
          prixes:[]
      
        };
        this.selectedLot = null;
        this.selectedProjet = null;
        this.getNiveau()
      }
}
