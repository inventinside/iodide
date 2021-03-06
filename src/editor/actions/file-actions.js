import { getFilesForNotebookFromServer } from "../../shared/utils/file-operations";
import { isLoggedIn } from "../tools/server-tools";

export function getFiles() {
  return async (dispatch, getState) => {
    const loggedIn = isLoggedIn(getState());
    const notebookID = getState().notebookInfo.notebook_id;
    const files = await getFilesForNotebookFromServer(notebookID, loggedIn);
    dispatch({
      type: "UPDATE_FILES_FROM_SERVER",
      files: files.map(file => ({
        id: file.id,
        filename: file.filename,
        lastUpdated: file.last_updated
      }))
    });
  };
}
