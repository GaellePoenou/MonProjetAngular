import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  secondes: number = 0;
  counterSubscription: Subscription | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.signIn().then((isAuth) => {
      if (isAuth) {
        const counter = interval(1000);
        this.counterSubscription = counter.subscribe(
          (value: number) => {
            this.secondes = value;
          }
        );
      }
    });
  }

  async ngOnDestroy() {
    if (this.authService.isAuth) {
      await this.authService.signOut(); // Attendre la déconnexion
    }

    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe(); // Désabonner le compteur s'il est actif
    }
  }








}
