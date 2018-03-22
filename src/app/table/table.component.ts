import { EditDialogComponent } from './../edit-dialog/edit-dialog.component';

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';

import * as faker from 'faker';

export interface Color {
  name: string;
  code: string;
}

export interface Stem {
  name: string;
  name_eng: string;
  isNonslip: boolean;
}

export interface Cup {
  id: string;
  name: string;
  name_eng: string;
  imgUrls: string;
  size: string;
  size_eng: string;
  colors?: Color[];
  officialSite: string;
  country: string;
  country_eng: string;
  price?: string;
  externalDiameter: string;
  totalLength: string;
  bodyLength: string;
  topToHole: string;
  stemType: Stem[];
  stemLength: number;
  material: string;
  totalCapacity: string;
  airholeCapacity: any;
  airholeType: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  cupCollection: AngularFirestoreCollection<any>;
  cups;

  displayedColumns = [
    'name', 'size', 'price', 'country',
    'externalDiameter',
    'totalLength', 
    'totalCapacity',
    'edit'];
  
  /*
  displayedColumns = [
      'name', 'size', 'price', 'country', 'material',
      'externalDiameter',
      'totalLength', 'bodyLength', 'stemLength',
      'totalCapacity', 'airholeCapacity',
      'stemType',
      'officialSite',
    'edit'
  ];
  */
  dataSource: MatTableDataSource<any>; 

  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private afs: AngularFirestore,
    public dialog: MatDialog
  ) { }

  ngOnInit() { }

  
  ngAfterViewInit() {
    this.afs.collection<any>('cups')
      .valueChanges()
      .subscribe(data => { // 이렇게 한번에 다이렉트로 해도 상관 없다.
        // 데이터를 MaterialDataSource()안에 넣어주면 되는 구조.
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  /*
  // Database seeding
  addOne() {
    const hacker = {
      name: faker.name.findName(),
      age: faker.random.number({ min: 18, max: 99 }),
      email: faker.internet.email(),
      phrase: faker.hacker.phrase(),
      uid: faker.random.alphaNumeric(16)
    }
    this.afs.collection('hackers').doc(hacker.uid).set(hacker)
  }
  */

  openDialog(data): void {
    // console.log(data);
    // this.afs.collection('cups').doc(data.id).set({ uid: faker.random.alphaNumeric(16) }, {merge: true});

    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '80vw',
      data: data
    });
    
  }

  trackByUid(index, item) {
    return item.uid;
  }

}
