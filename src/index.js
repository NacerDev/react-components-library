import './scss/index.scss?raw';

let LibConfig = null;



export default {
    config: function (config) {
        LibConfig = config;
    },
    widgets: {
        navbar: import("./components/navbar"),
        dropzone:import("./components/dropzone")
    }
}
