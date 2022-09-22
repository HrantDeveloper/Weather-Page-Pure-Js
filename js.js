class Weather{
    constructor(){
    this.input=document.querySelector("input");
    this.btn=document.querySelector("button")
    this.downSide=document.querySelector(".down-side");
    this.UpSide=document.querySelector(".up-side");
    this.input.addEventListener("input",(evt)=>{
        this.inputValue=evt.target.value;
    })
    this.btn.addEventListener("click",(evt)=>{
      this.todayInfo(this.inputValue)
    })
    }

   async todayInfo(city){
    const {data}=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a512cf5bbf1aeed77ed36feb75a6d886&units=metric`);
    this.UpSide.innerHTML="";
    this.h1=document.createElement('h1');
    this.h1.innerHTML=`${data.name}'s weather`;
    this.UpSide.appendChild(this.h1);

    const temp=document.createElement('div');
    temp.classList.add('temp')
    const iconDiv=document.createElement('div');
    iconDiv.classList.add('icon-div');
    iconDiv.style.backgroundImage=`url( http://openweathermap.org/img/wn/${data.weather[0].icon}.png)`;
    temp.appendChild(iconDiv);

    const tempP=document.createElement('p');
    tempP.classList.add('tempP')
    tempP.innerHTML=`${data.main.temp} C`;
    temp.appendChild(tempP);

    this.UpSide.appendChild(temp);

    const humidity=document.createElement('div');
    humidity.classList.add('humidity')

    const humidityP=document.createElement('p');
    humidityP.innerHTML=`Humidity: ${data.main.humidity} %`;
    humidity.appendChild(humidityP);

    const windSpeedP=document.createElement('p');
    windSpeedP.innerHTML=`Wind Speed: ${data.wind.speed} km/h`;
    humidity.appendChild(windSpeedP);

    this.UpSide.appendChild(humidity);

    const visibility=document.createElement('div');
    visibility.classList.add('visibility')

    const airPressureP=document.createElement('p');
    airPressureP.innerHTML=`Air pressure: ${data.main.pressure} BAR`;
    visibility.appendChild(airPressureP);

    const visibilityP=document.createElement('p');
    visibilityP.innerHTML=`Visibility: ${data.visibility} km`;
    visibility.appendChild(visibilityP);

    this.UpSide.appendChild(visibility)

    this.sevenDayInfo(data.coord.lat,data.coord.lon,"hourly")

}
async sevenDayInfo(lat,lon,part){
  this.downSide.innerHTML='';
  const {data} =  await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=6653aaf123dae8891a4d052e8f56238f&units=metric`);
    data.daily.forEach((item,)=>{
      
      const sevenDivs=document.createElement('div');
      sevenDivs.classList.add('seven-divs');

      const sevenDivsDate=document.createElement('p');
      sevenDivsDate.textContent=this.convertUnixTime(item.dt);
      sevenDivs.appendChild(sevenDivsDate);

      const iconDiv=document.createElement('div');
      iconDiv.classList.add('icon-div');
      iconDiv.style.backgroundImage=`url( http://openweathermap.org/img/wn/${item.weather[0].icon}.png)`;
      sevenDivs.appendChild( iconDiv);

      const minMaxTempP=document.createElement('p');
      minMaxTempP.innerText=`${item.temp.min} C / ${item.temp.max} C`;
      sevenDivs.appendChild( minMaxTempP);

      const mainP=document.createElement('p');
      mainP.textContent=item.weather[0].main;
      sevenDivs.appendChild( mainP);
      
      this.downSide.appendChild(sevenDivs);
    })
   
}
convertUnixTime(unix) {
  let a = new Date(unix * 1000),
      year = a.getFullYear(),
      months = ['January','February','March','April','May','June','July','August','September','October','November','December'],
      month = months[a.getMonth()],
      date = a.getDate(),
      hour = a.getHours(),
      min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(),
      sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
  return `${month} ${date}, ${year}`;
}
}
const weather=new Weather();