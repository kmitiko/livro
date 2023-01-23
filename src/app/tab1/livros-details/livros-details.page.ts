import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Livros } from '../../models/livros.model';

@Component({
  selector: 'app-livros-details',
  templateUrl: './livros-details.page.html',
  styleUrls: ['./livros-details.page.scss'],
})
export class LivrosDetailsPage implements OnInit {
  public livros!: Livros;
  livrosFormGroup!: FormGroup;
  @ViewChild('livrosFormGroupDirective')
  livrosFormGroupDirective!: FormGroupDirective;

  constructor(
    private firebaseService: FirebaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.firebaseService.find(id!).subscribe({
      next: (data: Livros) => {
        if (!data) {
          this.router.navigateByUrl('/tabs/list');
        } else {
          this.livros = data;

          this.livrosFormGroup = new FormGroup({
            nome: new FormControl(this.livros.nome, Validators.required),
            autor: new FormControl(this.livros.autor, Validators.required),
            ano: new FormControl(this.livros.ano, Validators.required),
            categoria: new FormControl(
              this.livros.categoria,
              Validators.required
            ),
            livraria: new FormControl(
              this.livros.livraria,
              Validators.required
            ),
            username: new FormControl(
              this.livros.username,
              Validators.required
            ),
            password: new FormControl(
              this.livros.password,
              Validators.required
            ),
            email: new FormControl(this.livros.email, Validators.required),
            cpf: new FormControl(this.livros.cpf, Validators.required),
            cep: new FormControl(this.livros.cep, Validators.required),
            logradouro: new FormControl(
              this.livros.logradouro,
              Validators.required
            ),
            numero: new FormControl(this.livros.numero, Validators.required),
            bairro: new FormControl(this.livros.bairro, Validators.required),
            localidade: new FormControl(
              this.livros.localidade,
              Validators.required
            ),
          });
        }
      },
      error: (err) => console.error(`Error on get livro data. Error: ${err}`),
    });
  }

  editLivros(values: any) {
    let updateLivros: Livros = { id: this.livros.id, ...values };
    this.firebaseService
      .update(updateLivros)
      .then(() => this.router.navigateByUrl('/tabs/list'))
      .catch((err) => console.error(err));

    this.livrosFormGroupDirective.reset();
  }

  deleteLivros() {
    this.firebaseService
      .delete(this.livros.id)
      .then(() => this.router.navigateByUrl('/tabs/list'))
      .catch((err) => console.error(err));
  }
}
