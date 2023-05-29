import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { getDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import RecordingStudios from 'src/app/interfaces/recording-studios';

@Injectable({
  providedIn: 'root'
})
export class RecordingService {

  constructor(public fstore: Firestore) { }

  createRecording(recording: RecordingStudios) {
    const placeRef = collection(this.fstore, 'recordingList');
    return addDoc(placeRef, recording)
  }

  getRecordings(): Observable<RecordingStudios[]> {
    const placeRef = collection(this.fstore, 'recordingList')
    return collectionData(placeRef, { idField: 'id' }) as Observable<RecordingStudios[]>
  }

  getRecordingDetail(songId: string) {
    const placeRef = doc(this.fstore, `recordingList/${songId}`);
    return getDoc(placeRef)
  }

  updateRecording(recordingId: string, recording: any){
    const placeRef = doc(this.fstore, `recordingList/${recordingId}`)
    return updateDoc(placeRef, recording);
  }

  deleteRecording(song: RecordingStudios){
    const placeRef = doc(this.fstore, `recordingList/${song.id}`);
    return deleteDoc(placeRef);
  }
}
