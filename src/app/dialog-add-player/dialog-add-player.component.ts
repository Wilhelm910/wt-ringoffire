import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogAddPlayerComponent>,) { }
  
  name: string = '';


  ngOnInit() {

  }

  onNoClick() {
    this.dialogRef.close();
  }
}
