import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Livros } from '../models/livros.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  livros!: Observable<Livros[]>

  constructor(private firebaseService: FirebaseService,
    private router: Router) {
    this.livros = this.firebaseService.list();
  }

  newLivros() {
    this.router.navigateByUrl('/tabs/register');
  }

  editLivros(id:string) {
    this.router.navigateByUrl(`/tabs/details/${id}`);
  }
}
