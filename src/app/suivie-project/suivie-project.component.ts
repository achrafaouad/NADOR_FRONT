





import { style } from '@angular/animations';
import { Marche } from './../statistics/statistics.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import CircleStyle from 'ol/style/Circle';
import { View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import FullScreen from 'ol/control/FullScreen';
import Zoom from 'ol/control/Zoom';
import ScaleLine from 'ol/control/ScaleLine';
import XYZ from 'ol/source/XYZ';
import Map from "ol/Map";
import GeoJSON from "ol/format/GeoJSON";
import Text from 'ol/style/Text';

import { ServiceService } from '../service.service';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import { LineStyle } from '../extra/LineStyle';
import {lines, geoJsonData,pointStyle,lineStringStyle,polygonStyle,polygonStyle1,pointStyle1,iconStyle,portIcon } from '../../app/sidenav/helper';
import Vector from 'ol/source/Vector';
import Icon from 'ol/style/Icon';







@Component({
  selector: 'app-suivie-project',
  templateUrl: './suivie-project.component.html',
  styleUrls: ['./suivie-project.component.scss']
})
export class SuivieProjectComponent {

  niveau: any;
  selectedNiveau: any;

  projets: any;
  selectedProjet: any;

  marches: any;
  selectedMarche: any;

 public mapPrevLine:any ;





  resultEvolution: any;
  resultRadar: any;
  


  vectorSourcew= new VectorSource({
    features: new GeoJSON().readFeatures(geoJsonData)
  });
  
  vectorLayer = new VectorLayer({
    source: this.vectorSourcew,
    style: (feature,resolution)=> {
      const geometryType = feature.getGeometry().getType();
  
      if (geometryType === 'Point') {
        return pointStyle1(feature,resolution);
      } else if (geometryType === 'LineString') {
        return lineStringStyle(feature,resolution);
      } else if (geometryType === 'Polygon') {
        return polygonStyle1(feature,resolution);
      }
  
      return this.defaultStyle;
    },
  });


  portSource= new VectorSource({
    features: new GeoJSON().readFeatures(portIcon)
  });
  
  PortLayer = new VectorLayer({
    source: this.portSource,
    style: (feature,resolution)=> new Style({
      image: new Icon({
        crossOrigin: 'anonymous',
        src: '../../assets/cargo-shipo.png', // Relative path to your icon image
        imgSize: [32, 32], // Specify the size of the icon image
        anchor: [0.5, 1], // Adjust the anchor point if needed
      }),
      
      text:new Text({
        scale:[1.3,1.3],
        textAlign:  'center',
      textBaseline: <string>lines.baseline,
      font: <string>lines.font,
      text: "Port" ,
      fill: new Fill({ color: "blue" }),
      stroke: new Stroke({ color: "white", width: 3 }),
      backgroundFill: new Fill({
        color: "orange"
      }),
      backgroundStroke: new Stroke({
        color: 'white',
        width: 2
      }),
      padding: [4, 6, 4, 6],
      offsetX: 0,
      offsetY: -50,
      placement: "point",
      maxAngle: 45,
      overflow: lines.overflow,
      rotation: <any>lines.rotation,
      
      
      })
    }),
  });
  getSituationGlobalNivAndProjet: any;

 constructor(private service:ServiceService) {
  
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



defaultStyle = new Style({
  fill: new Fill({ color: 'gray' }),
  stroke: new Stroke({ color: 'black', width: 1 }),
});




 source = new VectorSource({wrapX: false});

 vector = new VectorLayer({
  source: this.source,
  style:  (feature,resolution)=> {
    const geometryType = feature.getGeometry().getType();

    if (geometryType === 'Point') {
      return pointStyle(feature,resolution);
    } else if (geometryType === 'LineString') {
      return lineStringStyle(feature,resolution);
    } else if (geometryType === 'Polygon') {
      return polygonStyle(feature,resolution);
    }

    return this.defaultStyle;
  },
});

 format:GeoJSON = new GeoJSON()



  ngOnInit(): void {

    this.mapPrevLine= new Map({
      target: "mapPrev2",
      layers: [  new TileLayer({
        source: new XYZ({
          url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}'
        })
      }),this.vector,this.vectorLayer ,this.PortLayer],
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


    this.source.on('addfeature', () =>{
      this.mapPrevLine.getView().fit(
          this.source.getExtent(),
          { duration: 1000, size: this.mapPrevLine.getSize(), maxZoom: 8 }
      );
  });


    // this.getnewvqlues()
  }


  changeNiveaux(event){

    this.selectedMarche = null;
    this.selectedProjet = null;
    const id = event.target.value;
    this.selectedNiveau = this.niveau.find(c => c.id === Number(id)) || null;
    this.projets = this.selectedNiveau.projets//this.getBooksByWriter(id)
    this.marches =null
    console.log(this.selectedNiveau)
  }



  getavancByLotID(lotId){
 
      for(let lots of this.getSituationGlobalNivAndProjet.lotDtos){
      if (lots.myLot.id ==  lotId){

        console.warn(lots.avReel)
        return lots.avReel

      
    }
  }
  }
  async changeProjets(event){
    this.selectedMarche = null;
    this.source.clear();
    const id = event.target.value;
    this.selectedProjet= this.projets.find(c => c.id === Number(id)) || null;
    this.marches = this.selectedProjet.lots.flatMap(l => l.marches).filter(marche => marche !== null);
    await this.service.getSituationGlobalNivAndProjet(this.selectedNiveau.id,this.selectedProjet.id).subscribe(
      res=>{ this.getSituationGlobalNivAndProjet = res ; console.log(res) } ,err=>console.log(err)
    )

    this.service.getGeomProjetwithSomeAdditionalData(this.selectedProjet).subscribe(
      res=>{
        const geom = [];

        if(res!==null){

          for(let ele of res){
            const additionaldata = JSON.parse(ele).properties;
            additionaldata["avReel"] =  this.getavancByLotID(additionaldata.lots_id
              )
            console.log(additionaldata);
            geom.push(
              {
                
              "type": "Feature",
              "properties": additionaldata,
                  "geometry": JSON.parse(JSON.parse(ele).geometry)
                }
            )
          }
        }
       

        console.log(geom)
                
        if(res!==null){
          for(let ele of geom){

            this.source.addFeatures(this.format.readFeatures(ele)
              )          }
        }
        

      },
      err=>{
        console.log(err)
      },
    );

    console.log(this.selectedProjet)
    console.log(this.marches)
  }





 



   

  }




