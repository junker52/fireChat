import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mensaje } from '../interface/mensaje';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<Mensaje[]>;

  public chats: Mensaje[];

  constructor(private afs: AngularFirestore) { }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats');
    return this.itemsCollection.valueChanges()
                .pipe(
                  map((mensajes: Mensaje[]) => {
                    console.log(mensajes);
                    this.chats = mensajes;
                  })
                );
  }
}
