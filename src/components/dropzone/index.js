import uniqueid from 'uniqueid';
import React from "react";
import ReactDOM from "react-dom";
import DropZoneComponent from './component'
export default {


    new: function (config) {
        let uid = uniqueid({
            prefix: 'widget_dropzone_'
        });
        return {
            render(args) {

                ReactDOM.render(
                    <DropZoneComponent { ...args } />, document.querySelector(config.selector)
                );
            },

            on: (event, callback) => {

                Emitter.on.apply(Emitter, [uid + "." + event, callback]);

            },

            off: (event, callback) => {

                Emitter.removeListener.apply(Emitter, [uid + "." + event, callback]);

            },

            offAll: (event) => {

                Emitter.removeAllListeners.apply(Emitter, [uid + "." + event]);

            },

            once: (event, callback) => {

                Emitter.once.apply(Emitter, [uid + "." + event, callback]);

            },

            unmount() {

                ReactDOM.unmountComponentAtNode(document.querySelector(config.selector));
                alt.recycle(MyStore);
                Emitter.removeAllListeners();

            },

            getState: () => {

                return MyStore.getState()[uid];

            },

            back: () => {

                actions.back(uid);

            },

            forward: () => {

                actions.forward(uid);

            },
        }
    }
}