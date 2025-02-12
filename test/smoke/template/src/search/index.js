import React from "react";
import ReactDOM from "react-dom";
import "./search.css";
import "./search.less";
import { common } from "../../common/index.js";
import requestHeader from "../assets/hotUpdate.png";
import { bbbbb } from "./tree-shaking.js";

// import "lib-flexible";

common();
bbbbb();
class Search extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      Text: null,
    };
  }

  loadComponent() {
    import("./text.js").then((Text) => {
      this.setState({
        Text: Text.default,
      });
    });
  }

  render() {
    const { Text } = this.state;
    return (
      <div className="react-box">
        {Text ? <Text /> : null}
        这是给 webpack 解析 react 的语法
        （我现在加了文件监听哦）（现在我又加了热更新哦）
        <img src={requestHeader} onClick={this.loadComponent.bind(this)} />
        <div className="react-css"> 这是给 webpack 解析 css 的语法</div>
        <div className="react-less"> 这是给 webpack 解析 less 的语法</div>
      </div>
    );
  }
}

ReactDOM.render(<Search />, document.getElementById("root"));
