var siteName=document.getElementById("bookmark-name");
var siteUrl=document.getElementById("url");

var sitesArray=[];



if(localStorage.getItem("allsites")!=null){
    var sitesArray=JSON.parse(localStorage.getItem("allsites"));
    displayData();
}


function addSite(){
    var sites={
        name:siteName.value,
        url:siteUrl.value
    }
    
    
  if(validateName()==false || validateUrl()==false){
   
    modal();
    
  }
  else if(validateName()==true && validateUrl()==true){
   
     sitesArray.push(sites);
     localStorage.setItem("allsites",JSON.stringify(sitesArray));
     displayData();
     clearData();
     console.log(sitesArray);

}
}
function clearData(){
    siteName.value="";
    siteUrl.value="";
}
function displayData(){
    var box="";
    for(var i=0;i<sitesArray.length;i++){
    
        box+=`
        <tr>
            <td>${i}</td>
            <td>${sitesArray[i].name}</td>
         <td><button type="button" class="btn btn-success" ><span><i class="fa-solid fa-eye" style="color: #ffffff;"></i></span> &nbsp <a class="text-white text-decoration-none" href="${correct_url(sitesArray[i].url)}" target="_blank" >Visit</a></button></td>

            <td><a  class="btn btn-danger " onclick="deleteElement1(${i})"> <i class="fa-solid fa-trash-can" style="color: #ffffff;"></i></span>&nbsp Delete</a>
            </td>
            
        </tr>`;

    }
    document.getElementById("tbody").innerHTML=box;  
}
function deleteElement1(index){
sitesArray.splice(index,1);
localStorage.setItem("allsites",JSON.stringify(sitesArray));

displayData();


}
function validateName(){
    var regexname=/^([0-9]*[a-zA-Z]){3,}[0-9]*$/;
  return  regexname.test(siteName.value);
        
    
}
function validateUrl(){
    var regex_url=/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    
    return  regex_url.test(siteUrl.value);
}
var UrL="";
function correct_url(UrL){
if (UrL.includes("https://")==false){
    var need_correct="https://"+UrL;
    return need_correct;
}
else{
    return UrL;
}

}
function modal(){
    document.getElementById("modal").innerHTML=
    ` <div class="modal fade  " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered">
      <div class="modal-content w-100 ">
        <div class=" mt-3 d-flex align-content-center justify-content-between">
          <div class=" ps-2 modal-circles">
                <span><i class="fa-solid fa-circle fa-xl" style="color: #f92c4b;"></i></span>
                <span><i class="fa-solid fa-circle fa-xl" style="color: #58fd00;"></i></span>
                <span><i class="fa-solid fa-circle fa-xl" style="color: #f7fa23;"></i></span>  
          </div>
          <button type="button" class="btn-close  pe-2" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body mt-3">
          <p><span><i class="fa-solid fa-circle-arrow-right" style="color: #cc0000;"></i></span> 
            Site name must contain at least 3 characters
         </p>
         <p class="mt-3"><span><i class="fa-solid fa-circle-arrow-right " style="color: #cc0000;"></i></span> 
            Site URL must be a valid one
         </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">I Understood</button>
         
        </div>
      </div>
    </div>
  </div>`;
}