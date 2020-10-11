import { Component, Vue } from "vue-property-decorator";
import { VueComponent } from "./shims-vue";
import HelloWorld from "./components/HelloWorld";

import "./App.css";
import Calculator from "./components/Calculator/Calculator";

@Component
export default class App extends VueComponent {
  render() {
    return (
      <div id="app">
        <Calculator />
        {/* <img alt="Vue logo" src={require('./assets/logo.png')} /> */}
        {/* <HelloWorld msg={"Welcome to Your Vue.js + TypeScript App"}/> */}
      </div>
    );
  }
}
