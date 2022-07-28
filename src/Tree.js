import { useState, createContext } from "react";
import Folder from "./Folder";

export const ExplorerContext = createContext(null);

const initialRoot2 = {
  name: "root",
  showChildren: true,
  FolderNodes: [
    {
      name: "public",
      showChildren: true,
      FolderNodes: [],
      FileNodes: ["index.html"]
    }
  ],
  FileNodes: ["readme.md", "package.json"]
};
const initialRoot = {
  name: "root",
  showChildren: true,
  FolderNodes: [
    {
      name: "public",
      showChildren: true,
      FolderNodes: [],
      FileNodes: ["index.html"]
    },
    {
      name: "src",
      showChildren: true,
      FolderNodes: [],
      FileNodes: ["App.js", "Glance.js", "InfiniteScroll.js", "styles.css"]
    }
  ],
  FileNodes: ["readme.md", "package.json"]
};

function Tree() {
  const [tree, setTree] = useState(initialRoot);
  return (
    <ExplorerContext.Provider value={{ tree, setTree }}>
      <ul className="tree">
        <Folder path={[]} tree={tree} setTree={setTree} />
      </ul>
    </ExplorerContext.Provider>
  );
}

export default Tree;
