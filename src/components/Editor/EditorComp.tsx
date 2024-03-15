import Editor from "@monaco-editor/react";
import { addVar, createDependencyProposals } from "./monaco_settings";

interface Props {
    setCode: (e: string) => void,
    activity: any
}

function EditorComp(props: Props) {
    const checkVar = (e: string) => {
        const lines = e.split("\n")
        let temp = lines.map((v: string) => {
            if (v.length > 1) {
                return v.split("=").map((s) => {
                    return s.trim()
                })
            } else {
                return [""]
            }
        })

        const fin = temp.filter((arr) => arr.length > 1)
        addVar(fin)

    }

    const onMount = (monaco: any) => {
        monaco.languages.registerCompletionItemProvider('python', {
            triggerCharacters: ["d", "w"],
            provideCompletionItems: function (model: any, pos: any) {
                const word = model.getWordUntilPosition(pos)
                var range = {
                    startLineNumber: pos.lineNumber,
                    endLineNumber: pos.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn,
                };


                return {
                    suggestions: createDependencyProposals(range, monaco),
                };
            }
        })
    }


    return (
        <>
            <Editor
                height="90vh"
                language="python"
                theme="vs-dark"
                onChange={(e: any) => {
                    props.setCode(e);
                    checkVar(e);
                }}
                onMount={(editor, monaco) => {
                    console.log(editor)
                    onMount(monaco)
                }}
                value={props.activity.code}
                options={{ minimap: { enabled: false } }}
            />
        </>
    )
}

export default EditorComp;