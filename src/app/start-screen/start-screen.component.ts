import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/models/game';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

  }

  newGame() {
    let game = new Game();
    this.firestore.collection('games').add(game.toJson()).then((gameInfo:any) => {
      console.log(gameInfo)
      this.router.navigateByUrl('/game/' + gameInfo.id)
    })
    
  }

}
