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

  marche : any; 
  

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
    this.selectedProjet = this.projets.find((c) => c.id === Number(id)) || null ;
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

    console.log('1===> ' || this.selectedNiveau);
    console.log('2===> ' || this.selectedProjet);
    console.log('3===>' || this.selectedLot);
    console.log('4===>' || this.marche);


if(this.marche){
  this.service
  .getSituationGlobalNivAndProjetAndLotAndMarche(this.selectedNiveau.id, this.selectedProjet.id , this.selectedLot.id ,this.marche.id_marche)
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
  .getSituationGlobalNivAndProjetAndLot(this.selectedNiveau.id, this.selectedProjet.id, this.selectedLot.id)
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
  .getSituationGlobalNivAndProjet(this.selectedNiveau.id, this.selectedProjet.id)
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
  .getSituationGlobalNiv(this.selectedNiveau.id)
  .subscribe(
    (res) => {
      console.log(
        'SItuation global par niveau '
      );
      console.log(res);
      console.log("achraf aouad");
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
