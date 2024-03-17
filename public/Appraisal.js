// submit form to table
let submitBtn = document.getElementById('submit')
var conNumber = 0;
const Apraisals=[];
document.querySelector('form').addEventListener('submit',(e)=>{
        e.preventDefault();
        const d = new Date()
        function Apraisal (){
            this.score = e.target.elements.score.value;
            this.innovation = e.target.elements.innovation.value;
            this.Measures = e.target.elements.Measures.value;
            this.Perspective = e.target.elements.Perspective.value;
            this.Objectives = e.target.elements.Objectives.value;
            this.AprasalDate = `${String(d.getDate() + 1).padStart(2,'0')}/${String(d.getMonth() + 1).padStart(2,'0')}/${d.getFullYear()}`;
        }
        Apraisals.unshift(new Apraisal())
        render(Apraisals)
        document.querySelector('form').reset()
});


submitBtn.addEventListener('click',()=>{

});

const render = function(Apraisals){
    Apraisals.forEach((kpi)=>{
        var tbody = document.querySelector('#tbody');
        let trow = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        let td6 = document.createElement('td');
    
        td1.innerText = ++conNumber;
        td6.innerText=kpi.Perspective
        td3.innerText= kpi.Objectives;
        td2.innerText= kpi.Measures;
        td5.innerText= `${kpi.score}%`;
        td4.innerText= kpi.innovation;


        //delete kpi innovation from list   of
       

        trow.appendChild(td1);
        trow.appendChild(td6);
        trow.appendChild(td3);
        trow.appendChild(td2);
        trow.appendChild(td5);
        trow.appendChild(td4);
        tbody.appendChild(trow);
    })
}