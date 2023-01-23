import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, docSnapshots, Firestore, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Livros } from '../models/livros.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore ) { }

  save(livros: Livros): Promise<void> {
    const document = doc (collection(this.firestore, 'livros'));
    return setDoc(document, livros);
  }

  list(): Observable<Livros[]> {
    const livrosCollection = collection(this.firestore, 'livros');
    return collectionData(livrosCollection, {idField: 'id'}).pipe(
      map(result => result as Livros[])
    );
  }

  find(id: string): Observable<Livros> {
    const document = doc(this.firestore, `livros/${id}`);
    return docSnapshots(document)
    .pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as Livros;
      })
    );
  }

  findByName(nome: string): Observable<Livros[]> {
    const livrosList = this.list();
    return livrosList.pipe(
      map(
        livros => livros.filter(livros => {
          const fullName = livros.nome.concat("", livros.autor);
          return fullName.toLowerCase().match(nome.toLowerCase());
        })
    ));
  }

  update(livros: Livros): Promise<void> {
    const document = doc(this.firestore, 'livros', livros?.id);
    const {id, ...data } = livros;
    return setDoc(document, data);
  }

  delete(id: string): Promise<void> {
    const document = doc(this.firestore, 'livros', id);
    console.log(document)
    return deleteDoc(document);
  }
}
