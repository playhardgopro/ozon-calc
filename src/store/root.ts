import { Mutation, State, Getter, Action } from 'vuex-simple';
import { isLastCharEqual, timeout } from './utils';

export default class MyStore {
  @State() buffer: string = "";
  @State() result: number | null = null;
  @State() isLoading: boolean = false

  @Mutation()
  setIsLoading(payload: boolean) {
    this.isLoading = payload
  }

  @Mutation()
  setBuffer(payload: string) {
    this.buffer = payload
  }
  @Mutation()
  pushBuffer(payload: string) {
    this.buffer += payload
  }

  @Mutation()
  setResult(payload: number | null) {
    this.result = payload
  }

  @Action()
  clear() {
    this.setBuffer("")
    this.setResult(null)
  }

  @Action()
  updateBuffer(payload: string) {
    this.pushBuffer(payload)
  }

  @Action()
  async equal() {
    if (!!this.buffer) {
      try {
        this.setIsLoading(true)
        // Имитация запроса к серверу
        await timeout(2000)
        if (!isLastCharEqual(this.buffer, "+") && !isLastCharEqual(this.buffer, "-")) {
          const result: number = window.eval(this.buffer);
          this.setResult(result);
          this.setBuffer(result.toLocaleString());
        }
      } catch (e) {
        throw new Error('[EQUAL ACTION]: ' + e)
      } finally {
        this.setIsLoading(false)
      }
    }
  }
}

