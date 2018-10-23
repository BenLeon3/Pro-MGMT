//requesting db for a project
let getAProject = projectId => {
    $.ajax({
        type: 'GET',
        url: '/project' + projectId
    })
        .done(project => {
        console.log(project);
        theProjectName = project[0].projectName
        $('#projectSection h1').text(theProjectName)
        showChart();

    })
        .fail((jqXHR, error, errorThrown) => {
        console.log(jqXHR);
        console.log(error);
        console.log(errorThrown);
    });
}

//requesting db for a user's project(s)
let getProjects = username => {
    $('.project').remove();
    $.ajax({
        type: 'GET',
        url: 'user/project/all/' + username
    })
        .done(projects => {
        projects.forEach(project => renderAProject(project))

    })
        .fail((jqXHR, error, errorThrown) => {
        console.log(jqXHR);
        console.log(error);
        console.log(errorThrown);
    });
}

//requesting db for a project's task(s)
let getTasks = projectId => {
    $('.task-row').remove();
    arrayOfTasks = [];
    arrayOfStarts = [];
    arrayOfEnds = [];
    $.ajax({
        type: 'GET',
        url: '/project/task/all/' + theProjectId
    })
        .done(tasks => {
        console.log('getTasks successful', tasks)
        tasks.forEach(task => {
            console.log(task, task.taskName);
            renderATask(task);
            arrayOfTasks.push(task.taskName);
            arrayOfStarts.push(task.taskStart);
            arrayOfEnds.push(task.taskEnd);
        })
        showChart(theProjectId);
    })
        .fail((jqXHR, error, errorThrown) => {
        console.log(jqXHR);
        console.log(error);
        console.log(errorThrown);
    });
}

//displaying a project in home page
let renderAProject = (project) => {
    $('#projectTable tr:last').after(`
<tr class='project' id='${project._id}'>
<td class='project-name'><span class='table-head-mobile'>Project Name: </span>${project.projectName}</td>
<td class='project-predeccesor'><span class='table-head-mobile'>Predecessor: </span>${project.projectPredeccesor}</td>
<td class='project-duration'><span class='table-head-mobile'>Duration: </span>${project.projectDuration}</td>
<td class='project-start'><span class='table-head-mobile'>Start Date: </span>${project.projectStart}</td>
<td class='project-end'><span class='table-head-mobile'>Finish Date: </span>${project.projectEnd}</td>
<td class='project-status'> <span class='table-head-mobile'>Status: </span>${project.projectStatus}</td>
</tr>
`)
}

//displaying a task in project page
let renderATask = (newTask) => {
    //    console.log(`renderATask ran. the new task is ${newTask.taskName}, ${newTask.taskPredeccesor}, ${newTask.taskStatus}`);
    $('#taskTable tr:last').after(`
<tr class='task-row'>
<td colspan='7'>
<form action='' class='project-form seamless-form task' id='${newTask._id}'>
<input class='longer-input a task-name' type='text' value='${newTask.taskName}' required>
<input class='longer-input b task-predeccesor' type='text' value='${newTask.taskPredeccesor}' required>
<input class='shorter-input c task-duration' type='text' value='${newTask.taskDuration}' required>
<input class='shorter-input d task-start' type='text' value='${newTask.taskStart}' required>
<input class='shorter-input d task-end' type='text' value='${newTask.taskEnd}' readonly>
<select name='status' class='task-status' required>
<option value='Planning'>Planning</option>
<option value='On Going'>On Going</option>
<option value='Paused'>Paused</option>
<option value='Canceled'>Canceled</option>
<option value='Completed'>Completed</option>
</select>
<button class='mini-button edit-task-button'><img src='assets/images/edit-icon.png' alt=''></button>
<button class='mini-button delete-task-button' id='deleteButton'><img src='assets/images/trash-icon.png' alt='trash'></button>
</form>
</td>
</tr>
`);
    $('#taskTable tr:last').find('select').val(newTask.taskStatus);
}

//populating project summary at project summary form
let populateProjectSummary = (project) => {
    $.ajax({
        method: 'GET',
        url: '/project/Summary' + project
    })
        .done(project => {
        //            console.log('populateProjectSummary ran', project[0]);
        theProjectName = project[0].projectName
        $('#projectSection h1').text(project[0].projectName);
        $('.project-summary').attr('id', project[0]._id);
        $('#projectName').val(project[0].projectName);
        $('#projectPredeccesor').val(project[0].projectPredeccesor);
        $('#projectDuration').val(project[0].projectDuration);
        $('#projectStart').val(project[0].projectStart);
        $('#projectEnd').val(project[0].projectEnd);
        $('#projectStatus').val(project[0].projectStatus);
    })
        .fail(function (jqXHR, error, errorThrown) {
        console.log(jqXHR);
        console.log(error);
        console.log(errorThrown);
    });
}

//generating gantt chart
let showChart = () => {
    //console.log('showChart ran', theProject);
    //console.log(arrayOfTasks, arrayOfStarts, arrayOfEnds)
    $('#container').empty();
    let arrayOfPeriods = [];
    for (let i = 0; i < arrayOfTasks.length; i++) {
        let [yyyy, dd, mm] = arrayOfStarts[i].split('/').reverse().map(string => parseInt(string));
        let [yyyy2, dd2, mm2] = arrayOfEnds[i].split('/').reverse().map(string => parseInt(string));
        let monthOne = mm - 1;
        let monthTwo = mm2 - 1
        console.log(i, yyyy, monthOne, dd, yyyy2, monthTwo, dd2)
        arrayOfPeriods.push({
            x: Date.UTC(yyyy, monthOne, dd),
            x2: Date.UTC(yyyy2, monthTwo, dd2),
            y: i
        })
    };
    Highcharts.chart('container', {

        chart: {
            type: 'xrange'
        },
        title: {
            text: theProjectName
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: ''
            },
            categories: arrayOfTasks,
            reversed: true
        },
        series: [{
            //name: 'Project 1',
            // pointPadding: 0,
            // groupPadding: 0,
            borderColor: 'gray',
            pointWidth: 20,
            data: arrayOfPeriods,
            dataLabels: {
                enabled: false
            }
        }]
    })
};

//deleting a project
let deleteProject = projectIdToDelete => {
    $.ajax({
        type: 'DELETE',
        url: '/project/Deleteproject' + projectIdToDelete
    })
        .done(() => {
        console.log(`project ${projectIdToDelete} is successfully deleted`);
        $('.hideMe').hide();
        getProjects(theUser);
        $('#homePage').show();
        $('header').show();
    })
        .fail(function (jqXHR, error, errorThrown) {
        console.log(jqXHR);
        console.log(error);
        console.log(errorThrown);
    });
}


//use variables and functions (triggers)

//scrolling
$(document).on('click', '.scroll-js', function () {
    $('html,body').animate({
        scrollTop: $('#appDescription').offset().top
    }, 'slow');
});
