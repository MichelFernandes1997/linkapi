import { uuid } from 'uuidv4'

export class Deal {
    public readonly id: string;

    public amount: string;

    public date: string;

    constructor (props: Omit<Deal, 'id'>, id?: string) {
      Object.assign(this, props)

      if (!id) {
        this.id = uuid()
      }
    }
}
