import { Pagination, Table, Form, Button, Space, FormInstance } from "antd"
import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react"
import type { ReactNode, FC, Ref } from "react"
import C_EditorStyle from "./style"
import { Editor, Toolbar } from "@wangeditor/editor-for-react"
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor"
import "@wangeditor/editor/dist/css/style.css" // 引入 css

interface IProps {
  toolbarConfig?: Partial<IToolbarConfig> //工具栏配置
  editorConfig?: Partial<IEditorConfig> //编辑器配置
  html: string //数据源
  setHtml: React.Dispatch<React.SetStateAction<string>> //设置数据源
}
const C_Editor: FC<IProps> = forwardRef((props: IProps, ref) => {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const { html, setHtml } = props // 编辑器内容
  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    ...props.toolbarConfig,
  }
  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "请输入内容...",
    ...props.editorConfig,
  }
  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  useImperativeHandle(ref, () => ({
    editor,
  }))
  return (
    <C_EditorStyle>
      <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: "500px", overflowY: "hidden" }}
        />
      </div>
      <div style={{ marginTop: "15px" }}>{html}</div>
    </C_EditorStyle>
  )
})

/**
 * 
  @param toolbarConfig?: Partial<IToolbarConfig> //工具栏配置
  @param editorConfig?: Partial<IEditorConfig> //编辑器配置
  @param html: string //数据源
  @param setHtml: React.Dispatch<React.SetStateAction<string>> //设置数据源
 */
export default memo(C_Editor)
