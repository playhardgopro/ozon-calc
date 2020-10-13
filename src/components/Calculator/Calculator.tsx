import { Component } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";

import { Keyboard, Display } from "@/components";
import styles from "./Calculator.css?module";

@Component
export default class Calculator extends VueComponent {
  render() {
    return (
      <div class={styles.calculator}>
        <Display />
        {/* <div class={styles.display}>1+1+1</div> */}
        <Keyboard />
      </div>
    );
  }
}
