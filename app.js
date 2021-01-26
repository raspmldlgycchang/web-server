var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.locals.pretty = true;
app.use(bodyParser.urlencoded({extended: false}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, './public')));
var data=[
    {
        id:1,
        wait:1,
    },
    {
        id:2,
        wait:1,
    },
    {
        id:3,
        wait:1,
    },
];
app.post('/showHtml', function(req,res){
    var id=req.body.id;
    for(var i in data){
        if(id==data[i].id){
            data[i].wait+=1;
            console.log('id'+id+' is reserved');
        }
    }
    console.log(data);
    res.render('./temp', {waits:id});
});
app.get('/reserve', function(req,res){
    var columns=[
        '놀이기구',
        '대기인원',
        '예약하기'
    ];
    var html='<html>';
        html+='<head><meta charset="utf-8">';
        html+='<link rel="stylesheet" href="/stylesheets/style.css"></link>';
        html+='</head>';
        html+='<body>';
    var table='<table>';
        table+='<thead>';
        table+='<tr>';
    for(var columnIndex in columns){
        table += `<th>${columns[columnIndex]}</th>`;
    }
    table+= '</tr>';
    table+='</thead>';
    table+='<tbody>';
    for(var rowIndex in data){
        var elem = data[rowIndex];
        var parse=parseInt(rowIndex);
            parse += 1;
        table+='<tr>';
        table+=`<td>${elem.id}</td>`;
        table+=`<td>${elem.wait}</td>`;
        var htmladd=`<td>
                        <form action="/showHtml", method="post">
                                <button type="submit" value=${parse} name="id">예약하기</button>
                        </form> 
                    </td>`;
        table+=htmladd;
        table+='</tr>';
                    
    }
    html+=table;
    html+='</tbody>';
    html+='</table>';
    html+='</body>';
    html+='</html>';
    res.send(html);

});
