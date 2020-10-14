import { Component } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";
import { CalculatorKeyType } from "@/typings/constants";

import { Key } from "@/components";

import styles from "./Keyboard.css?module";
import MyStore from "@/store/root";
import { useStore } from "vuex-simple";
import { CalculatorKey } from "@/typings/types";

const keys: CalculatorKey[] = [
  { value: "7", text: "7", type: CalculatorKeyType.NUMBER },
  { value: "8", text: "8", type: CalculatorKeyType.NUMBER },
  { value: "9", text: "9", type: CalculatorKeyType.NUMBER },
  { value: "C", text: "C", type: CalculatorKeyType.CLEAR },
  { value: "4", text: "4", type: CalculatorKeyType.NUMBER },
  { value: "5", text: "5", type: CalculatorKeyType.NUMBER },
  { value: "6", text: "6", type: CalculatorKeyType.NUMBER },
  { value: "-", text: "—", type: CalculatorKeyType.MINUS },
  { value: "1", text: "1", type: CalculatorKeyType.NUMBER },
  { value: "2", text: "2", type: CalculatorKeyType.NUMBER },
  { value: "3", text: "3", type: CalculatorKeyType.NUMBER },
  { value: "+", text: "+", type: CalculatorKeyType.PLUS },
  { value: "0", text: "0", type: CalculatorKeyType.NUMBER },
  { value: "=", text: "=", type: CalculatorKeyType.EQUAL },
];

@Component
export default class Keyboard extends VueComponent {
  typedStore = useStore<MyStore>(this.$store);

  get isLoading() {
    return this.typedStore.isLoading;
  }

  handleClick(key: CalculatorKey) {
    switch (key.type) {
      case CalculatorKeyType.CLEAR:
        this.typedStore.clear();
        return;
      case CalculatorKeyType.EQUAL:
        this.typedStore.equal();
        return;
      default:
        this.typedStore.updateBuffer(key.value);
    }
  }

  render() {
    return (
      <div class={styles.keyboard}>
        {keys.map((key) => {
          return (
            <Key
              value={key.value}
              key={key.value}
              text={key.text}
              type={key.type}
              disabled={this.isLoading}
              onClick={this.handleClick}
            />
          );
        })}
      </div>
    );
  }
}
