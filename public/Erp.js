// display various section of the employee creation form 
let categories = document.getElementsByName('category');
for(i = 0 ;i < categories.length; i++){
    // for work information section
    categories[i].addEventListener('click',()=>{
        let privateinfomationForm = document.getElementById("privateinfo"); 
        let workInfomationForm = document.getElementById("workInfo"); 
        let thirdInfo = document.getElementById("thirdinfo");
        
        // for work infomation
        categories[0].onclick = DisplayWork=()=>{
                setTimeout(() => {
                    workInfomationForm.classList.remove("hidden");
                    privateinfomationForm.classList.add('hidden');
                    categories[0].classList.remove("border");
                    categories[1].classList.add('border');
                    categories[2].classList.add('border');
                    thirdInfo.classList.add('hidden');
                }, 1000);
        };
        // for Private information
        categories[1].onclick = DisplayPrivate = ()=>{
            setTimeout(() => {
                workInfomationForm.classList.add("hidden");
                privateinfomationForm.classList.remove('hidden');
                thirdInfo.classList.add('hidden');
                categories[0].classList.add("border");
                categories[1].classList.remove('border');
                categories[2].classList.add('border');
            }, 1000);
        };

        categories[2].onclick = displayThird = ()=>{
            setTimeout(() => {
                thirdInfo.classList.remove('hidden');
                workInfomationForm.classList.add("hidden");
                privateinfomationForm.classList.add('hidden');
                categories[0].classList.add("border");
                categories[1].classList.add('border');
                categories[2].classList.remove('border');
            }, 1000);
        };
        // categories[4].onclick =;
    });
}

//navigation/ menu bar
  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("main").style.display='none';
  }
// close navigation menu bar
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.getElementById("main").style.display='block';
}

DisplayDepartmentForm=()=>{
    document.querySelector('article').innerHTML=''
    // get from div and display form for department creation
    let div = document.getElementById('departmentForm')

}






