
function createDependencyProposals(range: any, monaco: any) {
    const temp = [{
        label: 'def',
        kind: monaco.languages.CompletionItemKind.Keyword,
        // documentation: "Describe your library here",
        insertText: 'def function_name():\n\t',
        insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
    },
    {
        label: 'while',
        kind: monaco.languages.CompletionItemKind.Keyword,
        // documentation: "Describe your library here",
        insertText: 'while()',
        insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
    },
    {
        label: 'for',
        kind: monaco.languages.CompletionItemKind.Keyword,
        // documentation: "Describe your library here",
        insertText: 'for()',
        insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
    },
    {
        label: 'range',
        kind: monaco.languages.CompletionItemKind.Keyword,
        // documentation: "Describe your library here",
        insertText: 'range',
        insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
    },
    {
        label: 'len',
        kind: monaco.languages.CompletionItemKind.Function,
        // documentation: "Describe your library here",
        insertText: 'len()',
        insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
    },
    ]

    const vars = generateVariables()
    vars.map((v) => {
        temp.push({
            label: v,
            kind: monaco.languages.CompletionItemKind.Function,
            // documentation: "Describe your library here",
            insertText: v,
            insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
        })
    })

    // temp.push(labels)
    return temp
}

let vars: string[] = []

function addVar(arr: any) {
    vars = []
    for (let i = 0; i < arr.length; i++) {
        if (vars.includes(arr[i])) {
            return
        }

        vars.push(arr[i])
    }

}

function generateVariables() {
    const temp = vars.map((x) => {
        return x
    })

    return temp
}

export { createDependencyProposals, generateVariables, addVar }