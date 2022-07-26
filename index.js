const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
BfilterValue = document.querySelector(".B-filter-info .B-value"),
filterSlider = document.querySelector(".slider input"),
BfilterSlider = document.querySelector(".B-slide input"),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img img"),
resetFilterBtn = document.querySelector(".reset-filter"),
chooseImgBtn = document.querySelector(".choose-img"),
saveImgBtn = document.querySelector(".save-img");


let brightness = 100, saturation = 100, inversion = 0, grayscale = 0
let rotate = 0, flipHorizontal = 1, flipVertical = 1



const applyFilters = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}

const loadImage = () => {
    let file = fileInput.files[0] //gettingthe selected file of the user
    if(!file) return //return if the user has not selected any file
    previewImg.src = URL.createObjectURL(file)// making the preview image or output image source the one choosen by the file
    previewImg.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disable")// making the disable function go away when an image is selected
    })
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;
        if(option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else if(option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`
        } else if(option.id === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        } else {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
});

const applyBorder = () => {
    BfilterSlider.max = "200"
    bord = BfilterSlider.value
    BfilterValue.innerText = `${bord}px`
    previewImg.style.borderRadius = `${bord}px`
    console.log(bord)
}



rotateOptions.forEach(option => {
    option.addEventListener("click", () => { // adding click events to the rotate buttons
        if(option.id === "left") {
            rotate -= 90 // if this btn is clicked it will be rotated by -90
        } else if(option.id === "right") {
            rotate += 90 // if this is clicked it will be rotated by +90
        } else if(option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1// if flipHorizontal value is 1, set this value to -1 else set 1
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1
        }
        applyFilters()
    })
})


const updateFilter = () => {
    filterValue.textContent = filterSlider.value + "%"
    const selectedFilter = document.querySelector(".filter .active") // getting the selected filter btn
    if(selectedFilter.id === "brightness"){
        brightness = filterSlider.value
    } else if(selectedFilter.id === "saturation"){
        saturation = filterSlider.value
    } else if(selectedFilter.id === "inversion"){
        inversion = filterSlider.value
    } else {
        grayscale = filterSlider.value
    }
    applyFilters()
}



const resetFilter = () => {
    // rsetting all the value to its default value
    brightness = 100
    saturation = 100 
    inversion = 0
    grayscale = 0
    rotate = 0 
    flipHorizontal = 1
    flipVertical = 1
    filterOptions[0].click() // clicking brightness btn, so the brightness selected by default
    applyFilters()
}

const saveImage = () => {
    const canvas = document.createElement("canvas") // creating canvas element
    const ctx = canvas.getContext("2d") //canvas.getContext return a drawing context on the canvas
    canvas.width = previewImg.naturalWidth // making the canvas width to actual image width
    canvas.height = previewImg.naturalHeight // making the canvas width to actual image height

    // appling the user selected filter to the canvas filter
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
    ctx.translate(canvas.width / 2, canvas.height / 2) //translate canvas in the center
    if(rotate != 0) {
        ctx.rotate(rotate * Math.PI / 180)
    }
    ctx.scale(flipHorizontal, flipVertical)
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)
    // document.body.appendChild(canvas)
    
    const link = document.createElement("a")
    link.download = "image.jpg" // passing a tag download value to image.jpg
    link.href = canvas.toDataURL() // passing a tag href value to canvas data url
    link.click() // click the a tag so the image can be downloaded
}

fileInput.addEventListener("change", loadImage)
filterSlider.addEventListener("input", updateFilter)
BfilterSlider.addEventListener("input", applyBorder)
resetFilterBtn.addEventListener("click", resetFilter)
saveImgBtn.addEventListener("click", saveImage)
chooseImgBtn.addEventListener("click", () => fileInput.click()) //making the chooseImgBtn have the function of the fileInput
