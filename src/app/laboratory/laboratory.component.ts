import {Component, HostListener, OnInit} from '@angular/core';

import 'fabric';
import {Router} from '@angular/router';
import {OauthApiService} from '../services/oauth-api-service';
import {LaboratoryInfoModalComponent} from './laboratory-info-modal/laboratory-info-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UUID} from 'angular2-uuid';
import {FRONT_URL} from '../app.constants';
import {MemetickInventoryApiService} from '../api/memetick-inventory-api-service';
import {StorageService} from '../services/storage-service';

declare const fabric: any;

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.scss']
})
export class LaboratoryComponent implements OnInit {

  public labVer = 0.1;

  public canvas: any;

  public props: any = {
    canvasFill: '#ffffff',
    canvasImage: false,
    opacity: null,
    fill: null,
    fontSize: null,
    lineHeight: null,
    charSpacing: null,
    fontWeight: null,
    fontStyle: null,
    textAlign: null,
    fontFamily: 'arial',
    TextDecoration: ''
  };

  public groupType = 'activeSelection';
  public textString: string;
  public size: any = {
    width: 500,
    height: 600
  };

  public textEditor = false;
  public imageEditor = false;
  public figureEditor = false;
  public loadFile = false;
  public isAuth = false;
  public selected: any;

  constructor(
    private router: Router,
    private oauth: OauthApiService,
    private modalService: NgbModal,
    private inventoryApi: MemetickInventoryApiService,
    private storage: StorageService
  ) {
    this.isAuth = oauth.checkTokens();
  }

  @HostListener('window:beforeunload', ['$event'])
  doSomething($event) {
    $event.returnValue = 'Ваша работа может пропасть!';
  }

