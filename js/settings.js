window.settingEditorHelper = {};
settingEditorHelper.getValueFromStorage = function () {
    return JSON.parse(localStorage.getItem('my-settings'));
};
settingEditorHelper.setValueInStorage = function (value) {
    localStorage.setItem('my-settings', JSON.stringify(value));
};
settingEditorHelper.init = function () {
    var setting = this.getValueFromStorage();
    if (!setting) {
        setting = {};
    }
    if (!setting.hasOwnProperty('mapping')) {
        setting.mapping = {alias: 'Actual Name'};
    }
    this.initWithJson(setting);
};
settingEditorHelper.initWithJson = function (json) {
    var container = document.getElementById("setting-editor");
    var options = {
        schema: '',
        theme: 'bootstrap3',
        iconlib: 'fontawesome4'
    };
    this.editor = new JSONEditor(container, options);

    this.editor.setValue(json);
    this.editor.on('change', function () {
        var json = this.editor.getValue();
        this.setValueInStorage(json);
    }.bind(this));

// get json
//     var json = editor.get();
};
