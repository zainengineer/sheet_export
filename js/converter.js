csvConvertHelper = {};

csvConvertHelper.process = function () {
    var csv = this.convert();
    if (jQuery) {
        jQuery('.csv-output').val(csv);
        jQuery('.clip-board-trigger').attr('data-clipboard-text', csv);
        this.clipBoardBind = new Clipboard('.clip-board-trigger');
    }

};
csvConvertHelper.convert = function(){
    var json = this.csvJsonArray();
    var csv = Papa.unparse(json);

    PostHelper.sendData(csv,json);

    return csv;
};
csvConvertHelper.csvJsonArray = function(){
    var originalJson = window.jsonEditorHelper.editor.getValue();
    var jsonOutput = [];
    var ticketNumber , taskStart, projectName, projectInfo, ticketInfo,taskInfo,row;
    for (projectName in originalJson) {
        projectInfo = originalJson[projectName];
        for (ticketNumber in projectInfo){
            ticketInfo = projectInfo[ticketNumber];
            for (taskStart in ticketInfo){
                taskInfo = ticketInfo[taskStart];
                row = {profile:projectName,task:taskInfo.task,start:taskInfo.start,end:taskInfo.end};
                jsonOutput.push(row);
            }

        }
    }
    return jsonOutput;
};