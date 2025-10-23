const extensionToTypeMap={
    'js':"javascript",
    'jsx':"javascript",
    'ts':"typescript",
    'tsx':"typescript",
    'html':"html",
    'css':'css',
    'md':'markdown',
    'yaml':'yaml',
    'yml':'yaml',
    'svg':'svg',
}

export const extensionToFileType=(extension)=>{
    if(!extension) return undefined;

    return extensionToTypeMap[extension]
}