export default class Ike {
  constructor(file, revision) {
    this.file = file;
    this.filename = file.substring(file.lastIndexOf('/')+1);
    this.revision = revision || 1;
    this.storage = 'localStorage' in window && window.localStorage !== null;

    this._init();
  }

  _init() {
    this.storage && localStorage.getItem('iconRev') === this.revision
      ? this._retrieveFile()
      : this._fetchFile();
  };

  _retrieveFile() {
    let savedIcons = localStorage.getItem(this.filename);
    this._insertFile(savedIcons);
  }

  _fetchFile() {
    try {
      let request = new XMLHttpRequest();
      request.open('GET', this.file, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          let loadedIcons = request.responseText;
          this._insertFile(loadedIcons);
          if (this.storage) {
            localStorage.setItem(this.filename, loadedIcons);
            localStorage.setItem('iconRev', this.revision);
          }
        }
      };

      request.send();
    }
    catch (e) {}
  };

  _insertFile(file) {
    document.body
      ? document.body.insertAdjacentHTML('afterbegin', file)
      : document.addEventListener('DOMContentLoaded', () => {
          document.body.insertAdjacentHTML('afterbegin', file)
        });
  };
}
