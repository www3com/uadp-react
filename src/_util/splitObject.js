/**
 * Created by wangjz on 2016/11/4.
 */
export default function splitObject(obj, parts) {
  const left = {};
  const right = {};
  Object.keys(obj).forEach((k) => {
    if (parts.indexOf(k) !== -1) {
      right[k] = obj[k];
    } else {
      left[k] = obj[k];
    }
  });
  return [left, right];
}
