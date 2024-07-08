import { Keyboard, Manager } from "./manager";
import { LoaderScene } from "./scenes/LoaderScene";

Manager.initialize(800, 600, 0x6495ed);

// We no longer need to tell the scene the size because we can ask Manager!
const loady: LoaderScene = new LoaderScene();
Manager.changeScene(loady);

// function resize() {
//   Manager.initialize;
//   const ratio = Manager.gameScene.width / Manager.gameScene.height;

//   var w = window.innerWidth;
//   var h = window.innerHeight;

//   console.log("resize w:" + w + " h:" + h);

//   Manager._width = w;
//   Manager._height = h;

//   Manager.gameScene.height = h;
//   Manager.gameScene.width = h * ratio;
//   // Manager._height = h;
//   // Manager._width = h * ratio;
//   console.log(
//     "gamescene ratio: " +
//       ratio +
//       " w:" +
//       Manager.gameScene.width +
//       " h:" +
//       Manager.gameScene.height
//   );

//   // Manager.App.renderer.resize(
//   //   Manager.gameScene.width,
//   //   Manager.gameScene.height
//   // );
// }A
window.onresize = function () {
  console.log("resize ");
  Manager.gameScene.resize();
};

window.addEventListener("keydown", downListener, false);
window.addEventListener("keyup", upListener, false);

function downListener(ev: KeyboardEvent): void {
  //console.log("down:" + ev.code);
  Keyboard.downListener(ev);
}

function upListener(ev: KeyboardEvent): void {
  //console.log("up: " + ev.code);
  Keyboard.upListener(ev);
}
