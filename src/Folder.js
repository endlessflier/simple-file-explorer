import React, { useMemo, useContext } from "react";
import { ExplorerContext } from "./Tree";

const cloneNode = (node) => {
  let FolderNodes;

  if (node.FolderNodes) {
    FolderNodes = node.FolderNodes.reduce(
      (arr, _node) => arr.concat(cloneNode(_node)),
      []
    );
  }

  return {
    name: node.name,
    showChildren: node.showChildren,
    FolderNodes,
    FileNodes: [...node.FileNodes]
  };
};

function Folder({ path }) {
  const { tree, setTree } = useContext(ExplorerContext);
  let newRoot = cloneNode(tree);
  const node = useMemo(() => {
    let _node = newRoot,
      i = 0;
    while (i < path.length && path[i] < _node.FolderNodes.length) {
      _node = _node.FolderNodes[path[i]];
      i++;
    }
    return _node;
  }, [path]);
  console.log("Folder rendered");
  return (
    <li>
      <strong
        onClick={() => {
          node.showChildren = !node.showChildren;
          setTree(newRoot);
        }}
      >
        {node.name}
      </strong>
      {node.showChildren && (
        <ul className="folder">
          {node?.FolderNodes.map((folder, index) => {
            return <Folder key={folder.name} path={[...path, index]} />;
          })}
          {node?.FileNodes.map((file, index) => {
            return (
              <li className="file" key={file}>
                {file}
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}
export default React.memo(Folder);
