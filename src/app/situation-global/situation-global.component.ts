
import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../service.service';

export interface SituationDetail {
  numprix: number;
  prix: string;
  unite: string;
  qte: number;
  pu: number;
  montant: number;
}

export interface Situation {
  datesituation: Date;
  obervation: String;
  avancementPGT: number;
  avancementReel: number;
  situationdetail: any;
}

@Component({
  selector: 'app-situation-global',
  templateUrl: './situation-global.component.html',
  styleUrls: ['./situation-global.component.scss']
})
export class SituationGlobalComponent implements OnInit {
  niveau: any;


  isemptySituation:boolean = false;

  SituationDetail: any = [];
  selectedNiveau: any;


  date_Situation:any = null;
  observation:any = null;

  projets: any;
  selectedProjet: any;

  marches: any;
  selectedMarche: any;

  situation: Situation = {
    datesituation: null,
    obervation: null,
    avancementPGT: null,
    avancementReel: null,
    situationdetail: [],
  };

  situationDetail: SituationDetail = {
    numprix: 0,
    prix: null,
    unite: null,
    qte: 0,
    pu: 0,
    montant: 0,
  };

  data = [
    {
      numposte: 1,
      poste: 'poste 01',
      qte: 1000,
      PU: 2000,
      montant: 2000000,
      datedemarrage: '01/01/2023',
      qteprevu: 500,
      qterealise: 520,
      montantpgt: 5265,
      montantrealise: 5214,
      avpgt: 50,
      avrealise: 70,
    },

    {
      numposte: 2,
      poste: 'poste 02',
      qte: 2000,
      PU: 2000,
      montant: 4000000,
      datedemarrage: '09/11/2023',
      qteprevu: 300,
      qterealise: 741,
      montantpgt: 1542,
      montantrealise: 5548,
      avpgt: 60,
      avrealise: 88,
    },

    {
      numposte: 3,
      poste: 'poste 03',
      qte: 3000,
      PU: 2000,
      montant: 6000000,
      datedemarrage: '09/11/2023',
      qteprevu: 300,
      qterealise: 741,
      montantpgt: 1542,
      montantrealise: 5548,
      avpgt: 60,
      avrealise: 88,
    },

    {
      numposte: 4,
      poste: 'poste 04',
      qte: 2000,
      PU: 2000,
      montant: 4000000,
      datedemarrage: '09/11/2023',
      qteprevu: 300,
      qterealise: 741,
      montantpgt: 1542,
      montantrealise: 5548,
      avpgt: 60,
      avrealise: 88,
    },

    {
      numposte: 5,
      poste: 'poste 05',
      qte: 2000,
      PU: 2000,
      montant: 4000000,
      datedemarrage: '09/11/2023',
      qteprevu: 300,
      qterealise: 741,
      montantpgt: 1542,
      montantrealise: 5548,
      avpgt: 60,
      avrealise: 88,
    },
  ];

  displayedColumns = ['numposte', 'poste'];
  lastSituation: any;
  lots: any;
  selectedLot: any;
  // ,'qte','PU','montant','datedemarrage','qteprevu', 'qterealise', 'montantpgt','montantrealise','avpgt', 'avrealise'

  constructor(private service: ServiceService) {
     this.getNiveau();
  }



