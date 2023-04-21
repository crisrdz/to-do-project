export function addRedo(functionName) {
  let redo = JSON.parse(window.sessionStorage.getItem("redo"));

  if(!redo){
    redo= {}
  }

  redo[functionName] = true;
  window.sessionStorage.setItem("redo", JSON.stringify(redo));
}