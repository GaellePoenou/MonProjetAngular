import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {
  isAuth = false;
  lastUpdate: Promise<Date>;

  appareils: any[] = [];
  appareilSubscription: Subscription | undefined;

  constructor(private appareilService: AppareilService) {
    this.lastUpdate = new Promise<Date>((resolve, reject) => {
      const date = new Date();
      setTimeout(() => {
        resolve(date);
      }, 2000);
    });

    setTimeout(() => {
      this.isAuth = true;
    }, 4000);
  }

  ngOnInit(): void {
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubject();
  }

  onAllumer() {
    this.appareilService.switchOnall();
  }

  onEteindre() {
    this.appareilService.switchOffall();
  }
  onSave() {
    this.appareilService.saveAppareilsToServer();
  }
  onFetch() {
    this.appareilService.getAppareilsFromServer();
  }
}
