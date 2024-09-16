let spending = [];
let barCharMaxHeight = 130;

window.addEventListener("load", (e) => {
    getData();
})

async function getData(){
    // get data
    try{
        const response = await fetch("data.json");
        if(response.ok){
            const data = await response.json();
            for(let i = 0; i < 7; i++){
                spending[i] = data[i].amount;
            }
        }
    }
    catch(error){
        console.error(error);
    }
    setData();
}

function setData(){

    let max = Math.max(...spending);
    let total = spending.reduce( (total, amount) => {
        return total + amount;
    }, 0);

    // day [0-6] [sunday-saturday]
    let day = new Date().getDay();

    for(let i = 0; i < 7; i++){

        // spending figure
        daySpending_elementId = `daySpending_${i}`;
        let daySpending = document.getElementById(daySpending_elementId);
        daySpending.style.visibility = "hidden";
        daySpending.innerHTML = '$' + spending[i];

        // bar char height
        let barHeight = ( spending[i] / (max) ) * barCharMaxHeight;
        let bar = document.getElementsByClassName("bar")[i];
        bar.style.height = barHeight + 'px';

        // set bar color and hover state for current day
        // day in [monday-sunday]
        if( i == ((day-1)<0?6:(day-1)) ){
            bar.classList.add("today");
        }

        document.getElementsByClassName("bar")[i].addEventListener("click", (e) => {
            let daySpendingBox = e.target.parentElement.children[0];

            // Alter visibility each time
            if( daySpendingBox.style.visibility == "hidden" ){
                daySpendingBox.style.visibility = 'visible';
            }
            else{
                daySpendingBox.style.visibility = "hidden";
            }
        })

        // Alter visibility when mouseleave
        // document.getElementsByClassName("bar")[i].addEventListener("mouseleave", (e) => {
        //     let daySpendingBox = e.target.parentElement.children[0]
        //     daySpendingBox.style.visibility = "hidden";
        // })
    }

}
