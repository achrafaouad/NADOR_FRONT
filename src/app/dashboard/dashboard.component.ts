import { ServiceService } from './../service.service';
import { MohammedService } from './../mohammed.service';
import { TimeService } from './../time.service';
import { Component, OnInit } from '@angular/core';
import { Overlay, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import FullScreen from 'ol/control/FullScreen';
import Draw from 'ol/interaction/Draw';
import Zoom from 'ol/control/Zoom';
import ScaleLine from 'ol/control/ScaleLine';
import XYZ from 'ol/source/XYZ';
import Map from "ol/Map";
import GeoJSON from "ol/format/GeoJSON";

import { Time } from '@angular/common';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

export interface lot {

  intitule:string;
  observation:string;
  pkd:number;
  pkf:number;
  montant:number;
  sections:any
  }



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public myDataArray: any;
  panelOpenState = true;
  proviceList = new Set();
  province!:string
  objet:any=null
  Annee:any=null
  mot_cle:any=null
  observation_project:any=null
  mapPrevLine:any
  format:GeoJSON = new GeoJSON()
  intitulelot!:string
  observationlot!:string
  pkdlot!:number
  pkflot!:number
  montantlot!:number
  lotList = new Set();
  currentDate!:string;
  currentTime!:string;
  sum: number = 0;
  showInfo:boolean=false

  sections:any =[]
  lots:any =[]

  columnsToDisplay: string[] = ["intitulelot", "observationlot","pkdlot","pkflot","montantlot","actions"];

public USER_DATA: lot[] = []

public newLot = {intitule: "", observation: "" , pkd : 0,pkf : 0, montant : 0 ,sections:[]};
  value: any;
  draw: any;
  source = new VectorSource({wrapX: false});

  vector = new VectorLayer({
   source: this.source,

 });

 source2 = new VectorSource({wrapX: false});

  vector2 = new VectorLayer({
   source: this.source2,

 });

  lastFeature: any;
  last_feature: any;
  latitude: number;
  longitude: number;
  container: HTMLElement;
  content: HTMLElement;
  closer: HTMLElement;
  overlay: any;
  foncier: any;
  niveau: any;
  provinces: any;
  selectedNiveau: any;
  selectedFoncier: any;
  selectedProvince: any;
  pkd: any;
  pkf: any;
  type: any;




  constructor( private TimeService : TimeService,private service:ServiceService) {
    console.log("constructor")
this.currentDate = TimeService.getTime().toLocaleDateString();
this.currentTime = TimeService.getTime().toLocaleTimeString();
this.sum = TimeService.add(5,2,3,4);



this.service.getFonciers().subscribe(
  res=>{
    console.log(res)
    this.foncier = res
  },
  err=>{
    console.log(err)

  },
)




this.service.getNiveau().subscribe(
  res=>{
    console.log(res)


    this.niveau = res
  },
  err=>{
    console.log(err)

  },
)

this.service.getProvinecs().subscribe(
  res=>{
    console.log(res)

    this.provinces = res
  },
  err=>{
    console.log(err)

  },
)

  }

  ngOnInit(): void {

    console.log("ngOnInit")

    this.source2.on('addfeature', () =>{
      this.mapPrevLine.getView().fit(
          this.source2.getExtent(),
          { duration: 1000, size: this.mapPrevLine.getSize(), maxZoom: 15 }
      );
  });


    this.container = <HTMLElement>document.getElementById("popup");
    this.content = <HTMLElement>document.getElementById("popup-content");
    this.closer = <HTMLElement> document.getElementById("popup-closer");
    this.overlay = new Overlay({
      element: this.container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    this.closer.onclick =  ()=> {
      this.overlay.setPosition(undefined);
      if(this.closer)this.closer.blur();
      return false;
    };

    this.mapPrevLine= new Map({
      target: "mapPrev",
      layers: [

        new TileLayer({
        source: new XYZ({
          url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}'
        })
      }) ,


      this.vector,this.vector2

    ],
      controls: [
       new FullScreen(),
       new Zoom(),
       new ScaleLine({ bar: true })
     ],
      view: new View({
       center: [
        -3.043618238384593 , 35.159219337440405
       ],
        zoom: 10,
        projection: "EPSG:4326",
      }),
    });


    this.mapPrevLine.addOverlay(this.overlay);



    this.mapPrevLine.on('click',(evt: any) => {
      if(this.showInfo){
        this.mapPrevLine.forEachFeatureAtPixel(evt.pixel, (feature:any, Layer:any) => {
          var object = feature.getProperties();
          console.log(object)
         var vv

              vv =  `<table id="customers" class="table-style">
              <thead>
                <tr>
                  <th colspan="2"><b>OUVRAGE D ART </b></th>
                </tr>
              </thead>
              <tr>
                <td colspan="2"><img  src="https://www.construction21.org/france/data/sources/users/19209/20220713082447-inondation-narbonne-pleiades.jpg" width="100%" height="100px" /></td>
              </tr>
              <tr>
                <td><b>id </b></td>
                <td font-style="italic">215</td>
              </tr>
              <tr>
                <td><b>province </b></td>
                <td>Laarache</td>
              </tr>
              <tr>
                <td><b>commune</b></td>
                <td>Laarache</td>
              </tr>
              <tr>
                <td><b>secteur</b></td>
                <td>risque naturel</td>
              </tr>
              <tr>
                <td><b>Objet</b></td>
                <td>prévention contre les innondation</td>
              </tr>
              <tr ="2">
                <td><b>type de projet</b></td>
                <td>Type A</td>
              </tr>
            </table>
            `



          this.content.innerHTML = vv
          console.log(evt.coordinate)
          this.overlay.setPosition(evt.coordinate)
          // toto

        })
      }

         })


  }


  changeNiveaux(event){
    const id = event.target.value;
    this.selectedNiveau = this.niveau.find(c => c.id === Number(id)) || null;
    console.log(this.selectedNiveau)
  }

  changeFoncier(event){
    const id = event.target.value;
    this.selectedFoncier = this.foncier.find(c => c.id === Number(id)) || null;
    console.log(this.selectedFoncier)

  }
  changeprovince(event){
    const id = event.target.value;
    console.log(id)
    this.selectedProvince = this.provinces.find(c => c.id_province === Number(id)) || null;
    console.log(this.selectedProvince)
   }


  addprovince(){
    this.proviceList.add(this.province)
  }


  addSection(){
    this.newLot.sections.push(JSON.parse(JSON.stringify({
      id_section:null,
      pkd:this.pkd,
      pkf:this.pkf,
      type:this.type,
      geom:this.last_feature,
      province:this.selectedProvince
    })))
  }

  visualiser(item){
    if(item){
      this.source2.clear();
      this.source2.addFeatures(this.format.readFeatures(item));
    }
    
  }
  clear(){
  this.source.clear()
  this.pkd = null
  this.pkf = null
  this.selectedProvince = null
  }

  addlot(){

    const newUsersArray = this.USER_DATA;
    newUsersArray.push(this.newLot);
    this.myDataArray = [...newUsersArray];
    this.newLot = {intitule: "", observation: "" , pkd : 0,pkf : 0, montant : 0, sections:[] };
    this.clear()

}

delete(row_obj:any){
  this.USER_DATA = this.USER_DATA.filter((value,key)=>{
  return value.intitule != row_obj.intitulelot;
  });
  this.myDataArray = [...this.USER_DATA];//refresh the dataSource
  //Swal.fire('Deleted successfully..!')
  }




  /**////  geom */

  changto(val:any){
    console.log(val);
    this.value = val
    this.mapPrevLine.removeInteraction(this.draw);
    this.addInteraction();
  }

  addInteraction() {
    // this.value ='Point';
    if (this.value !== 'None') {
      this.draw = new Draw({
        source: this.source,
        type: this.value,
      });

        this.draw.on('drawend', (event:any) => {
          console.log('drawend');
          this.lastFeature = event.feature;
        });

      this.mapPrevLine.addInteraction(this.draw);

      this.source.on("addfeature", (evt) => {
        var feature:any = evt.feature;

        var coords = feature.getGeometry();

        var Features:any = this.format.writeGeometry(coords);
        Features = JSON.parse(Features);
        Features["crs"] = { type: "name" };
        Features = JSON.stringify(Features);
        this.last_feature = Features;
        console.log("hana", this.last_feature);
        console.log(feature.getGeometry().getExtent())

        //center
        var center = this.getCenterOfExtent(feature.getGeometry().getExtent());
        this.latitude = center[1]
        this.longitude = center[0]

        // call
        const button = document.createElement('button');
  button.innerText = 'Click me';
  button.style.visibility = 'hidden'; // Set the initial visibility to hidden
  button.setAttribute('data-bs-toggle', 'modal'); // Set the data-bs-toggle attribute
  button.setAttribute('data-bs-target', '#staticBackdrop'); // Set the data-bs-target attribute
  button.addEventListener('click', () => {
    console.log('Button clicked');
  });





      });


    }
  }

  getCenterOfExtent(Extent: number[]) {
    var X = Extent[0] + (Extent[2] - Extent[0]) / 2;
    var Y = Extent[1] + (Extent[3] - Extent[1]) + 0.005;
    return [X, Y];
  }


  saveProject(){
    const object = {
      id:null,
     objet:this.objet,
  mot_cle:this.mot_cle,
  observation:this.observation_project,
  anneeProjet:this.Annee,
  sections:this.sections,

  niveau:this.selectedNiveau,

  lots:this.myDataArray,
  foncier:this.selectedFoncier
    }


    console.log(object)

   this.service.saveProject(object).subscribe(res=>{
    console.log(res),err=>console.log(err)
   })
  }

}
