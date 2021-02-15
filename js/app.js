'use strict';

let arrOfAnimals = [];
let arrOfKeyWords = [];
let uniqueKeyWords = [];
let index = 0;

function Animals (image_url,title,description,keyword,horns) {
    this.image_url=image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    arrOfAnimals.push(this);
}


Animals.prototype.render = function (){
    let $template = $('#photo-template').clone();
    $('main').append($template);
    $template.find('h2').text(this.title);
    $template.find('img').attr('src',this.image_url);
    $template.find('p').text(this.description);
    $template.removeAttr('id');
}

Animals.readJson = () => {
    const ajaxSettings = {
        method:'get',
        dataType:'json'
    };
    $.ajax('../data/page-1.json' ,ajaxSettings)
    .then(data =>{
        data.forEach(element => {
            let animals = new Animals(element.image_url,element.title,element.description,element.keyword,element.horns);
            animals.render();
            arrOfKeyWords.push(element.keyword);
        });
        
        $.each(arrOfKeyWords, function (i, el){
            if($.inArray(el, uniqueKeyWords) === -1) uniqueKeyWords.push(el);
        });
        
        uniqueKeyWords.forEach(element => {
            $('#filter').append(`<option>${element}</option>`);
        });
        
        $('#filter').on('change', () => {
            let clickedKeyWord = event.target.value;
            if (index !==0) {
                $('section').removeClass('hide-section');
            }
            arrOfAnimals.forEach(element => {
                if (clickedKeyWord !== element.keyword){
                    // console.log(element);
                    $(`section:contains(${element.title})`).attr('class','hide-section');
                    index ++;
                } if (clickedKeyWord === "default") {
                    console.log(1);
                    $("section").removeAttr("class");
                } 
            });
        });
    });
};


// console.log(arrOfKeyWords);
// console.log(uniqueKeyWords);

$(()=>Animals.readJson());