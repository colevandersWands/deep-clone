const cloneDeep = (src, clonesMap = new Map()) => {

  // primitives & functions
  if (!src || typeof src !== 'object' || typeof src === 'function') {
    return src;
  }

  // return stashed copies of reference types
  if (clonesMap.has(src)) {
    return clonesMap.get(src);
  }

  // if not a primitive or a function
  if (src instanceof RegExp) {
    return new RegExp(src);
  }

  if (src instanceof Element) {
    return src.cloneNode(true);
  }

  if (src instanceof Date) {
    return new Date(src.getTime());
  }

  if (src instanceof Map) {
    const clone = new Map();
    clonesMap.set(src, clone);
    const srcEntries = src.entries();
    const arrayFromEntries = Array.from(srcEntries);
    const clonedEntries = cloneDeep(arrayFromEntries, clonesMap);
    clonedEntries.forEach(entry => clone.set(...entry))
    return clone;
  }

  if (src instanceof Set) {
    const clone = new Set();
    clonesMap.set(src, clone);
    const srcValues = src.values();
    const arrayFromValues = Array.from(srcValues);
    const clonedValues = cloneDeep(arrayFromValues, clonesMap);
    clonedValues.forEach(entry => clone.add(entry));
    return clone;
  }

  if (Array.isArray(src)) {
    const clone = [];
    clonesMap.set(src, clone);
    // src.forEach(entry => {
    //   return clone.push(cloneDeep(entry, clonesMap));
    // });
    for (const entry of src) {
      clone.push(cloneDeep(entry, clonesMap));
    };
    return clone;
  }

  if (src instanceof Object) {
    const clone = Object.create(src);
    clonesMap.set(src, clone);
    for (const key in src) {
      clone[key] = cloneDeep(src[key], clonesMap);
    }
    return clone;
  }

  // if (src instanceof Object) {
  //   const clone = Object.create(src);
  //   clonesMap.set(src, clone);
  //   Reflect.ownKeys(src)
  //     .map(key => {
  //       return [key, cloneDeep(src[key], clonesMap)];
  //     })
  //     .forEach(keyValue => {
  //       return clone[keyValue[0]] = keyValue[1];
  //     });
  //   return clone;
  // }

  // ?
  return src;

};
