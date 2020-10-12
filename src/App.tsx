import { Component, Vue } from "vue-property-decorator";
import { VueComponent } from "@/shims-vue";

import "@/App.css";
import Calculator from "@/components/Calculator/Calculator";

@Component
export default class App extends VueComponent {
  render() {
    return (
      <div id="app">
        <Calculator />
      </div>
    );
  }
}
