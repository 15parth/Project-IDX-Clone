import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";
import { useTreeStructureStore } from "./treeStructureStore";

export const useEditorSocketStore = create((set) => ({
    editorSocket: null,
    setEditorSocket: (incomingSocket) => {

        const activeFileTabSetter = useActiveFileTabStore.getState().setActiveFileTab
        const projectTreeStructureSetter = useTreeStructureStore.getState().setTreeStructure;

        incomingSocket?.on("readFileSuccess", (data) => {
            console.log("✅ Read file success", data);
            const fileExtension= data.path.split('.').pop();
            activeFileTabSetter(data.path, data.value,fileExtension);
        });

         incomingSocket?.on("writeFileSuccess", (data) => {
            console.log("✅ write file success", data);
            // incomingSocket.emit("readFile",{
            //     pathToFileOrFolder:activeFileTab.path
            // })
        });

        incomingSocket?.on("deleteFileSuccess", (data)=>{
            console.log("file deleted successfully")
            projectTreeStructureSetter()
        })

        set({
            editorSocket: incomingSocket
        })
    }
}));