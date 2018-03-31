document.addEventListener("DOMContentLoaded",()=>{
    let inputsReq = document.querySelectorAll('textarea[required], input[required]');
    let inputEmails = document.querySelectorAll('input[type="email"]');
    let emailsArr = [];

    // ----- SHOW USER AN ERROR
    checkInputs(inputsReq);
    checkEmails(inputEmails);
    showEmials();

    //emails Validator
    function checkEmails(arr){
        [...arr].forEach(function(val){
            val.addEventListener('input',function(){
                let atpos = this.value.indexOf("@");
                let dotpos = this.value.lastIndexOf(".");
                if (atpos<1 || dotpos<atpos+2 || dotpos+2>=this.value.length || !this.checkValidity()){
                    this.classList.add('error');
                }else{
                    this.classList.remove('error');
                }
            });
        });
    }

    //input Validator
    function checkInputs(arr){
        [...arr].forEach(function(val){
            val.addEventListener('input',function(){
                if(this.checkValidity()){
                    this.classList.remove('error');
                }else{
                    this.classList.add('error');
                }
            });
        });
    }

    // ----- ADD EMAILS
    let btn_add = document.getElementById('btn_add');
    let input_add = document.getElementsByName('add');

    btn_add.addEventListener('click', function(){
        if(handleError(input_add) || input_add[0].classList.contains('error')){
            alert("Wrong");
        }else{
            let indx = emailsArr.indexOf(input_add[0].value);
            if(indx === -1){
                emailsArr.push(input_add[0].value);
            }
            input_add[0].value = "";
        }
        showEmials();
        console.log(emailsArr);
    });

    input_add[0].addEventListener("keyup", function(event) {
        event.preventDefault();
        if(event.keyCode === 13){
            btn_add.click();
        };
    });

    // ----- REMOVE EMAIL
    let btn_remove = document.getElementById('btn_remove');
    let input_remove = document.getElementsByName('remove');
    
    btn_remove.addEventListener('click', function(){
        if(handleError(input_remove) || input_remove[0].classList.contains('error')){
            alert("Wrong");
        }else{
            let indx = emailsArr.indexOf(input_remove[0].value);
            if(indx > -1){
                emailsArr.splice(indx,1);
            }
            input_remove[0].value = "";
        }
        showEmials();
        console.log(emailsArr);
    });

    input_remove[0].addEventListener("keyup", function(event) {
        event.preventDefault();
        if(event.keyCode === 13){
            btn_remove.click();
        };
    });

    //SHOW USER AN ARRAY WITH EMAILS
    function showEmials(){
        let outputBox = document.getElementsByClassName('form_emails_list')[0];
        let output = "";
        emailsArr.forEach(function(val){
            output += `${val}, `; 
        });
        outputBox.innerHTML = output;
    }

    // -----------------------------
    // ----- SEND DATA TO A SERVER
    let btn_send = document.getElementById('btn_send');

    btn_send.addEventListener('click',function(){
        if(emailsArr.length===0 || handleError(inputsReq)){
            alert("Something is wrong");
        }else{
            //prepare and send data
            let obj = {};
            obj.host = document.getElementsByName('host')[0].value;
            obj.pass = document.getElementsByName('pass')[0].value;
            obj.company = document.getElementsByName('company')[0].value;
            obj.title = document.getElementsByName('title')[0].value;
            obj.message = document.getElementsByName('message')[0].value;
            obj.emailslist = emailsArr;
            let lang_option = document.getElementsByName('lang')[0];
            obj.lang = lang_option.options[lang_option.selectedIndex].value;
        
            fetch('formdata',{
                method: "POST",
                body: JSON.stringify(obj),
                headers: ({
                    'Content-Type': 'application/json'
                })
            }).then(res => res.json())
            .catch(error => console.log('Error: '+error))
            .then(response => {
                //redirect after sent all emails
                window.location.href = `${window.location.href}sent/?amount=${response}`;
            });
        }
    });

    //handle invalid data to SEND
    function handleError(arr){
        return [...arr].some(function(val){
            return val.value === '';
        });
    }
});