import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent {



  allProfileImages = ['deer.png', 'fox.png', 'gender.png', 'giraffe.png', 'koala.png', 'rabbit.png', 'turtle.png']


  constructor(private dialogRef: MatDialogRef<EditPlayerComponent>,) { }
 
 onNoClick() {
    this.dialogRef.close();
  }

}
