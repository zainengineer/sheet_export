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
jsonEditorHelper.add = function(project,ticket,task,start,end){
    var json = this.editor.getValue();
    if (!json.hasOwnProperty(project)){
        json[project] = {};
    }
    if (!json[project].hasOwnProperty(ticket)){
        json[project][ticket] = {};
    }
    json[project][ticket][start]={task: task,start:start,end:end};
    this.editor.setValue(json);
};


timeSheetHelper = {};
timeSheetHelper.processJson = function(json)
{
    jsonEditorHelper.add(json.project,json.ticket,json.description,json.actual_start,json.stop);

};

$(function(){
    window.addEventListener("storage", function(event){
        if (event.key=='postedMessage'){
            //so if clicked twice it, sends data twice
            localStorage.removeItem(event.key);
            timeSheetHelper.processJson(JSON.parse(event.newValue));

        }
    });
});