

function getPreviousData(){
  let slotinfo=localStorage.getItem("slots");
  slotinfo=JSON.parse(slotinfo);
  return slotinfo;
}
function createCardAv(idInfo,priceHour){
    console.log(idInfo,priceHour)
    let code = `
    
    <div class = "card">
    <div class = "cardText">
    <p class = "slotId">Slot Id</p>
    <p class="idInfo">${idInfo}</p>
    <p class="priceHour">Price Per Hour</p>
    <p class="price">${priceHour}</p>
    <input type="button"  class="button" onclick="onBooking(${idInfo})" value="Book">

    </div>
    </div>
    `;
    return code;
}

function onBooking(idInfo){
    var date=new Date()
    console.log("booking is called")
     var Hour=date.getHours();
     var minutes=date.getMinutes();
     var time=(Hour*60+minutes);
      var dataTobeSaved=[];
    var infos={};
    infos=getPreviousData();
      infos.forEach((post)=>{
          if(idInfo==post.slotId){
              post.slotstatus="0"
              post.starting=time;
          }
          dataTobeSaved.push(post)
          
    
      });
      localStorage.setItem("slots",JSON.stringify(dataTobeSaved))
      loadData();
}

function createCardBo(idInfo,priceHour){
    console.log(idInfo,priceHour)
    let code = `
    
    <div class = "card">
    <div class = "cardText">
    <p class = "slotId">Slot Id</p>
    <p class="idInfo">${idInfo}</p>
    <p class="priceHour">Price Per Hour</p>
    <p class="price">${priceHour}</p>
    <input type="button"  class="button" onclick="onRelease(${idInfo})" value="Release">

    </div>
    </div>
    `;
    return code;
}

function onRelease(idInfo){
    var date=new Date()
    var Hour=date.getHours()
     var minutes=date.getMinutes();
     var time=(Hour*60+minutes);
      var dataTobeSaved=[]
      var cost;
      var startingTime;
      var rate;
    var infos={}
    infos=getPreviousData()
      infos.forEach((post)=>{
          if(idInfo==post.slotId){
              rate=post.priceHour;
              startingTime=post.starting;
              post.slotstatus="1"
              post.starting="0"
          }
          cost=(time-startingTime)*(rate/60);
          console.log("cost",cost)
          console.log("Time difference", time-startingTime)
          console.log("Starting time",startingTime)
          console.log("Time",time)
          dataTobeSaved.push(post)
        })
        alert("Your Bill due is "+cost)
        localStorage.setItem("slots",JSON.stringify(dataTobeSaved))
      loadData();
}


//console.log("infos   ",infos)
function loadData(){
  var infos={};
  infos=getPreviousData();
  var text="";
  text='<div class="chotobottle">'
    infos.forEach((post)=>{
        
        let slotNo = post.slotId;
        let price = post.priceHour;
        console.log(slotNo,price)
        if(post.slotstatus==1){
            text+=createCardAv(slotNo,price);

        }
        else{
            text+=createCardBo(slotNo,price);
        }
    });
    text+='</div>'
    document.getElementById("borobottle").innerHTML=text;
  

}

loadData();