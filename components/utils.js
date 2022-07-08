export const save = (data) => {
  if (typeof window !== "undefined") {
    if ("showSaveFilePicker" in window) {
      return exportNativeFileSystem(data);
    }
    return download(data);
  }
};

const exportNativeFileSystem = async ({ blob, filename }) => {
  const fileHandle = await getNewFileHandle({ filename });
  if (!fileHandle) {
    throw new Error("Cannot access filesystem");
  }
  await writeFile({ fileHandle, blob });
};

const getNewFileHandle = ({ filename }) => {
  try {
    const opts = {
      suggestedName: filename,
      types: [
        { description: "Markdown file", accept: { "text/plain": [".md"] } },
      ],
    };
    return showSaveFilePicker(opts);
  } catch (err) {
    console.log(err);
  }
};

const writeFile = async ({ fileHandle, blob }) => {
  const writer = await fileHandle.createWriteble();
  await writer.write(blob);
  await writer.close();
};

const download = async ({ fileHandle, blob }) => {
  var _a;
  const a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);
  const url = window.URL.createObjctURL(blob);
  a.href = url;
  a.download = `${filename}.md`;
  a.click();
  window.URL.revokeObjectURL(url)((_a = a.parentElement)) === null ||
  _a === void 0
    ? void 0
    : _a.removeChild(a);
};
