import { Endereco } from "./endereco.model";
import { LivroCategoria } from "./livroCategoria.enum";

export class Livros{
  id!: string;
  nome!: string;
  autor!: string;
  ano!: number;
  categoria!: LivroCategoria;
  livraria!: string;
  username!: string;
  password!: string;
  email!: string;
  cpf!: string;
  cep!: string;
  logradouro!: string;
  numero!: number;
  bairro!: string;
  localidade!: string;
  endereco!: Endereco;
}