  ngOnInit() {
    // setup front side canvas
    this.canvas = new fabric.Canvas('canvas', {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue'
    });

    this.setCanvasFill();

    this.canvas.on({
      'object:moving': (e) => {
      },
      'object:modified': (e) => {
      },
      'selection:created': (e) => {

        const selectedObject = e.target;
        this.selected = selectedObject;
        selectedObject.hasRotatingPoint = true;
        selectedObject.transparentCorners = false;

        this.resetPanels();

        if (selectedObject.type !== this.groupType && selectedObject) {

          this.getOpacity();

          switch (selectedObject.type) {
            case 'rect':
            case 'circle':
            case 'triangle':
              this.figureEditor = true;
              this.textEditor = false;
              this.getFill();
              break;
            case 'i-text':
              this.textEditor = true;
              this.getLineHeight();
              this.getCharSpacing();
              this.getBold();
              this.getFontStyle();
              this.getFill();
              this.getTextDecoration();
              this.getTextAlign();
              this.getFontFamily();
              break;
            case 'image':
              this.textEditor = false;
              break;
          }
        }
      },
      'selection:cleared': (e) => {
        this.selected = null;
        this.resetPanels();
      }
    });

    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);
  }

  /*------------------------Block elements------------------------*/

  // Block "Size"

  changeSize() {
    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);
  }

  // Block "Add text"

  addText() {
    const textString = this.textString;
    const text = new fabric.IText(textString, {
      left: 10,
      top: 10,
      fontFamily: 'helvetica',
      angle: 0,
      fill: '#000000',
      scaleX: 0.5,
      scaleY: 0.5,
      fontWeight: '',
      hasRotatingPoint: true
    });
    this.extend(text, this.randomId());
    this.canvas.add(text);
    this.selectItemAfterAdded(text);
    this.textString = '';
  }

  // Block "Upload Image"

  addImageOnCanvas(url) {
    if (url) {
      fabric.Image.fromURL(url, (image) => {
        image.set({
          left: 10,
          top: 10,
          angle: 0,
          padding: 10,
          cornersize: 10,
          hasRotatingPoint: true
        });
        image.scaleToWidth(200);
        image.scaleToHeight(200);
        this.extend(image, this.randomId());
        this.canvas.add(image);
        this.selectItemAfterAdded(image);
      });
    }
  }

  readUrl(event) {
    this.loadFile = true;
    const files = event.target.files;

    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (eventLoad) => {
        const url = eventLoad.target['result'];
        this.addImageOnCanvas(url);
        this.loadFile = false;
      };
      reader.readAsDataURL(files[0]);
    }
  }

  // Block "Add figure"

  addFigure(figure) {
    let add: any;
    switch (figure) {
      case 'square':
        add = new fabric.Rect({
          width: 100, height: 100, left: 10, top: 10, angle: 0,
          fill: '#000'
        });
        break;
      case 'circle':
        add = new fabric.Circle({
          radius: 50, left: 10, top: 10, fill: '#000'
        });
        break;
    }
    this.extend(add, this.randomId());
    this.canvas.add(add);
    this.selectItemAfterAdded(add);
  }

  /*Canvas*/

  cleanSelect() {
    this.canvas.discardActiveObject().renderAll();
  }

  selectItemAfterAdded(obj) {
    this.canvas.setActiveObject(obj);
  }

  setCanvasFill() {
    if (!this.props.canvasImage) {
      this.canvas.setBackgroundColor(
        this.props.canvasFill,
        () => this.canvas.renderAll()
      );
    }
  }

  extend(obj, id) {
    obj.toObject = (function (toObject) {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          id: id
        });
      };
    })(obj.toObject);
  }

  setCanvasImage(e) {
    const files = e.target.files;

    if (!files || !files[0]) { return; }

    const file = files[0];
    const reader = new FileReader();
    const canvas = this.canvas;

    reader.onload = (f) => {
      // @ts-ignore
      fabric.Image.fromURL(f.target.result, (img) => {
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width / img.width,
          scaleY: canvas.height / img.height
        });
        this.props.canvasImage = true;
      });
    };

    reader.readAsDataURL(file);
  }

  randomId() {
    return Math.floor(Math.random() * 999999) + 1;
  }

  /*------------------------Global actions for element------------------------*/

  getActiveStyle(styleName, object) {
    object = object || this.canvas.getActiveObject();
    if (!object) {
      return '';
    }

    return (object.getSelectionStyles && object.isEditing)
      ? (object.getSelectionStyles()[styleName] || '')
      : (object[styleName] || '');
  }

  setActiveStyle(styleName, value, object) {
    object = object || this.canvas.getActiveObject();
    if (!object) {
      return;
    }

    if (object.setSelectionStyles && object.isEditing) {
      const style = {};
      style[styleName] = value;
      object.setSelectionStyles(style);
      object.setCoords();
    } else {
      object.set(styleName, value);
    }

    object.setCoords();
    this.canvas.renderAll();
  }

  getActiveProp(name) {
    const object = this.canvas.getActiveObject();
    if (!object) { return ''; }
    return object[name] || '';
  }

  setActiveProp(name, value) {
    const object = this.canvas.getActiveObject();
    if (!object) { return; }
    object.set(name, value).setCoords();
    this.canvas.renderAll();
  }

  clone() {
    const activeObject = this.canvas.getActiveObject();

    if (activeObject) {
      let clone;
      switch (activeObject.type) {
        case 'rect':
          clone = new fabric.Rect(activeObject.toObject());
          break;
        case 'circle':
          clone = new fabric.Circle(activeObject.toObject());
          break;
        case 'triangle':
          clone = new fabric.Triangle(activeObject.toObject());
          break;
        case 'i-text':
          clone = new fabric.IText('', activeObject.toObject());
          break;
        case 'image':
          clone = fabric.util.object.clone(activeObject);
          break;
      }
      if (clone) {
        clone.set({left: 10, top: 10});
        this.canvas.add(clone);
        this.selectItemAfterAdded(clone);
      }
    }
  }

  getOpacity() {
    this.props.opacity = this.getActiveStyle('opacity', null) * 100;
  }

  setOpacity() {
    this.setActiveStyle('opacity', parseInt(this.props.opacity) / 100, null);
  }

  getFill() {
    this.props.fill = this.getActiveStyle('fill', null);
  }

  setFill() {
    this.setActiveStyle('fill', this.props.fill, null);
  }

  getLineHeight() {
    this.props.lineHeight = this.getActiveStyle('lineHeight', null);
  }

  setLineHeight() {
    this.setActiveStyle('lineHeight', parseFloat(this.props.lineHeight), null);
  }

  getCharSpacing() {
    this.props.charSpacing = this.getActiveStyle('charSpacing', null);
  }

  setCharSpacing() {
    this.setActiveStyle('charSpacing', this.props.charSpacing, null);
  }

  getFontSize() {
    this.props.fontSize = this.getActiveStyle('fontSize', null);
  }

  setFontSize() {
    this.setActiveStyle('fontSize', parseInt(this.props.fontSize), null);
  }

  getBold() {
    this.props.fontWeight = this.getActiveStyle('fontWeight', null);
  }

  setBold() {
    this.props.fontWeight = !this.props.fontWeight;
    this.setActiveStyle('fontWeight', this.props.fontWeight ? 'bold' : '', null);
  }

  getFontStyle() {
    this.props.fontStyle = this.getActiveStyle('fontStyle', null);
  }

  setFontStyle() {
    this.props.fontStyle = !this.props.fontStyle;
    this.setActiveStyle('fontStyle', this.props.fontStyle ? 'italic' : '', null);
  }

  getTextDecoration() {
    this.props.TextDecoration = this.getActiveStyle('textDecoration', null);
  }

  setTextDecoration(value) {
    let iclass = this.props.TextDecoration;
    if (iclass.includes(value)) {
      iclass = iclass.replace(RegExp(value, 'g'), '');
    } else {
      iclass += ` ${value}`;
    }
    this.props.TextDecoration = iclass;
    this.setActiveStyle('textDecoration', this.props.TextDecoration, null);
  }

  hasTextDecoration(value) {
    return this.props.TextDecoration.includes(value);
  }

  getTextAlign() {
    this.props.textAlign = this.getActiveProp('textAlign');
  }

  setTextAlign(value) {
    this.props.textAlign = value;
    this.setActiveProp('textAlign', this.props.textAlign);
  }

  getFontFamily() {
    this.props.fontFamily = this.getActiveProp('fontFamily');
  }

  setFontFamily() {
    if (this.props.fontFamily) {
      this.setActiveProp('fontFamily', this.props.fontFamily);
    }
  }

  /*System*/

  removeSelected() {
    const activeObjects = this.canvas.getActiveObjects();

    activeObjects.forEach((object) => {
      this.canvas.remove(object);
    });

    this.canvas.discardActiveObject();
  }

  bringToFront() {
    const activeObjects = this.canvas.getActiveObjects();

    activeObjects.forEach((object) => {
      object.bringToFront();
      this.cleanSelect();
    });
  }

  sendToBack() {
    const activeObjects = this.canvas.getActiveObjects();

    activeObjects.forEach((object) => {
      object.sendToBack();
      this.cleanSelect();
    });
  }

  viewer() {
      const image = new Image();
      image.src = this.canvas.toDataURL('png');
      const w = window.open('');
      w.document.write(image.outerHTML);
  }

  saver() {
    fabric.Image.fromURL(FRONT_URL + '/assets/images/lab_mark.png', (image) => {
      image.set({
        left: this.canvas.width - 200,
        top: this.canvas.height - 40,
      });

      this.canvas.add(image);
      this.canvas.renderAll();

      const url = this.canvas.toDataURL('png');
      const link = document.createElement('a');

      link.download = UUID.UUID() + '.png';
      link.href = url;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  creator() {
    if (this.isAuth) {
      this.inventoryApi.haveCell().subscribe(() => {
        let dataURL = this.canvas.toDataURL('png');
        dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
        this.storage.saveLabMeme(dataURL);
        this.router.navigateByUrl('/memes/create?lab=true');
      }, () => {
        alert('Ваша клетка ещё не выросла');
      });
    } else {
      alert('Создавать мемы на Мемастике могут только авторизованные пользователи');
      this.router.navigateByUrl('/start');
    }
  }

  cleaner() {
    if (confirm('Вы в этом уверены?')) {
      this.canvas.clear();
    }
  }

  helper() {
    this.modalService.open(LaboratoryInfoModalComponent, {'centered': true});
  }

  redirecter() {
    if (confirm('Покинуть лабораторию?')) {
      if (this.isAuth) {
        this.router.navigateByUrl('/home');
      } else {
        this.router.navigateByUrl('/start');
      }
    }
  }

  resetPanels() {
    this.textEditor = false;
    this.imageEditor = false;
    this.figureEditor = false;
  }
}
