export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    }
  );
}

export function mutateArray(arr: any[], index: number, newItem?: any): any[] {
  const newArray = [...arr];
  if (newItem) {
    newArray.splice(index, 1, newItem);
  } else {
    newArray.splice(index, 1);
  };
  return newArray;
}