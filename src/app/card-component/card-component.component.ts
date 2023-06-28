import { Marche } from './../statistics/statistics.component';
import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.scss'],
})
export class CardComponentComponent {
  @Input() color: string;
  @Input() title: string;
  @Input() sub: string;
  @Input() icon: string;
  @Input() val: string;
  @Input() perc: string;
  @Input() ecart: string;

  niveau: any;
  selectedNiveau: any;

  projets: any;
  selectedProjet: any;

  lots: any;
  selectedLot: any;

  marche : any; /*Marche = {
    etape_etude: null,
    status_etude: null,
    delegation: null,
    status_marche: null,
    numero_marche: null,
    objet: null,
    titulaire: null,
    montant: null,
    os_commencement: null,
    dateOverturePlit: null,
    n_appel_offre: null,
    delai: null,
    estimationao: null,
    montantengage: null,
    prixes: [],
  };*/

  situation: any = [
    {
      niveau: {
        projets: [],
      },
    },
  ];
  situationMarche: any;

  constructor(private service: ServiceService) {
    this.title = 'Titre';
    this.color = 'white';
    this.sub = 'sub';
    this.icon = 'Lien icon';
    this.val = '36';
    this.perc = 'perc';
    this.ecart = 'ecart';

    this.getNiveau();


  this.changeCard()

    //listsituation:[]
  }

  getNiveau() {
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

  changeNiveaux(event) {
    const id = event.target.value;
    this.selectedNiveau = this.niveau.find((c) => c.id === Number(id)) || null;
    this.projets = this.selectedNiveau.projets; //this.getBooksByWriter(id)
    this.lots = null;

    this.selectedProjet = null;
    this.selectedLot = null;
    this.marche = null;

    console.log(this.selectedNiveau);
    this.changeCard()
  }

  changeProjets(event) {
    const id = event.target.value;
    this.selectedProjet = this.projets.find((c) => c.id === Number(id)) || null;
    this.lots = this.selectedProjet.lots;
    console.log(this.selectedProjet);
    this.selectedLot = null;
    this.marche = null;
    this.changeCard()
  }

  changeLots(event) {
    const id = event.target.value;
    this.selectedLot = this.lots.find((c) => c.id === Number(id)) || null;
    //this.lots = this.selectedProjet.lots
    console.log(this.selectedLot);
    this.marche = null;
    this.changeCard()
  }

  changeMarche(event) {
    const id = event.target.value;
    console.log(id);
    this.marche =
      this.selectedLot.marches.find((c) => c.id_marche === Number(id)) || null;
    //this.lots = this.selectedProjet.lots
    console.log(this.marche);
    this.changeCard()
  }

  changeCard() {
    //    this.service.getSituationGlobal(null,null,null,null).subscribe(
    //   res=>{
    //     console.log(res)
    //     this.situation   =res;
    //    },
    //   err=>{
    //     console.log(err);
    //   }
    // )
    console.log('1===> ' || this.selectedNiveau);
    console.log('2===> ' || this.selectedProjet);
    console.log('3===>' || this.selectedLot);


if(this.marche){
  this.service
  .getSituationGlobalNivAndProjetAndLotAndMarche(1, 5, 6,9)
  .subscribe(
    (res) => {
      console.log(
        'SItuation global par niveau et projet et lot et marché'
      );
      console.log(res);
      this.situation = res;
    },
    (err) => {
      console.log(err);
    }
  );
}else if( this.marche == null  && this.selectedLot ){
  this.service
  .getSituationGlobalNivAndProjetAndLot(1, 5, 6)
  .subscribe(
    (res) => {
      console.log(
        'SItuation global par niveau et projet et lot '
      );
      console.log(res);
      this.situation = res;
    },
    (err) => {
      console.log(err);
    }
  );
}else if( this.marche == null  && this.selectedLot ==null  && this.selectedProjet ){
  this.service
  .getSituationGlobalNivAndProjet(1, 5)
  .subscribe(
    (res) => {
      console.log(
        'SItuation global par niveau et projet '
      );
      console.log(res);
      this.situation = res;
    },
    (err) => {
      console.log(err);
    }
  );
}else if( this.marche == null  && this.selectedLot ==null  && this.selectedProjet==null && this.selectedNiveau ){
  this.service
  .getSituationGlobalNiv(1)
  .subscribe(
    (res) => {
      console.log(
        'SItuation global par niveau '
      );
      console.log(res);
      this.situation = res;
    },
    (err) => {
      console.log(err);
    }
  );
}else {
  this.service
  .getSituationGlobal()
  .subscribe(
    (res) => {
      console.log(
        'SItuation global'
      );
      console.log(res);
      this.situation = res;
    },
    (err) => {
      console.log(err);
    }
  );
}


  }





}
