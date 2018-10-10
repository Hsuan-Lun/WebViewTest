var PEDATA = new Object();

var field_chk = ["spine_frontal","spine_thoracic","spine_lumbar",
             "pelvis_sagittal","pelvis_frontal","pelvis_transverse",
             "hip_joint_left","hip_joint_right",
             "knee_sagittal_left","knee_sagittal_right",
             "knee_frontal_left","knee_frontal_right",
             "knee_transverse_left","knee_transverse_right",
             "repeat_sprain_left","repeat_sprain_right",
             "forefoot_left","forefoot_right","hindfoot_left","hindfoot_right",
             "ankle_flexion_left","ankle_flexion_right","footlength_symmetry"];

var field_input = ["toe_inout_angle_left","toe_inout_angle_right",
                   "max_dorsiflexion_angle_left","max_plantarflexion_angle_left",
                   "max_dorsiflexion_angle_right","max_plantarflexion_angle_right",
                   "foot_higher_value_left","foot_higher_value_right"];

var linkmap={"ankle_flexion_left":["max_dorsiflexion_angle_left","max_plantarflexion_angle_left"],
             "ankle_flexion_right":["max_dorsiflexion_angle_right","max_plantarflexion_angle_right"],
             "footlength_symmetry":["foot_higher_value_left","foot_higher_value_right"]};

function initialData(){
    for(let i = 0 ; i<field_chk.length ; i++){
        PEDATA[field_chk[i]] = [true,false,false];
        for(let j = 0 ; j<3 ; j++){
            document.getElementsByName(field_chk[i])[j].checked = PEDATA[field_chk[i]][j];
        }
    }

    for(let i = 0;i<field_input.length ; i++){
            PEDATA[field_input[i]] = "0";
            document.getElementsByName(field_input[i])[0].value = "0";
    }

    checkInputDisable();
    // alert("Complete!");
}

function clearForm(){
    let ans = confirm("確定取消?");
    if(ans){
        initialData();
    }
}

function saveForm(){
    let ans = confirm("確定儲存?");
    if(ans){
        localStorage.setItem("PEDATA",PEDATA);
        printPDF();
    }
}

function updateRadioValue(evt){
    let temp = document.getElementsByName(evt.name);
    for(let i = 0 ; i<temp.length;i++){
        PEDATA[evt.name][i] =temp[i].checked;
    }
    checkInputDisable();
    console.log(evt.name + ":" + PEDATA[evt.name]);
}

function updateInputValue(evt){
    let temp = document.getElementsByName(evt.name);
    PEDATA[evt.name] = temp[0].value;
    console.log(evt.name + "=" + PEDATA[evt.name]);
}

function checkInputDisable(){
    let obj = Object.getOwnPropertyNames(linkmap);
    for (let i=0;i<obj.length;i++){
        if(document.getElementsByName(obj[i])[1].checked){
            document.getElementsByName(linkmap[obj[i]][0])[0].disabled = false;
        }else{
            document.getElementsByName(linkmap[obj[i]][0])[0].disabled = true;
            document.getElementsByName(linkmap[obj[i]][0])[0].value = "0";
        }

        if(document.getElementsByName(obj[i])[2].checked){
            document.getElementsByName(linkmap[obj[i]][1])[0].disabled = false;
        }else{
            document.getElementsByName(linkmap[obj[i]][1])[0].disabled = true;
            document.getElementsByName(linkmap[obj[i]][1])[0].value = "0";
        }
    }
}


function printPDF() {
    html2canvas(document.querySelector(".container"),{scale: 2}).then(canvas => {
        let pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL("image/png"), 'PNG', 0, 0, 211, 298);
        pdf.save("PE_Exam.pdf");
    });
}