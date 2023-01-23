import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Endereco } from '../models/endereco.model';
import { Livros } from '../models/livros.model';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';
import { CorreiosService } from '../services/correios.service';
import { FirebaseService } from '../services/firebase.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  profile: any = null;
  livrosFormGroup!: FormGroup;
  @ViewChild('livrosFormGroupDirective')
  livrosFormGroupDirective!: FormGroupDirective;

  constructor(
    private firebaseService: FirebaseService,
    private correiosService: CorreiosService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private avatarService: AvatarService
  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }
  ngOnInit(): void {
    this.livrosFormGroup = new FormGroup({
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z]/),
      ]),
      autor: new FormControl('', Validators.required),
      ano: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      livraria: new FormControl('', Validators.required),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[@*\.])[a-zA-Z0-9@*]{6,10}$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cpf: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
      ]),
      cep: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
      ]),
      logradouro: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      numero: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]+$/),
      ]),
      bairro: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      localidade: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
    });
  }

  createLivros(values: any) {
    let newLivros: Livros = { ...values };
    this.firebaseService.save(newLivros);
    console.log(newLivros);
    this.livrosFormGroupDirective.reset();
  }

  loadEndereco() {
    const cep: string = this.livrosFormGroup.get('cep')?.value;
    this.correiosService.getEndereco(cep).subscribe({
      next: (result: Endereco) => {
        this.livrosFormGroup.patchValue({
          cep: result.cep,
          logradouro: result.logradouro,
          bairro: result.bairro,
          localidade: result.localidade,
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });
    console.log(image);

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(image);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
}
