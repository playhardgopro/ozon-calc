import { Component } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";

import { ControlledInput } from "@/components";
import styles from "./Display.css?module";
import MyStore from "@/store/root";
import { useStore } from "vuex-simple";

@Component
export default class Display extends VueComponent {
  typedStore = useStore<MyStore>(this.$store);

  get buffer() {
    return this.typedStore.buffer;
  }
  get result() {
    return this.typedStore.result;
  }
  onInput(value: string) {
    this.typedStore.setBuffer(value);
  }
  onEnterPress(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.typedStore.equal();
    }
  }
  render() {
    return (
      <div class={styles.display}>
        <ControlledInput
          value={this.buffer}
          class={styles.buffer}
          key="input"
          onInput={this.onInput}
          onKeyup={this.onEnterPress}
        />
        {this.result === null ? (
          ""
        ) : (
          <span class={styles.result}>{this.result}</span>
        )}
      </div>
    );
  }
}
