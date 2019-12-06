var React = require('react');
var CanvasXpress = require('canvasxpress');

class CanvasXpressGraph extends React.Component {
  
  static cX-ContainerId = 0;
  
  constructor(props) {  
    super(props);  
    this.data = props.data ? props.data : {};  
    this.config = props.config ? props.config : {};  
    this.events = props.events ? props.event : false;  
    this.containerProps = props.containerProps ? props.containerProps : {width: "500", height: "500"};
    this.containerProps.height = props.containerProps && props.containerProps.height ? props.containerProps.height : this.options.height ? this.options.height + "px" : "400px";
    this.chartContainerId = "canvasXpress-react-graph-container-" + CanvasXpressGraph.cX-ContainerId++;
  } 
  
  componentDidMount() {
    //Create Graph and Render  
    this.graph = new CanvasXpress(this.graphContainerId, this.data, this.config, this.events);
    if (this.props.onRef) {
      this.props.onRef(this.graph);
    }
  } 
  
  shouldComponentUpdate(nextProps, nextState){
    //Check if Chart-options has changed and determine if component has to be updated
    return !(nextProps.data === this.data && nextProps.config === this.config);
  }
  
  componentDidUpdate() {
    //Update Graph Options & Data
    this.graph.resetConfig();
    this.graph.updateConfig(this.props.config);
    this.graph.updateData(this.props.data);
  }
  
  componentWillUnmount() {
    //Destroy chart and remove reference
    this.graph.destroy();
    if (this.props.onRef) {
      this.props.onRef(undefined);
    }
  }
    
  render() {  
    //return React.createElement('div', { id: this.chartContainerId, style: this.containerProps });  
    return <div id = {this.chartContainerId} style = {this.containerProps}/>  
  }
   
}

var CanvasXpressReact = {CanvasXpressGraph : CanvasXpressGraph};

export default CanvasXpressReact;
