function createSlider (target_div_id,title,images_src) {
    let target_div = document.getElementById(target_div_id);
    target_div.classList.add("slider_target_div");
    let container_div = document.createElement("div");
    container_div.id = title + "_slider_container_div";
    container_div.classList.add("slider_container_div");

    target_div.appendChild(container_div);
    
    let left_arrow_container = document.createElement("div");
    left_arrow_container.classList.add("left_arrow_container");
    left_arrow_container.id = title + "left_arrow_container";
    let left_arrow_btn = document.createElement("button");
    left_arrow_btn.classList.add("left_arrow_btn");
    left_arrow_btn.setAttribute("side","left");
    left_arrow_btn.id = title + "left_arrow_btn";
    left_arrow_btn.innerHTML = "&#9665";

    container_div.appendChild(left_arrow_container);
    left_arrow_container.appendChild(left_arrow_btn);

    let right_arrow_container = document.createElement("div");
    right_arrow_container.classList.add("right_arrow_container");
    right_arrow_container.id = title + "right_arrow_container";
    let right_arrow_btn = document.createElement("button");
    right_arrow_btn.classList.add("right_arrow_btn");
    right_arrow_btn.setAttribute("side","right");
    right_arrow_btn.id = title + "right_arrow_btn";
    right_arrow_btn.innerHTML =  "&#9655";

    container_div.appendChild(right_arrow_container);
    right_arrow_container.appendChild(right_arrow_btn);

    image_container = document.createElement("div");
    image_container.id = title+"image_container";
    image_container.classList.add("image_container");

    container_div.appendChild(image_container);

    circles_container = document.createElement("div");
    circles_container.classList.add("circles_container");
    circles_container.id = title + "_circles_container";
    let circles = [];
    for(let i=0; i<images_src.length; i++){
        circles[i] = document.createElement("span");
        circles[i].classList.add("circle");
        circles[i].classList.add("uncolored");
        circles_container.appendChild(circles[i]);
    }

    container_div.appendChild(circles_container);


    let images = images_src.map( (src,index) => {
        let img= document.createElement("img");
        img.setAttribute("src",src);
        img.setAttribute("number",index);
        img.classList.add("slider_img");
        return img;
        }
    );
   

    image_container.addEventListener("DOMNodeInserted",newImageInserted);
    left_arrow_btn.addEventListener("click",clickArrow);
    right_arrow_btn.addEventListener("click",clickArrow);

    let changeImageTimerId = null; 
    let current_image_number = 0; 

    function newImageInserted () {
        //current_image_number = Number(img.getAttribute("number"));
        changeImageTimerId = setTimeout(nextImage,5000); 
    }

    function nextImage () {
        image_container.removeChild(images[current_image_number]); 
        circles[current_image_number].classList.replace("colored","uncolored");
        if(current_image_number + 1 == images.length){current_image_number = 0}
        else {current_image_number+=1}
        image_container.appendChild(images[current_image_number]);
        circles[current_image_number].classList.replace("uncolored","colored");
    }

    function prevImage () {
        image_container.removeChild(images[current_image_number]); 
        circles[current_image_number].classList.replace("colored","uncolored");
        if(current_image_number - 1 < 0){current_image_number = images.length-1}
        else {current_image_number-=1}
        image_container.appendChild(images[current_image_number]);
        circles[current_image_number].classList.replace("uncolored","colored");
    }

    
    function clickArrow (e) {
        clearTimeout(changeImageTimerId);
        let side = e.target.getAttribute("side");
        if(side == "right") {nextImage(current_image_number)}
        else {prevImage(current_image_number)}
    }

    image_container.appendChild(images[0]);
    circles[0].classList.replace("uncolored","colored");
}

testImagesSrc = [
    "./images/img_00.jpg",
    "./images/img_01.webp",
    "./images/img_02.jpg",
    "./images/img_03.jpg",
    "./images/img_04.jpg",
    "./images/img_05.webp",
    "./images/img_06.jpg"
];

createSlider("target_div","test",testImagesSrc);