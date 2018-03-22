import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit, Inject, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit, AfterViewInit {


  newName: string = '';
  newSize;
  newPrice;
  newCountry;
  newMaterial;
  newExteranlDiameter;
  newTotalLength;
  newBodyLength;
  newStemLength;
  newTotalCapacity;
  newAirholeCapacity;
  newStemType;
  newOfficialSite;

  


  newEmail: string;


  constructor(
    private cdr: ChangeDetectorRef,
    private afs: AngularFirestore,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    console.log(this.data);
    this.cdr.detectChanges();

    this.newName = this.data.name;
  }


  updateAll(): void {
    this.afs.collection('cups').doc(this.data.uid).update({
      name: this.newName,
      size: this.newSize,
      price: this.newPrice,
      country: this.newCountry,
      material: this.newMaterial,
      externalDiameter: this.newExteranlDiameter,
      totalLength: this.newTotalLength,
      bodyLength: this.newBodyLength,
      stemLength: this.newStemLength,
      totalCapacity: this.newTotalCapacity,
      airholeCapacity: this.newAirholeCapacity,
      stemType: this.newStemType,
      officialSite: this.newOfficialSite
    });
    this.dialogRef.close();
  }


  updateName(): void {
    console.log(this.data);
    console.log(this.newName);

    this.afs.collection('cups').doc(this.data.id).update({ name: this.newName });
    
    this.dialogRef.close();
  }
  updateEmail(): void {
    this.afs.collection('cups').doc(this.data.uid).update({ email: this.newEmail });
    this.dialogRef.close();
  }

}
