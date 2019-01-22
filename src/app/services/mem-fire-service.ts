import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {UUID} from 'angular2-uuid';

@Injectable()
export class MemFireService {

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
  ) {

  }

  startUpload(event: FileList) {
    const file = event.item(0);

    if (file == null) { return; }
    if (file.type.split('/')[0] !== 'image') {return;}

    const uuid = UUID.UUID();
    const path = `memes/${uuid}_${file.name}`;

    this.storage.upload(path, file).then(() => {
      const ref = this.storage.ref(path);
      ref.getDownloadURL().subscribe(url => {
        this.db.collection('memes').add({
          uuid: uuid,
          url: url,
          date: new Date(),
        });
      });
    });
  }

}
