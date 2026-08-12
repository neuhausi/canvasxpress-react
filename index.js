var React = require('react');
var CanvasXpress = require('canvasxpress');
require('canvasxpress/src/canvasXpress.css');

//Hooks-based wrapper (requires React >= 16.8). The previous release shipped a
//class component; the public surface is unchanged: the same props are accepted,
//onRef(instance) still fires on mount/unmount, and a forwarded ref now resolves
//to the live CanvasXpress instance (with a .graph self-alias, so the old
//ref.current.graph access keeps working).
var CanvasXpressReact = React.forwardRef(function CanvasXpressReact(props, ref) {

  //A ref to the <canvas> node replaces the old required-unique `target` id, so
  //two components can no longer collide on a shared DOM id. `target`, if passed,
  //is still applied as the canvas id for backward compatibility.
  var canvasRef = React.useRef(null);
  var graphRef  = React.useRef(null);

  //Expose the live instance through the forwarded ref, and mirror the legacy
  //ref.current.graph accessor onto the instance itself (the engine never reads
  //`.graph`, so this alias is inert).
  React.useImperativeHandle(ref, function () {
    var instance = graphRef.current;
    if (instance && !instance.graph) {
      instance.graph = instance;
    }
    return instance;
  });

  //Mount / unmount. Empty dependency list: build the graph once, tear it down on
  //unmount. Data/config/event updates are handled by the effect below.
  React.useEffect(function () {
    graphRef.current = new CanvasXpress.init(
      canvasRef.current,
      props.data   ? props.data   : false,
      props.config ? props.config : false,
      props.events ? props.events : false
    );
    if (props.onRef) {
      props.onRef(graphRef.current);
    }
    return function () {
      if (graphRef.current) {
        graphRef.current.destroy();
        graphRef.current = null;
      }
      if (props.onRef) {
        props.onRef(undefined);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Re-apply data, config, and events whenever any of them change. The class
  //component only refreshed data/config; events are now re-bound too (the engine
  //reads handlers off instance.events).
  React.useEffect(function () {
    var graph = graphRef.current;
    if (!graph) {
      return;
    }
    graph.events = props.events ? props.events : false;
    //resetConfig()/updateConfig() land in canvasxpress >= 65.4. Guard so an
    //older library falls back to updateData's config-merge path instead of
    //throwing on a missing method.
    if (typeof graph.resetConfig === 'function' && typeof graph.updateConfig === 'function') {
      graph.resetConfig();
      //Second arg (n) = "do not draw": defer the redraw so only updateData below
      //paints, avoiding a double render.
      graph.updateConfig(props.config, true);
      graph.updateData(props.data);
    } else {
      //Fallback: apply config alongside the data in a single redraw.
      graph.updateData(props.data, true, false, props.config);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data, props.config, props.events]);

  return React.createElement('canvas', {
    ref: canvasRef,
    id: props.target ? props.target : undefined,
    width: props.width ? props.width : 500,
    height: props.height ? props.height : 500,
    'data-responsive': props.responsive ? props.responsive : false,
    'data-aspectratio': props.aspectratio ? props.aspectratio : "1:1"
  });

});

module.exports = CanvasXpressReact;
