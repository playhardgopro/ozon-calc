import { Component, Prop, Vue } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";

// import Keyboard from "@/components/Keyboard/Keyboard";
import styles from "./Display.css?module";
import MyStore from "@/store/root";
import { useStore } from "vuex-simple";

interface Props {
  // buffer: string;
  // result: number
}
/**
 * Add spaces to "+" and "-"
 * @param {string[]} array
 * @returns {string[]}
 */
function addSpacesToPlusAndMinus(array: string[]) {
  return array
    .join("")
    .replace(/[+-]/gi, " $& ")
    .split("");
}

@Component
export default class Display extends VueComponent<Props> {
  typedStore: MyStore = useStore(this.$store);
  get buffer() {
    return addSpacesToPlusAndMinus(this.typedStore.buffer);
  }
  get result() {
    return this.typedStore.result;
  }
  render() {
    return (
      <div class={styles.display}>
        {!!this.buffer && <span class={styles.buffer}>{this.buffer}</span>}
        {!!this.result && <span class={styles.result}>{this.result}</span>}
      </div>
    );
  }
}
