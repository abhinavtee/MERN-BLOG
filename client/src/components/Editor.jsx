/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/#installation/NoNgNARATAdA7DADBSBGRAWArB1cDMcWAnFISFiAUSKcQBwipQYbFb1x6KpUjKQApgDsUiMMFRgpMsONQBdSMUEATTiQgKgA
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Alignment,
  Autoformat,
  AutoImage,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  BlockToolbar,
  Bold,
  Bookmark,
  CloudServices,
  CodeBlock,
  Emoji,
  Essentials,
  FindAndReplace,
  FullPage,
  GeneralHtmlSupport,
  Heading,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageInsertViaUrl,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  ListProperties,
  Mention,
  PageBreak,
  Paragraph,
  PlainTableOutput,
  ShowBlocks,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableLayout,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  Title,
  TodoList,
  Underline,
  WordCount,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

// import './App.css';

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = "GPL"; // or <YOUR_LICENSE_KEY>.

export default function Editor({ props }) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const editorWordCountRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "sourceEditing",
            "showBlocks",
            "findAndReplace",
            "textPartLanguage",
            "|",
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "|",
            "emoji",
            "specialCharacters",
            "horizontalLine",
            "pageBreak",
            "link",
            "bookmark",
            "insertTable",
            "insertTableLayout",
            "blockQuote",
            "codeBlock",
            "htmlEmbed",
            "|",
            "alignment",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "outdent",
            "indent",
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Alignment,
          Autoformat,
          AutoImage,
          Autosave,
          BalloonToolbar,
          BlockQuote,
          BlockToolbar,
          Bold,
          Bookmark,
          CloudServices,
          CodeBlock,
          Emoji,
          Essentials,
          FindAndReplace,
          FullPage,
          GeneralHtmlSupport,
          Heading,
          HorizontalLine,
          HtmlComment,
          HtmlEmbed,
          ImageBlock,
          ImageInsertViaUrl,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          List,
          ListProperties,
          Mention,
          PageBreak,
          Paragraph,
          PlainTableOutput,
          ShowBlocks,
          SourceEditing,
          SpecialCharacters,
          SpecialCharactersArrows,
          SpecialCharactersCurrency,
          SpecialCharactersEssentials,
          SpecialCharactersLatin,
          SpecialCharactersMathematical,
          SpecialCharactersText,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableLayout,
          TableProperties,
          TableToolbar,
          TextPartLanguage,
          TextTransformation,
          Title,
          TodoList,
          Underline,
          WordCount,
        ],
        balloonToolbar: [
          "bold",
          "italic",
          "|",
          "link",
          "|",
          "bulletedList",
          "numberedList",
        ],
        blockToolbar: [
          "bold",
          "italic",
          "|",
          "link",
          "insertTable",
          "insertTableLayout",
          "|",
          "bulletedList",
          "numberedList",
          "outdent",
          "indent",
        ],
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4",
            },
            {
              model: "heading5",
              view: "h5",
              title: "Heading 5",
              class: "ck-heading_heading5",
            },
            {
              model: "heading6",
              view: "h6",
              title: "Heading 6",
              class: "ck-heading_heading6",
            },
          ],
        },
        htmlSupport: {
          allow: [
            {
              name: /^.*$/,
              styles: true,
              attributes: true,
              classes: true,
            },
          ],
        },
        image: {
          toolbar: [
            "imageTextAlternative",
            "imageStyle:full",
            "imageStyle:side",
          ],
        },
        initialData: props?.initialData || "",
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
          decorators: {
            toggleDownloadable: {
              mode: "manual",
              label: "Downloadable",
              attributes: {
                download: "file",
              },
            },
          },
        },
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true,
          },
        },
        mention: {
          feeds: [
            {
              marker: "@",
              feed: [
                /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
              ],
            },
          ],
        },
        placeholder: "Type or paste your content here!",
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableProperties",
            "tableCellProperties",
          ],
        },
      },
    };
  }, [isLayoutReady]);

  return (
    <div className="main-container">
      <div
        className="editor-container editor-container_classic-editor editor-container_include-block-toolbar editor-container_include-word-count"
        ref={editorContainerRef}
      >
        <div className="editor-container__editor">
          <div ref={editorRef}>
            {editorConfig && (
              <CKEditor
                onChange={props.onChange}
                onReady={(editor) => {
                  const wordCount = editor.plugins.get("WordCount");
                  editorWordCountRef.current.appendChild(
                    wordCount.wordCountContainer
                  );
                }}
                onAfterDestroy={() => {
                  if (editorWordCountRef.current) {
                    Array.from(editorWordCountRef.current.children).forEach(
                      (child) => child.remove()
                    );
                  }
                }}
                editor={ClassicEditor}
                config={editorConfig}
              />
            )}
          </div>
        </div>
        <div
          className="editor_container__word-count"
          ref={editorWordCountRef}
        ></div>
      </div>
    </div>
  );
}
