function createDependencyProposals(range: any, monaco: any) {
    return [{
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
}

function generateVariables(range: any, monaco: any) {

}

export { createDependencyProposals }