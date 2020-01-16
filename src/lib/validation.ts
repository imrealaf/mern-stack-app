import { Validator, validators } from "./validators";

/**
 *  Validation interface
 */
interface IValidation {
  validators: any;
  use(key: Validator): string | undefined;
}

/**
 *  Validation instance
 */
class Validation implements IValidation {
  public validators: any;
  public value: any | undefined;

  /**
   *  Contructor
   */
  constructor(data: any) {
    this.validators = data;
  }

  /**
   *  Use validator function
   */
  public use(key: Validator, data: any = null) {
    const definition = this.validators[key] as string | undefined;

    /**
     *  If is a callable function
     */
    if (Object.prototype.toString.call(definition) === "[object Function]") {
      this.value = this.validators[key](data);

      /**
       *  Else normal value
       */
    } else {
      this.value = this.validators[key];
    }

    return this.value;
  }
}

/* Export */
export default new Validation(validators);
