CanvasXpress React
==================

Node program to use CanvasXpress with React


Installation
----------------------

```bash
npm install canvasxpress-react --save
```

Step-By-Step instructions
-------------------------

1- Create a React App

&emsp; Refer to documentation on <a href="https://reactjs.org/docs/create-a-new-react-app.html">Creating a New React App</a> for more info.

2- Install canvasxpress-react

&emsp; See the above [Installation](https://github.com/neuhausi/canvasxpress-react/edit/master/README.md#installation) section!

3- Import CanvasXpress React Component

&emsp; Add the following code to your app eg, `index.js`.

```bash
import React from 'react';
import ReactDOM from 'react-dom';
import CanvasXpressReact from 'canvasxpress-react';
class Bar extends React.Component {
 
  render() {

    var target = "canvas";
     
    var data =  {
      "y" : {
        "vars" : ["Variable1"],
        "smps" : ["Sample1", "Sample2", "Sample3"],
        "data" : [[33, 48, 55]]
      }
    };

    var config = {
      "graphOrientation": "vertical",
      "graphType": "Bar",
      "theme": "CanvasXpress",
      "title": "Simple Bar graph"
    };
   
    return (
      <CanvasXpressReact target={target} data={data} config={config} width={500} height={500} />
    )
     
  }
 
}
var reactapp = document.createElement("div");
document.body.appendChild(reactapp);
ReactDOM.render(<Bar />, reactapp)
```
Notes
-----------------

- Requires **React 16.8+** (the component is implemented with hooks).
- `target` is **optional** — the component renders through an internal ref, so you
  no longer need to supply a globally unique DOM id. If you do pass `target`, it is
  applied as the `<canvas>` id.
- The live CanvasXpress instance is available two ways: the `onRef` callback (fired
  with the instance on mount and `undefined` on unmount), or a forwarded `ref`
  (`ref.current` is the instance; `ref.current.graph` also resolves for backward
  compatibility):

```jsx
import React, { useRef } from 'react';
import CanvasXpressReact from 'canvasxpress-react';

function Chart(props) {
  const cx = useRef(null);
  // cx.current is the CanvasXpress instance after mount
  return <CanvasXpressReact ref={cx} data={props.data} config={props.config} />;
}
```

Alternative Used
-----------------

Link to codesandbox repo (contributed by Kamile Taouk - https://github.com/ktaouk1) :

https://codesandbox.io/p/sandbox/canvasxpress-react-dmdpd4

CanvasXpress Homepage
----------------------

https://www.canvasxpress.org

CanvasXpress R-Package
----------------------

https://github.com/neuhausi/canvasXpress
