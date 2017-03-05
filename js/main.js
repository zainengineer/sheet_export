window.jsonEditorHelper = {};
jsonEditorHelper.init = function(json){
    var container = document.getElementById("jsoneditor");
    var options = {
        schema: '',
        theme: 'bootstrap3',
        iconlib: 'fontawesome4'
    };
    this.editor = new JSONEditor(container, options);

    this.editor.setValue(json);

// get json
//     var json = editor.get();
};
jsonEditorHelper.add = function(project,task,start,end){
    var json = this.editor.getValue();
    if (!json.hasOwnProperty(project)){
        json[project] = {};
    }
    if (!json[project].hasOwnProperty(task)){
        json[project][task] = {};
    }
    json[project][task][start]=end;
    this.editor.setValue(json);
};


$(function(){
    window.addEventListener("storage", function(event){
        if (event.key=='postedMessage'){
            //so if clicked twice it, sends data twice
            localStorage.removeItem(event.key);

        }
    });
});