let size=0;
function valid(){
    let user = document.getElementById("user").value
    let pw = document.getElementById("pass").value
    
    if(user =="admin" && pw =="123"){
        location.href='Admin.html'
    }
    else if(user =="gateman" && pw =="123"){
        location.href='gateman.html'
    }
    else{
        alert("chudi")
    }
}




function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
 
function resetForm(){
 
}


  const cards = document.querySelector(".slotCards");

function createCard(idInfo,priceHour){
    console.log(idInfo,priceHour)
    let code = `
    
    <div class = "card">
    <div class = "cardText">
    <p class = "slotId">Slot Id</p>
    <p class="idInfo">${idInfo}</p>
    <p class="priceHour">Price Per Hour</p>
    <p class="price">${priceHour}</p>
    <input type="button"  class="button" onclick="removeSlot(${idInfo})" value="Delete">
    <input type="button"  class="button" onclick="editSlot()" value="Edit">

    </div>
    </div>
    `;
    return code;
}



  const saveSlot=()=>{
   
    let Allslots = []
    let slotId=document.getElementsByName('slotId')['0']['value']
    let priceHour = document.getElementsByName('priceHour')['0']['value']
    let newSlot = {
        slotId : slotId,
        priceHour : priceHour,
        slotstatus:"1",
        starting:"0"

    }
    // var newSlot={}
    // newSlot["slotnumber"] = slotId//document.getElementsByName("slotId").value;
    // newSlot["rateperhour"] = priceHour//document.getElementsByName("priceHour").value;
    // newSlot["slotstatus"]="1";
    // newSlot["starting"]="0";
    // newSlot["stopping"]="0";
      let previousStoredData = localStorage.getItem('slots')
      if(!previousStoredData) {
            Allslots.push(newSlot)
      }
      else {
          
          let datas = JSON.parse(previousStoredData)
          Allslots = datas
        //  console.log('slots without new slot',Allslots)
          Allslots.push(newSlot)
          
      }
      //console.log('slots with new slot',Allslots)
      let stringSlot=JSON.stringify(Allslots)
      localStorage.setItem('slots',stringSlot)
      var recieveData =JSON.parse(localStorage.getItem("slots"))
      
        let slotNo = recieveData[size].slotId;
        let price = recieveData[size].priceHour;
        //console.log(slotNo,price)
        //createCard(slotNo,price);

      
      size++;
      document.getElementById("myForm").style.display = "none";
      loadData();
      
      

}

function getPreviousData(){
  let slotinfo=localStorage.getItem("slots");
  slotinfo=JSON.parse(slotinfo);
  return slotinfo;
}


//console.log("infos   ",infos)
function loadData(){
  resetForm();
  var infos={};
  infos=getPreviousData();
  var text="";
  text='<div class="chotobottle">'
    infos.forEach((post)=>{
        
        let slotNo = post.slotId;
        let price = post.priceHour;
        console.log(slotNo,price)
       text+=createCard(slotNo,price);
    });
    text+='</div>'
    document.getElementById("borobottle").innerHTML=text;
    // for(let index in infos)
    // {
    //     //console.log(infos[index])
    //     //let slotNo = post.slotId;
    //     //let price = post.priceHour;
    //     console.log(infos[index].slotId,infos[index].priceHour)
    //     createCard(infos[index].slotId,infos[index].priceHour);
    // }
  

}
function removeSlot(idInfo){
  var infos={};
infos=getPreviousData();
  var dataTobeSaved=[];
  //console.log(storedData)
  infos.forEach((post)=>{
      if(idInfo!=post.slotId){
        dataTobeSaved.push(post);
      }
  })
  console.log("chudi kn asena"+ dataTobeSaved)
  localStorage.setItem("slots", JSON.stringify(dataTobeSaved))
  loadData();
}
function editSlot(){

}
loadData();