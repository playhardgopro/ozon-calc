import { Component } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";
import { KeyType } from "@/typings/constants";

import Key from "@/components/Key/Key";

import styles from "./Keyboard.css?module";
import MyStore from "@/store/root";
import { useStore } from "vuex-simple";

const keys: { value: string; type: KeyType }[] = [
  { value: "7", type: KeyType.NUMBER },
  { value: "8", type: KeyType.NUMBER },
  { value: "9", type: KeyType.NUMBER },
  { value: "C", type: KeyType.CLEAR },
  { value: "4", type: KeyType.NUMBER },
  { value: "5", type: KeyType.NUMBER },
  { value: "6", type: KeyType.NUMBER },
  { value: "-", type: KeyType.MINUS },
  { value: "1", type: KeyType.NUMBER },
  { value: "2", type: KeyType.NUMBER },
  { value: "3", type: KeyType.NUMBER },
  { value: "+", type: KeyType.PLUS },
  { value: "0", type: KeyType.NUMBER },
  { value: "=", type: KeyType.EQUAL },
];

@Component
export default class Keyboard extends VueComponent {
  typedStore = useStore<MyStore>(this.$store);

  get isLoading() {
    return this.typedStore.isLoading;
  }

  handleClick(e: { value: string; type: KeyType }) {
    switch (e.type) {
      case KeyType.CLEAR:
        this.typedStore.clear();
        return;
      case KeyType.PLUS:
        this.typedStore.plus(e.value);
        return;
      case KeyType.MINUS:
        this.typedStore.minus(e.value);
        return;
      case KeyType.EQUAL:
        this.typedStore.equal();
        return;
      default:
        this.typedStore.updateDisplay(e.value);
    }
  }

  render() {
    return (
      <div class={styles.Keyboard}>
        {keys.map((key, index) => {
          return (
            <Key
              value={key.value}
              type={key.type}
              disabled={this.isLoading}
              key={`${key.value}-${index}`}
              onClick={this.handleClick}
            />
          );
        })}
      </div>
    );
  }
}
