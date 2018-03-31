document.addEventListener('DOMContentLoaded', ()=>{
    let btnRefresh = document.getElementById('btn_refresh');
    btnRefresh.addEventListener('click',redirect);

    function redirect() {   
        window.location.href = `http://${document.location.host}/`;
        return false;
    }
});