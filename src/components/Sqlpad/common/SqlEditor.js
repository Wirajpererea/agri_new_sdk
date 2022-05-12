import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-searchbox";
import Measure from "react-measure";
require(`ace-builds/src-noconflict/mode-sql`);
require(`ace-builds/src-noconflict/theme-sqlserver`);

const noop = () => {};

function SqlEditor({
  onChange,
  readOnly,
  value,
  onSelectionChange,
  testQueryRunStatus,
}) {
  const config = { editorWordWrap: true };
  const [dimensions, setDimensions] = useState({ width: -1, height: -1 });
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (editor && onChange) {
      editor.commands.on("afterExec", (e) => {
        if (e.command.name === "insertstring" && /^[\w.]$/.test(e.args)) {
          if (e.args === ".") {
            editor.execCommand("startAutocomplete");
          }
        }
      });

      editor.session.setUseWrapMode(Boolean(config.editorWordWrap));
    }
  }, [editor, onChange, config]);

  const handleSelection = (selection) => {
    if (editor && editor.session) {
      const selectedText = editor.session.getTextRange(selection.getRange());
      onSelectionChange(selectedText);
    }
  };

  const { width, height } = dimensions;

  const setOptions = {
    useWorker: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: false,
    showLineNumbers: true,
    tabSize: 2,
  };

  return (
    <Measure
      bounds
      onResize={(contentRect) => setDimensions(contentRect.bounds)}
    >
      {({ measureRef }) => (
        <div ref={measureRef} className="h-100 w-100">
          <AceEditor
            editorProps={{ $blockScrolling: Infinity }}
            focus={true}
            height={100 + "%"}
            highlightActiveLine={false}
            mode="sql"
            name="query-ace-editor"
            onChange={onChange || noop}
            onLoad={(editor) => setEditor(editor)}
            onSelectionChange={handleSelection}
            readOnly={false}
            setOptions={setOptions}
            showGutter={false}
            showPrintMargin={false}
            theme="sqlserver"
            value={value}
            width={width + "px"}
          />
        </div>
      )}
    </Measure>
  );
}

export default React.memo(SqlEditor);
