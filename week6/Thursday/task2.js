class StringBuilder {
  constructor(value) {
    this.strLength;
    this.capacityBuff = 4;
    value = value || this.capacityBuff;
    if (typeof value == "string" || value instanceof StringBuilder) {
      this.buffer = this.createBuffFromStr(value);
    } else if (typeof value == "number")
      this.buffer = this.createBuffWithLength(value);
  }

  createBuffFromStr(val) {
    this.strLength = val.length;
    if (val.length > this.capacityBuff) {
      this.capacityBuff += val.length;
    }

    let buff = new ArrayBuffer(this.capacityBuff);
    let view = new Uint8Array(buff);
    if (val instanceof StringBuilder) {
      view.set(val.buffer);
    } else {
      for (let i = 0; i < view.length; i++) {
        view[i] = val.charCodeAt(i);
      }
    }

    return view;
  }

  createBuffWithLength(val) {
    this.capacityBuff += val;
    let buff = new ArrayBuffer(this.capacityBuff);
    return new Uint8Array(buff);
  }

  reSizeBuff(n) {
    let view = this.createBuffWithLength(n);
    view.set(this.buffer);
    this.buffer = view;
    return this.buffer.length;
  }

  append(str) {
    if (typeof str == "number") {
      str = str.toString();
    }
    if (this.strLength + str.length > this.buffer.length) {
      this.reSizeBuff(this.strLength + str.length);
    }

    for (let i = this.length, j = 0; str.charCodeAt(j); i++, j++) {
      this.buffer[i] = str.charCodeAt(j);
    }

    this.strLength += str.length;
  }

  get length() {
    return this.strLength;
  }

  set length(n) {
    if (n > this.capacityBuff) {
      this.reSizeBuff(n);
    }
    //check for SMaller
  }

  toString() {
    let decoder = new TextDecoder("UTF-8");
    return decoder.decode(this.buffer);
  }

  charAt(index) {
    if (index > this.buffer.length - 1) {
      return undefined;
    }

    return String.fromCharCode(this.buffer[index]);
  }

  charCodeAt(index) {
    if (index > this.buffer.length - 1) {
      return undefined;
    }

    return this.buffer[index];
  }

  delete(start, end) {
    let i = start,
      j = end + 1;
    for (; j < this.buffer.length; i++, j++) {
      this.buffer[i] = this.buffer[j];
    }
    this.strLength -= end - start;
  }

  substring(start, end) {
    return this.buffer.subarray(start, end);
  }

  get capacity() {
    return this.capacityBuff;
  }

  ensureCapacity(minimumCapacity) {
    if (minimumCapacity < this.capacityBuff) {
      return;
    }

    minimumCapacity = Math.max(minimumCapacity, this.capacityBuff * 2);
    this.reSizeBuff(minimumCapacity);
  }

  indexOf(str, fromIndex = 0) {
    if (fromIndex > this.strLength.length - 1) {
      return -1;
    }

    for (let i = fromIndex; i <= this.strLength - str.length; i++) {
      let j = 0;
      for (; j < str.length; j++) {
        if (str[j] != String.fromCharCode(this.buffer[j + i])) {
          break;
        }
      }
      if (j == str.length) {
        return i;
      }
    }
    return -1;
  }

  lastIndexOf(str, fromIndex) {
    fromIndex = fromIndex || this.strLength - 1;
    if (fromIndex > this.strLength.length - 1) {
      return -1;
    }

    for (let i = fromIndex; i >= 0; i--) {
      let j = str.length - 1,
        k = 0;
      for (; i - k >= 0 && j >= 0; j--, k++) {
        if (str[j] != String.fromCharCode(this.buffer[i - k])) {
          break;
        }
      }
      if (j < 0) {
        return i;
      }
    }
    return -1;
  }

  insert(startIdx, str) {
    if (this.capacityBuff < this.strLength + str.length) {
      this.reSizeBuff(this.capacityBuff + str.length);
    }
    let offset = str.length;
    for (let i = this.buffer.length - 1; i >= startIdx + offset; i--)
      this.buffer[i] = this.buffer[i - offset];

    for (let i = 0, j = startIdx; i < str.length; i++, j++) {
      this.buffer[j] = str.charCodeAt(i);
    }
    this.strLength += str.length;
  }

  trimToSize() {
    if (this.strLength == this.buffer.length) {
      return;
    }
    this.reSizeBuff(this.strLength);
  }

  replace(start, end, str) {
    this.delete(start, end);
    this.insert(start, str);
  }

  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => {
        if (i > this.strLength) {
          return { done: true };
        }
        let result = {
          value: String.fromCharCode(this.buffer[i]),
          done: false,
        };
        i++;
        return result;
      },
    };
  }
}

module.exports = { StringBuilder };
