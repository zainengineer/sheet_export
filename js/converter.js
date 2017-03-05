csvConvertHelper = {};
csvConvertHelper.convert = function(){

};
csvConvertHelper.friendlyJson = function(){
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