  getNiveau(){
    this.service.getNiveau().subscribe(
      (res) => {
        console.log(res);
        this.niveau = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {}

  changeNiveaux(event) {
    this.selectedMarche = null
    this.selectedNiveau = null
    this.projets = null
    const id = event.target.value;
    this.selectedNiveau = this.niveau.find((c) => c.id === Number(id)) || null;
    this.projets = this.selectedNiveau.projets; //this.getBooksByWriter(id)
    this.marches = null;
    console.log(this.selectedNiveau);
  }

  changeProjets(event) {
    this.selectedMarche = null
    //this.source.clear()
    const id = event.target.value;
    this.selectedProjet = this.projets.find((c) => c.id === Number(id)) || null;
    // this.marches = this.selectedProjet.lots
    //   // .map((l) => l.marche)
    //   .flatMap((lot) => lot.marches)

    //   .filter((marche) => marche !== null)

      this.lots = this.selectedProjet.lots

    console.log(this.selectedProjet);
    console.log(this.marches);
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
    this.selectedMarche= this.selectedLot.marches.find(c => c.id_marche === Number(id)) || null;
    //this.lots = this.selectedProjet.lots
    console.log(this.selectedMarche)

      this.service.getLastSituationForMarche(this.selectedMarche).subscribe(
      (res) => {
        console.log(res);

        this.lastSituation = res
        this.lastSituation.id_situation = null;


        for(let ele of this.lastSituation.situationdetail){
          ele.id_situation_detail = null;
        }
        console.log(res.situationdetail.length)
        if (res.situationdetail.length == 0) {
          this.isemptySituation = true
          for (let ele of this.selectedMarche.prixes) {
            this.SituationDetail.push(
              JSON.parse(
                JSON.stringify({
                  qteprecu: null,
                  qtereacu: null,
                  montapgt: null,
                  montreal: null,
                  avancpgt: null,
                  avanreal: null,
                  ecart: null,
                  qtecalcu: null,
                  pucalcul: null,
                  datedemarage: null,
                  prix: ele,
                })
              )
            );
          }

          this.selectedMarche.situations.push(
            JSON.parse(
              JSON.stringify({
                avancementPGT: null,
                avancementReel: null,

                datesituation: null,

                id_situation: null,
                obervation: null,
                situationdetail: this.SituationDetail,
              })
            )
          );
        }


      },
      (err) => {
        console.log(err);
      }
    );
  }


  // changeMarches(event) {
  //   this.isemptySituation = false
  //   const id = event.target.value;
  //   console.log(id);
  //   this.selectedMarche =
  //     this.marches.find((c) => c.id_marche === Number(id)) || null;
  //   console.log(this.selectedMarche);

  //   this.service.getLastSituationForMarche(this.selectedMarche).subscribe(
  //     (res) => {
  //       console.log(res);

  //       this.lastSituation = res
  //       this.lastSituation.id_situation = null;


  //       for(let ele of this.lastSituation.situationdetail){
  //         ele.id_situation_detail = null;
  //       }
  //       console.log(res.situationdetail.length)
  //       if (res.situationdetail.length == 0) {
  //         this.isemptySituation = true
  //         for (let ele of this.selectedMarche.prixes) {
  //           this.SituationDetail.push(
  //             JSON.parse(
  //               JSON.stringify({
  //                 qteprecu: null,
  //                 qtereacu: null,
  //                 montapgt: null,
  //                 montreal: null,
  //                 avancpgt: null,
  //                 avanreal: null,
  //                 ecart: null,
  //                 qtecalcu: null,
  //                 pucalcul: null,
  //                 datedemarage: null,
  //                 prix: ele,
  //               })
  //             )
  //           );
  //         }

  //         this.selectedMarche.situations.push(
  //           JSON.parse(
  //             JSON.stringify({
  //               avancementPGT: null,
  //               avancementReel: null,

  //               datesituation: null,

  //               id_situation: null,
  //               obervation: null,
  //               situationdetail: this.SituationDetail,
  //             })
  //           )
  //         );
  //       }


  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }



  saveSituation(){
    //if the situation already exsist




if(!this.isemptySituation){
  this.lastSituation.datesituation
  = this.date_Situation
    this.lastSituation.obervation
    = this.observation
  this.selectedMarche.situations.push(
    this.lastSituation
  )


}else{
  this.selectedMarche.situations[this.selectedMarche.situations.length-1].datesituation = this.date_Situation
  this.selectedMarche.situations[this.selectedMarche.situations.length-1].obervation = this.observation
}


  console.error(this.selectedMarche)
  this.service.saveMarche(this.selectedMarche).subscribe(
    (res) => {
      this.isemptySituation = false
      this.date_Situation = null
      this.observation = null
      this.selectedMarche = null
      this.selectedNiveau = null
      this.selectedProjet = null
      this.getNiveau();
    },
    (err) => {
      console.log(err);
    }
  )






}

}
