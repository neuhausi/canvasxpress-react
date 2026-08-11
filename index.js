var React = require('react');
var CanvasXpress = require('canvasxpress');
require('canvasxpress/src/canvasXpress.css');

class CanvasXpressReact extends React.Component {

  constructor(props) {
    super(props);
    this.target = props.target ? props.target : false;
    this.data   = props.data ? props.data : false;
    this.config = props.config ? props.config : false;
    this.events = props.events ? props.events : false;
    this.width  = props.width ? props.width : 500;
    this.height = props.height ? props.height : 500;
    this.responsive = props.responsive ? props.responsive : false;
    this.aspectRatio = props.aspectratio ? props.aspectratio : "1:1";
  }

  componentDidMount() {
    //Create graph and render
    this.graph = new CanvasXpress.init(this.target, this.data, this.config, this.events);
    if (this.props.onRef) {
      this.props.onRef(this.graph);
    }
  }

  shouldComponentUpdate(nextProps) {
    //Re-render only when the incoming props differ from the CURRENT props.
    //Comparing against the constructor snapshots (this.data/this.config) drifts
    //after the first update, because those are never refreshed.
    return nextProps.data !== this.props.data
      || nextProps.config !== this.props.config
      || nextProps.events !== this.props.events;
  }

  componentDidUpdate() {
    //Update Graph Options & Data. Bail out if the graph never mounted.
    if (!this.graph) {
      return;
    }
    //resetConfig()/updateConfig() land in canvasxpress >= 65.4. Guard so an
    //older library falls back to updateData's config-merge path instead of
    //throwing on a missing method.
    if (typeof this.graph.resetConfig === 'function' && typeof this.graph.updateConfig === 'function') {
      this.graph.resetConfig();
      //Second arg (n) = "do not draw": defer the redraw so only updateData below
      //paints, avoiding a double render.
      this.graph.updateConfig(this.props.config, true);
      this.graph.updateData(this.props.data);
    } else {
      //Fallback: apply config alongside the data in a single redraw.
      this.graph.updateData(this.props.data, true, false, this.props.config);
    }
  }

  componentWillUnmount() {
    //Destroy graph and remove reference
    if (this.graph) {
      this.graph.destroy();
    }
    if (this.props.onRef) {
      this.props.onRef(undefined);
    }
  }

  render() {
    return React.createElement('canvas', { id: this.target, width: this.width, height: this.height, 'data-responsive': this.responsive, 'data-aspectratio': this.aspectRatio});
  }

}

module.exports = CanvasXpressReact;
