import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./style.css";
import { useLocation } from "react-router-dom";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

function Editer() {
  const location = useLocation();
  const [editor, setEditor] = useState(null);
  const [text, setText] = useState("");
  const { data } = location.state || {};

  useEffect(() => {
    console.log(editor);
    console.log(text);

    const fetchResponse = async () => {
      setText(data);
    };

    fetchResponse();
  }, [data, editor, text]);

  const wrapperRef = useCallback(
    (wrapper) => {
      if (wrapper == null) return;

      wrapper.innerHTML = "";
      const editer = document.createElement("div");

      wrapper.append(editer);
      const quillInstance = new Quill(editer, {
        theme: "snow",
        modules: { toolbar: TOOLBAR_OPTIONS },
      });
      quillInstance.clipboard.dangerouslyPasteHTML(data);
      setEditor(quillInstance);
    },
    [data]
  );

  return (
    <div>
      <div className="container" ref={wrapperRef}></div>
      {/* <button
        className="btn btn-primary submit-btn"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
        onClick={handleDownloadDocx}
      >
        Download Proposal as DOCX
      </button> */}
    </div>
  );
}

export default Editer;
