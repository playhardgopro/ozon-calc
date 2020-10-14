import { Component } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";

import { ControlledInput, Spinner } from "@/components";
import styles from "./Display.css?module";
import MyStore from "@/store/root";
import { useStore } from "vuex-simple";

@Component
export default class Display extends VueComponent {
  typedStore = useStore<MyStore>(this.$store);

  get isLoading() {
    return this.typedStore.isLoading;
  }
  get buffer() {
    return this.typedStore.buffer;
  }
  get result() {
    return this.typedStore.result;
  }
  get showEqualitySign() {
    return this.result && !this.isLoading;
  }
  validate(value: string) {
    return value
      .replace(/[^\d+-]/g, "") /* 'qwerty23+4asd-4' => '23+4-4'*/
      .replace(/(\d+)|(\+)+|(\-)+/g, " $1$2$3"); /* '123-456' => ' 123 - 456' */
  }
  onInput(value: string) {
    this.typedStore.setBuffer(value);
  }
  onKeyboardEvent(event: KeyboardEvent) {
    // Использовал event.key, потому что event.keyCode is deprecated
    if (event.key === "Enter") {
      this.typedStore.equal();
    }
    if (event.key === "Delete") {
      this.typedStore.clear();
    }
  }
  render() {
    return (
      <div class={styles.display}>
        <ControlledInput
          value={this.buffer}
          class={styles.buffer}
          readonly={this.isLoading}
          validate={this.validate}
          onInput={this.onInput}
          onKeyup={this.onKeyboardEvent}
        />
        <span
          class={[
            styles.result,
            {
              [styles.equal]: this.showEqualitySign,
            },
          ]}
        >
          {this.isLoading ? <Spinner size={18} /> : this.result}
        </span>
      </div>
    );
  }
}
