import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collectionData, collection, setDoc, doc, addDoc, CollectionReference, DocumentData, getDoc, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  game: Game;
  gameId: string;
  gameOver = false;

  constructor(private firestore: AngularFirestore, private route: ActivatedRoute, public dialog: MatDialog) {

  }


  ngOnInit() {

    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params)
      this.gameId = params['id']
      console.log(this.gameId)
      this.firestore.collection('games').doc(this.gameId).valueChanges().subscribe((game: any) => {
        console.log(game)
        this.game.currentPlayer = game.currentPlayer;
        this.game.stack = game.stack;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
        this.game.images = game.images;
      })
    })
  }


  newGame() {
    this.game = new Game;
  }


  showNextCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop()

      this.game.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.pickCardAnimation = false;
        this.game.playedCards.push(this.game.currentCard)
        this.saveGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent)

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name)
        this.game.images.push('gender.png')
        this.saveGame();
      }
    });
  }


  saveGame() {
    this.firestore.collection('games').doc(this.gameId).update(this.game.toJson());
  }

  editPlayer(playerId: number) {
    console.log(playerId)
    const dialogRef = this.dialog.open(EditPlayerComponent)
    dialogRef.afterClosed().subscribe((image: string) => {
      if (image && image.length > 0) {
        if (image == 'DELETE') {
          this.game.images.splice(playerId, 1)
          this.game.players.splice(playerId, 1)
        }
        else {
          this.game.images[playerId] = image;

        }
        this.saveGame();
      }
    });
  }
}