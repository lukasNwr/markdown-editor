import FileSaver, { saveAs } from "file-saver";

export const saveFile = (fileContent, fileName, fileType) => {
  console.log("saveFile");
  if (fileType === "markdown") {
    // var file = new File([fileContent], fileName, {
    //   type: "text/markdown;charset=utf-8",
    // });
    var blob = new Blob([fileContent], {
      type: "text/markdown;charset=utf-8",
    });
    FileSaver.saveAs(blob, fileName);
  }
  // FileSaver.saveAs(file);
};

export const openFile = (event) => {
  let status = [];
  let fileData = "";

  const fileObj = event.target.files[0];
  const reader = new FileReader();

  let fileLoaded = (e) => {
    const fileContents = e.target.result;
    status.push(
      `File name: "${fileObj.name}". ` + `Length ${fileContents.length} bytes`
    );

    fileData = status.join("\n");
  };

  fileLoaded = fileLoaded.bind(this);
  reader.onLoad = fileLoaded;
  reader.readAsText(fileObj);

  return fileData;
};

export const uploadToClient = (event) => {
  console.log("file upload");
};
