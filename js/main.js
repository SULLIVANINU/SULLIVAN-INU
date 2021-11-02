$(document).ready(function(){
  $(window).click(function(e) {
     if($(".navbar-collapse").hasClass("show")){
        $('.navbar-collapse').removeClass("show"); 
        e.preventDefault();
        }
  });
   $('.navbar-collapse').click(function(event){
       event.stopPropagation();
   });
   $(window).scroll(function(){
      var sticky = $('.header'),
         scroll = $(window).scrollTop();
      if (scroll >= 0) {
         $(".moon").css('transform','translateY('+(scroll)+'px) ');
      }
      var nhan = 2;
      if(scroll>=0 && scroll<=500){
         var fly = scroll*nhan;
         $('.shibawitch-fly').css({'transform':'scaleX(1) translate('+(fly)+'%,'+scroll+'px)','width':'100%'});
      }
      if(scroll>=500){
         var scroll2 = 500;
             getscroll = scroll2*nhan;
             fly = -(getscroll-(scroll-scroll2)*nhan);
         $('.shibawitch-fly').css({'transform':'scaleX(-1) translate('+(fly)+'%,'+scroll+'px)','width':'50%'});
      }
      if(scroll>=1300){
         var scroll2 = 800;
             getscroll = scroll2*nhan;
             fly = -(getscroll-(scroll-scroll2)*nhan);
         $('.shibawitch-fly').css({'transform':'scaleX(1) translate('+(fly)+'%,'+scroll+'px)','width':'50%'});
      }
      if(scroll>=2000){
         var scroll2 = 1500;
             getscroll = scroll2*nhan;
             fly = -(getscroll-(scroll-scroll2)*nhan);
         $('.shibawitch-fly').css({'transform':'scaleX(-1) translate('+(fly)+'%,'+scroll+'px)','width':'50%'});
      }
   });
   window.halloweenBats = $.halloweenBats({
      amount: 10
   });
   Leaderboard();
   setInterval(Leaderboard, 5000);
   setInterval(function time(){
    var date = new Date();
    var offset = '+8';
    var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    var d = new Date(utc + (3600000 * offset));
    var hours = 23 - d.getHours();
     var min = 59 - d.getMinutes();
     if((min + '').length == 1){
       min = '0' + min;
     }
     var sec = 59 - d.getSeconds();
     if((sec + '').length == 1){
           sec = '0' + sec;
     }
     jQuery('.countdown').html(hours+' : '+min+' : '+sec);
   }, 1000);
});
function CopyToClipboard(containerid) {
 const textarea = document.createElement("textarea");
 textarea.id = "temp_element";
 textarea.style.height = 0;
 document.body.appendChild(textarea);
 textarea.value = document.getElementById(containerid).innerText;
 const selector = document.querySelector("#temp_element");
 selector.select();
 document.execCommand("copy");
 document.body.removeChild(textarea);
 alert("Copied");
}
function Leaderboard(){
   var settings = {
     "url": "https://shibawitch.com/api/?key=list&secret=F8529AAA96DF1112161367BE281C6&pass=xXg9Z9jby7VJObO1CcTaEOZqujly04LE",
     "method": "POST",
     "timeout": 0,
     "processData": false,
     "mimeType": "multipart/form-data",
     "contentType": false,
   };
   $.ajax(settings).done(function (response) {
      var getData = $.parseJSON(response);
      if(getData['status']=='success'){
         var datas1 = getData['data'][1]==''?'':Object.values(getData['data'][1]);
         var datas2 = getData['data'][2]==''?'':Object.values(getData['data'][2]);
         datas1.sort(function(a, b){
             return b.score - a.score;
         });
         datas2.sort(function(a, b){
             return b.score - a.score;
         });
         var no1 = 1;
         var no2 = 1;
         var html1 = '';
         var html2 = '';
         $.each(datas1, function( index, value ) {
            var number = no1++;
                status = 'btn-dark';
            if(number==1){
               status = 'btn-danger';
               token = '10,000';
            }
            else if(number==2){
               status = 'btn-warning';
               token = '5,000';
            }
            else if(number==3){
               status = 'btn-info';
               token = '3,000';
            }
            else if(number==4 || number==5){
               token = '1,000';
            }
            else if(number>5 && number<10){
               token = '500';
            }
            if(number>0 && number<=10){
               html1 += '<div class="bg-dark-2 bg-opacity-75 p-3 rounded-10 shadow mb-3"><div class="row"><div class="col-lg-2 text-start"><span class="btn btn-lg '+status+' fw-bold">'+number+'</span></div><div class="col-lg-5 text-start"><p class="text-muted mb-0">Address</p><div class="col-12 text-truncate">'+value['address']+'</div></div><div class="col-lg-2 text-start"><p class="text-muted mb-0">Score</p><div class="col-12 text-truncate">'+value['score']+'</div></div><div class="col-lg-3 text-start"><p class="text-muted mb-0">Token reward</p><div class="col-12 text-truncate">'+token+'</div></div></div></div>';
            }
         });
         $('#Leaderboard-1').html(html1);
         $.each(datas2, function( index, value ) {
            var number = no2++;
                status = 'btn-dark';
            if(number==1){
               status = 'btn-danger';
               token = '15,000';
            }
            else if(number==2){
               status = 'btn-warning';
               token = '8,000';
            }
            else if(number==3){
               status = 'btn-info';
               token = '5,000';
            }
            else if(number==4 || number==5){
               token = '2,000';
            }
            else if(number>5 && number<10){
               token = '1,000';
            }
            if(number>0 && number<=10){
               html2 += '<div class="bg-dark-2 bg-opacity-75 p-3 rounded-10 shadow mb-3"><div class="row"><div class="col-lg-2 text-start"><span class="btn btn-lg '+status+' fw-bold">'+number+'</span></div><div class="col-lg-5 text-start"><p class="text-muted mb-0">Address</p><div class="col-12 text-truncate">'+value['address']+'</div></div><div class="col-lg-2 text-start"><p class="text-muted mb-0">Score</p><div class="col-12 text-truncate">'+value['score']+'</div></div><div class="col-lg-3 text-start"><p class="text-muted mb-0">Token reward</p><div class="col-12 text-truncate">'+token+'</div></div></div></div>';
            }
         });
         $('#Leaderboard-2').html(html2);
      }
   });   
}