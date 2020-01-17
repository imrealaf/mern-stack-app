import { dictionary, DictionaryDefinition } from "./dictionary";

/**
 *  Message interface
 */
interface IMessage {
  dictionary: any;
  get(key: DictionaryDefinition): string | undefined;
}

/**
 *  Message instance
 */
class Message implements IMessage {
  public dictionary: any;
  public value: any | undefined;

  /**
   *  Contructor
   */
  constructor(data: any) {
    this.dictionary = data;
  }

  /**
   *  Get definition
   */
  public get(key: DictionaryDefinition, data: any = null) {
    const definition = this.dictionary[key] as string | undefined;

    /**
     *  If is a callable function
     */
    if (Object.prototype.toString.call(definition) === "[object Function]") {
      this.value = Function.call(this.dictionary[key], [data]);
      /**
       *  Else normal value
       */
    } else {
      this.value = this.dictionary[key];
    }

    return this.value;
  }
}

/* Export */
export default new Message(dictionary);
