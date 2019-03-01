let fs = require("fs");
let assert = require("assert");
let {shell} = require("electron");

let app = {
  el: "#container",
  data: {
    files:[]
  },
  mounted: function() {
    this.loadPath({
      name:"..",
      path:__dirname + "/../../..",//open exe file directory
      isDir:true
    }); 
  },
  methods: {
    openDir: function(dir) {
      //open folder to front
      shell.showItemInFolder(dir);
    },
    loadPath:function(file) {
      let self = this;
      if(file.isDir) {
        fs.readdir(file.path,function(err,theFiles) {
          self.files = [{
            name:"..",
            path:file.path + "/..",
            isDir:file.isDir
          }];
          assert(err === null);
          theFiles.forEach(function(fileName) {
            let theFile = {
              name:fileName,
              path:file.path + "/" + fileName,
              isDir:fs.lstatSync(file.path + "/" + fileName).isDirectory()
            };
            self.files.push(theFile)
          });
        });
      } else {
        alert("打开文件：" + file.name)
      }
    }
  }
};

new Vue(app);
