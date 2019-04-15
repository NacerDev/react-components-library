import DropzoneComponent from "react-dropzone-component";
import ReactDOMServer from "react-dom/server";
import React from "react";
import style from "./style.scss";

const previewTemplate = ReactDOMServer.renderToStaticMarkup(
  <div className={"dz-preview dz-file-preview " + style["dz-preview"]}>
    <div className="dz-details">
      <span className="icon-file" />
      <div
        className={"px-4 dz-filename " + style.filename}
        style={{ textOverflow: "ellipsis", overflow: "hidden" }}
      >
        <span data-dz-name="true" className={"text-info"} />
      </div>
    </div>
    <div className={"dz-progress " + style.progress} style={{ zIndex: 500 }}>
      <span className="dz-upload" data-dz-uploadprogress="true" />
    </div>
    <span className={style["dz-remove-icon"]} data-dz-remove />
  </div>
);
class Dropzone extends React.Component {
  state = {
    files: 0
  };
  sending = (file, xhr, formData) => {
    
  };
  maxfilesexceeded = file => {
    this.props.onFileMaxNumberExceeded(file.name);
  };
  complete = file => {
    if (
      this.props.dropzone.files.filter(x => x.status === "queued").length > 0 &&
      this.props.dropzone.files.filter(x => x.status === "uploading").length ===
        0
    )
      this.props.dropzone.processQueue();
  };
  queuecomplete = () => {
    this.props.onQueueComplete();
  };
  success = (file, response) => {
    file.previewElement
      .getElementsByClassName("dz-progress")[0]
      .classList.add("bg-info");
  };
  uploadprogress = (file, progress) => {
    file.previewElement.getElementsByClassName(
      "dz-progress"
    )[0].style.width = `${progress}%`;
    file.previewElement.getElementsByClassName(
      "dz-filename"
    )[0].innerHTML = `<p>${file.name} <b>(${progress.toFixed(0)}%)</b></p>`;
    file.previewElement
      .getElementsByClassName(style["dz-remove-icon"])[0]
      .classList.add(style["dz-close-icon"]);
  };
  error = (file, err) => {
    if (!file.accepted) {
      if (err !== "size") {
        this.props.onFileTypeRejected(file.name, err);
      }

      return this.props.dropzone.removeFile(file);
    }

    file.previewElement
      .getElementsByClassName("dz-progress")[0]
      .classList.add("bg-danger");
  };

  accept = (file, done) => {
    //// max size for file 10 MB
    var fileSize = file.size / 1024 / 1024; // in MB
    if (fileSize > 10) {
      this.props.onFileMaxSizeExceeded(file.name, Math.round(fileSize));
      done("size");
    } else {
      done();
    }
  };
  addedfile = () => {
    this.setState({ files: this.props.dropzone.files.length });
  };
  removedfile = () => {
    this.setState({ files: this.props.dropzone.files.length });
  };
  renameFile = file => {
    //// to avoid crm error ::
    /**
     * Unsanitized filename (allowed: /[A-Za-z0-9_]{1,100}\.[A-Za-z]{1,5}/)
     */
    var filenamearray = file.name.split(".");
    filenamearray.pop();
    var filename = filenamearray.join("_");
    var uploadfilename = filename.replace(/[^A-Za-z0-9_]+/g, "_");
    uploadfilename =
      uploadfilename.length > 100
        ? uploadfilename.slice(0, 100) + ".pdf"
        : uploadfilename + ".pdf";
    return uploadfilename;
  };
  render() {
    return (
      <DropzoneComponent
        id="dropzone"
        config={this.props.config}
        eventHandlers={{
          success: this.success,
          error: this.error,
          init: this.props.onInit,
          complete: this.complete,
          queuecomplete: this.queuecomplete,
          maxfilesexceeded: this.maxfilesexceeded,
          addedfile: this.addedfile,
          removedfile: this.removedfile,
          uploadprogress: this.uploadprogress,
          sending: this.sending
        }}
        djsConfig={{
          acceptedFiles: "application/pdf",
          addRemoveLinks: true,
          autoProcessQueue: false,
          processingmultiple: true,
          sendingmultiple: true,
          parallelUploads: this.props.images,
          autoQueue: false,
          maxFiles: this.props.images,
          previewsContainer: ".previewsContainer",
          previewTemplate: previewTemplate,
          accept: this.accept,
          renameFile: this.renameFile
        }}
      >
        <div className={"dz-message " + style["dz-message"]}>
                <span>Drag and drop documents here or <span className='text-info'> Browse</span></span>
        </div>
        <div className={"mb-3 " + style.input}>
          <button
            className="btn btn-info p-2"
            onClick={e => {
              e.preventDefault();
              this.props.dropzone.hiddenFileInput.click();
            }}
          >
            Choose File
          </button>
          <span className=" d-inline-block p-2">
            {this.state.files === 0 ? 
              "No file chosen"
             : 
                this.state.files + " file(s) chosen"}
          </span>
        </div>
        <div className="previewsContainer" />
      </DropzoneComponent>
    );
  }
}

export default Dropzone;