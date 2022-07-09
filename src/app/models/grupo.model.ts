

export class Grupo {
  constructor(
    public nombre: string,
    public valorMax: number,
    public valorAct: number,
    public fecha?: string,
    public _id?: string | any,
  ){ }
}
