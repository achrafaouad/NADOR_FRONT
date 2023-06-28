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
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexFill,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexMarkers
} from "ng-apexcharts";
import { ServiceService } from '../service.service';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import { LineStyle } from '../extra/LineStyle';



export type ChartOptions2 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  fill: ApexFill;
  markers: ApexMarkers;
  xaxis: ApexXAxis;
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  niveau: any;
  selectedNiveau: any;

  projets: any;
  selectedProjet: any;

  marches: any;
  selectedMarche: any;

 public mapPrevLine:any ;

 @ViewChild("chart") chart!: ChartComponent;
 public chartOptions: Partial<ChartOptions>;
 public chartOptions2: Partial<ChartOptions2>;
  resultEvolution: any;
  resultRadar: any;
  lines = new LineStyle(
    "Normal",
    "center",
    "middle",
    "0",
    "Arial",
    "Bold",
    "Point",
    "0.7853981633974483",
    true,
    "12px",
    "10",
    "3px",
    "4px",
    "black",
    "white",
    "4",
    "38400"
  );

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

  this.chartOptions2 = {
    series: [
      {
        name: "Series Blue",
        data: [80, 50, 30, 40, 100, 20]
      },
      {
        name: "Series Green",
        data: [20, 30, 40, 80, 20, 80]
      },
      {
        name: "Series Orange",
        data: [44, 76, 78, 13, 43, 10]
      }
    ],
    chart: {
      height: 350,
      type: "radar",
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1
      }
    },
    title: {
      text: "Detail par poste"
    },
    stroke: {
      width: 0
    },
    fill: {
      opacity: 0.4
    },
    markers: {
      size: 0
    },
    xaxis: {
      categories: ["2011", "2012", "2013", "2014", "2015", "2016"]
    }
  };


  //graph 01
   this.chartOptions = {
     series: [
       {
         name: "Avancement reel",
         data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
       },
       {
        name: "Avancement PGT",
        data: [5, 33, 60, 30, 49, 62, 50, 70, 150]
      }
     ],
     chart: {
       height: 350,
       type: "line",
       zoom: {
         enabled: false
       }
     },
     dataLabels: {
       enabled: false
     },
     stroke: {
       curve: "straight"
     },
     title: {
       text: "Evolution de l'avancement ",
       align: "left"
     },
     grid: {
       row: {
         colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
         opacity: 0.5
       }
     },
     xaxis: {
       categories: [
         "Jan",
         "Feb",
         "Mar",
         "Apr",
         "May",
         "Jun",
         "Jul",
         "Aug",
         "Sep"
       ]
     }
   };
 }

 pointStyle = (feature,resolution)=>  new Style({
  image: new CircleStyle({
    radius: 5,
    fill: new Fill({ color: 'green' }),
    stroke: new Stroke({ color: 'white', width: 2 }),
  }),
  text:new Text({
    scale:[1.3,1.3],
    textAlign:  'center',
  textBaseline: <string>this.lines.baseline,
  font: <string>this.lines.font,
  text: (0.002362464157453313<resolution)?'': feature.get("intitule"),
  fill: new Fill({ color: "blue" }),
  stroke: new Stroke({ color: "white", width: 3 }),
  offsetX: 0,
  offsetY: -15,
  placement: "point",
  maxAngle: 45,
  overflow: this.lines.overflow,
  rotation: <any>this.lines.rotation,
  
  
  })
});

lineStringStyle = (feature,resolution)=>  new Style({
  stroke: new Stroke({
    color: 'blue',
    width: 2,
  }),
  text:new Text({
    scale:[1.3,1.3],
    textAlign:  'center',
  textBaseline: <string>this.lines.baseline,
  font: <string>this.lines.font,
  text: (0.002362464157453313<resolution)?'': feature.get("intitule"),
  fill: new Fill({ color: "blue" }),
  stroke: new Stroke({ color: "white", width: 3 }),
  offsetX: 0,
  offsetY: -15,
  placement: "point",
  maxAngle: 45,
  overflow: this.lines.overflow,
  rotation: <any>this.lines.rotation,
  
  
  })
});

polygonStyle = (feature,resolution)=> new Style({
  stroke: new Stroke({
    color: 'red',
    width: 2,
  }),
  fill: new Fill({
    color: 'rgba(255, 0, 0, 0.1)',
  }),
  text:new Text({
    scale:[1.3,1.3],
    textAlign:  'center',
  textBaseline: <string>this.lines.baseline,
  font: <string>this.lines.font,
  text: (0.002362464157453313<resolution)?'': feature.get("intitule"),
  fill: new Fill({ color: "blue" }),
  stroke: new Stroke({ color: "white", width: 3 }),
  offsetX: 0,
  offsetY: -15,
  placement: "point",
  maxAngle: 45,
  overflow: this.lines.overflow,
  rotation: <any>this.lines.rotation,
  
  
  })
});

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
      return this.pointStyle(feature,resolution);
    } else if (geometryType === 'LineString') {
      return this.lineStringStyle(feature,resolution);
    } else if (geometryType === 'Polygon') {
      return this.polygonStyle(feature,resolution);
    }

    return this.defaultStyle;
  },
});

 format:GeoJSON = new GeoJSON()



  ngOnInit(): void {

    this.mapPrevLine= new Map({
      target: "mapPrev1",
      layers: [  new TileLayer({
        source: new XYZ({
          url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}'
        })
      }),this.vector ],
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

  changeProjets(event){
    this.selectedMarche = null;
    this.source.clear()
    const id = event.target.value;
    this.selectedProjet= this.projets.find(c => c.id === Number(id)) || null;
    this.marches = this.selectedProjet.lots.flatMap(l => l.marches).filter(marche => marche !== null);

    this.service.getGeomProjet(this.selectedProjet).subscribe(
      res=>{
        const geom = [];
        if(res!==null){

          for(let ele of res){
            geom.push(
              {
                
              "type": "Feature",
              "properties": JSON.parse(ele).properties,
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

  changeMarches(event){
    const id = event.target.value;
  
    this.selectedMarche = this.marches.find(c => c.id_marche === Number(id)) || null;
    
   console.log(this.selectedMarche)

    this.service.getEvolutionAvancement(id).subscribe(
      res=>{
        console.log(res)

        this.resultEvolution = res
       this.getnewvqlues();
      },
      err=>{
        console.log(err);
      }
    
    )

    this.service.getRadar(id).subscribe(
      res=>{
        console.log(res)
        this.resultRadar = res
        this.updateRadio()
      },
      err=>{
        console.log(err);
      }
    
    )

  }



  getnewvqlues(){

    this.chartOptions = {
      series: [
        {
          name: "Avancement reel",
          data: this.resultEvolution.avReel
        },
        {
         name: "Avancement PGT",
         data: this.resultEvolution.avPgt
       }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Evolution de l'avancement ",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: this.resultEvolution.dates
      }
    };
  }


  updateRadio(){
    this.chartOptions2 = {
      series: [
        {
          name: "Avancament réalisé",
          data: this.resultRadar.avReel
        },
        {
          name: "Avancement PGT",
          data:  this.resultRadar.avPgt
        }
        
      ],
      chart: {
        height: 350,
        type: "radar",
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        }
      },
      title: {
        text: "Detail par poste"
      },
      stroke: {
        width: 0
      },
      fill: {
        opacity: 0.4
      },
      markers: {
        size: 0
      },
      xaxis: {
        categories: this.resultRadar.prix
      }
    };
  }

   

  }




