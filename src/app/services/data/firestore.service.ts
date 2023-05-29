import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { getDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import Song from 'src/app/interfaces/song';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public fstore: Firestore) { }

  createSong(song: Song) {
    const placeRef = collection(this.fstore, 'songList');
    return addDoc(placeRef, song)
  }

  getSongs(): Observable<Song[]> {
    const placeRef = collection(this.fstore, 'songList')
    return collectionData(placeRef, { idField: 'id' }) as Observable<Song[]>
  }

  getSongDetail(songId: string) {
    const placeRef = doc(this.fstore, `songList/${songId}`);
    return getDoc(placeRef)
  }

  updateSong(songId: string, song: any){
    const placeRef = doc(this.fstore, `songList/${songId}`)
    return updateDoc(placeRef, song);
  }

  deleteSong(song: Song){
    const placeRef = doc(this.fstore, `songList/${song.id}`);
    return deleteDoc(placeRef);
  }
}
