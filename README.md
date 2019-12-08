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

Refer to documentation on <a href="https://reactjs.org/docs/create-a-new-react-app.html">Creating a New React App</a> for more info.

2- Install canvasxpress-react

See above!

3- Import CanvasXpress React Component

Add the following code to your app.

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
CanvasXpress Homepage
----------------------

https://www.canvasxpress.org

CanvasXpress R-Package
----------------------

https://github.com/neuhausi/canvasXpress
