import { Mutation, State, Getter, Action } from 'vuex-simple';

export default class MyStore {
  @State() buffer: string[] = [];
  @State() result: number = 0;

  @Mutation()
  setBuffer(payload: string) {
    this.buffer = [...payload]
  }

  @Mutation()
  pushBuffer(payload: string) {
    this.buffer?.push(payload)
  }

  @Mutation()
  setResult(payload: number) {
    this.result = payload
  }

  @Action()
  async clear() {
    this.setBuffer("")
    this.setResult(0)
  }
  @Action()
  async updateDisplay(payload: any) {
    this.pushBuffer(payload)
  }
  @Action()
  async equal() {
    // this.setBuffer(this.buffer + payload)
    const result: number = window.eval(this.buffer.join(''))
    this.setResult(result)
  }
}
