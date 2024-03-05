export const IsEqual = (obj1: any, obj2: any): boolean => {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  for (const key in obj1) {
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        return areObjectsEqual(obj1[key], obj2[key]);
      } else if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
        return areArraysEqual(obj1[key], obj2[key]);
      } else if (obj1[key] !== obj2[key] && !(obj1[key] == null && obj2[key] == null)) {
        return false;
      }
    } else {
      return false;
    }
  }

  return true;
}

function areArraysEqual(obj1: any[], obj2: any[]): boolean {
  if (obj1.length !== obj2.length) {
    return false;
  }

  for (let i = 0; i < obj1.length; i++) {
    if (!IsEqual(obj1[i], obj2[i])) {
      return false;
    }
  }
  return true;
}

function areObjectsEqual(val1: any, val2: any): boolean {
  if (!IsEqual(val1, val2)) {
    return false;
  }
  return true;
}
