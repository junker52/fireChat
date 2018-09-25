import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mensaje } from '../interface/mensaje';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<Mensaje[]>;

  public chats: Mensaje[];

  public usuario: any = {};

  constructor(private afs: AngularFirestore,
     public afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe(user => {
          console.log(user);
          if (!user) {
            return;
          }

          this.usuario.nombre = user.displayName;
          this.usuario.uid = user.uid;
      });
  }

  login(proveedor: string) {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc')
      .limit(5));
    return this.itemsCollection.valueChanges()
      .pipe(
        map((mensajes: Mensaje[]) => {
          console.log(mensajes);
          this.chats = [];
          for (const mensaje of mensajes) {
            //Lo cargamos en primera posicion.
            this.chats.unshift(mensaje);
          }
          return this.chats;
        })
      );
  }

  agregarMensaje(texto: string) {
    let mensaje: Mensaje = {
      nombre: 'Demo',
      mensaje: texto,
      fecha: new Date().getTime(),
    };

    return this.itemsCollection.add(mensaje);
  }
}
