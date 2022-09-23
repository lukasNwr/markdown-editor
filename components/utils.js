import FileSaver from "file-saver";

export const saveFile = (fileContent, fileName, fileType) => {
  if (fileType === "markdown") {
    var blob = new Blob([fileContent], {
      type: "text/markdown;charset=utf-8",
    });
    FileSaver.saveAs(blob, fileName);
  }
};

export const loadMarkdownTut = (textDataSetter) => {
  const aboutMarkdown = "";
  fetch("./markdown.md")
    .then((row) => row.text())
    .then((text) => {
      aboutMarkdown = text;
      textDataSetter(text);
    });
};

export const loadFile = (textDataSetter) => {
  var element = document.createElement("div");
  element.innerHTML = '<input type="file">';
  var fileInput = element.firstChild;
  const content = "";

  fileInput.addEventListener("change", function () {
    var file = fileInput.files[0];

    if (file.name.match(/\.(md)$/)) {
      var reader = new FileReader();

      reader.onload = function () {
        content = reader.result;
        textDataSetter(content);
        console.log("File loaded succesfully!");
      };

      reader.readAsText(file);
    } else {
      alert("File not supported, .md files only");
    }
  });

  fileInput.click();
};

export const clearTextData = (textDataSetter) => {
  textDataSetter("");
};
