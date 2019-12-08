var React = require('react');
var CanvasXpress = require('canvasxpress');
require('canvasxpress/src/canvasXpress.css');

class CanvasXpressReact extends React.Component {
  
  constructor(props) {  
    super(props);  
    this.target = props.target ? props.target : false;  
    this.data   = props.data ? props.data : false;  
    this.config = props.config ? props.config : false;  
    this.events = props.events ? props.event : false;
    this.width  = props.width ? props.width : 500;  
    this.height = props.height ? props.height : 500;
  } 
  
  componentDidMount() {
    //Create graph and render  
    this.graph = new CanvasXpress.init(this.target, this.data, this.config, this.events);
    if (this.props.onRef) {
      this.props.onRef(this.graph);
    }
  } 
  
  shouldComponentUpdate(nextProps, nextState){
    //Check if graph config and data has changed and determine if component has to be updated
    return !(nextProps.data === this.data && nextProps.config === this.config);
  }
  
  componentDidUpdate() {
    //Update Graph Options & Data
    this.graph.resetConfig();
    this.graph.updateConfig(this.props.config);
    this.graph.updateData(this.props.data);
  }
  
  componentWillUnmount() {
    //Destroy graph and remove reference
    this.graph.destroy();
    if (this.props.onRef) {
      this.props.onRef(undefined);
    }
  }
    
  render() {
  	return React.createElement('canvas', { id: this.target, width: this.width, height: this.height });  
  }
   
}

export default CanvasXpressReact;
