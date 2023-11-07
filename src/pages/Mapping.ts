export const MappingDTO = (arrayInit:any, keyValue:any, keyLabel:any, disableKey?:any) => {
    let array
    if (disableKey) {
      array = arrayInit?.map((item:any) => {
        return {
          ...item,
          value: item[keyValue],
          label: item[keyLabel],
          disabled: item[disableKey],
        }
      })
    } else {
      array = arrayInit?.map((item:any) => {
        return {
          ...item,
          value: item[keyValue],
          label: item[keyLabel],
        }
      })
    }
    return array;
  };