export class ImageUtils {

  static dataURLtoBlob(dataURL) {
    if (dataURL == null) { return null; }

    const byteString = window.atob(dataURL);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([int8Array], {type: 'image/jpeg'});
  }
}
