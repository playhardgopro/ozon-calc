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
        <Keyboard />
      </div>
    );
  }
}
