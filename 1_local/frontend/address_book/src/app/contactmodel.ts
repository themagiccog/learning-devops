// Data model for contact class

import * as uuid from "uuid";

export class Contact {

  public id: number = Number(uuid.v4())
  public name: string = ''
  public address: string = ''
  public is_male?: boolean = false

  public constructor(init?:Partial<Contact>) {
    Object.assign(this, init);
  }

}

