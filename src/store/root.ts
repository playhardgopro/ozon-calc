import { Mutation, State, Getter, Action } from 'vuex-simple';
import { isLastCharEqual } from './utils';

export default class MyStore {
  @State() buffer: string = "";
  @State() result: number | null = null;

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
  async clear() {
    this.setBuffer("")
    this.setResult(null)
  }
  @Action()
  async plus(payload: string) {
    if (!isLastCharEqual(this.buffer, payload)) {
      this.pushBuffer(payload)
    }
  }
  @Action()
  async minus(payload: string) {
    if (!isLastCharEqual(this.buffer, payload)) {
      this.pushBuffer(payload)
    }
  }
  @Action()
  async updateDisplay(payload: string) {
    this.pushBuffer(payload)
  }
  @Action()
  async equal() {
    if (!isLastCharEqual(this.buffer, "+") && !isLastCharEqual(this.buffer, "-")) {
      const result: number = window.eval(this.buffer)
      this.setResult(result)
    }
  }
}

