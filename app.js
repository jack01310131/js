var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var engine = require('ejs-locals');
var path = require('path');
var mysql = require('mysql');
var d3 = require('d3');
var cookieParser = require('cookie-parser');
var cookiejson = require('js-cookie');
var session = require('cookie-session');
var dateFormat = require('dateformat');
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy


process.env.TZ = 'Hongkong'
var now = new Date();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, '/css')))
app.use(express.static(path.join(__dirname, '/js')))
app.use(express.static(path.join(__dirname, '/img')))
app.use(express.static(path.join(__dirname, '/pic')))
app.use(express.static(path.join(__dirname, '/images')))
app.use(express.static(path.join(__dirname, '/image')))
app.use(session({
    secret: '1q3rrwefsgdh54uu5h56', 
    cookie: { maxAge: 1000 * 1000 }
  }));
// app.engine('.html',require('ejs').__express);
// app.set('views', path.join(__dirname, 'Views'));
// app.set('view engine', 'html');

app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

var con = mysql.createConnection({
    host: "db4free.net",
    user: "jsim108project",
    password: "im108js",
    port:"3307",
    database: "jsimproject"
  });
  con.connect(function(err) {
    if (err) {
        console.log('connecting error');
        return;
    }
    console.log('connecting success');
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    req.con = con;
    next();
});


var FACEBOOK_APP_ID = '1758051484267982' ,
FACEBOOK_APP_SECRET = 'a774fce4757012d71fbb1a7d789076e7'


passport.use(new FacebookStrategy({
clientID: FACEBOOK_APP_ID,
clientSecret: FACEBOOK_APP_SECRET,
callbackURL: "http://im108jsfinalproject.herokuapp.com/auth/facebook/callback",
profileFields:['id','emails','gender','birthday','age_range']
},
function(accessToken, refreshToken, profile, cb) {
var facebookId = profile.id,
    facebookEmail = profile.email,
    facebookGender = profile.gender,
    facebookAge =  profile._json.age_range
   
return cb(null, profile);
})); 
passport.serializeUser(function(user, cb) {
cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
cb(null, obj);
});
app.use(passport.initialize());
app.use(passport.session());



app.get('/auth/facebook',passport.authenticate('facebook',{scope:['email','user_birthday']}));
// successRedirect:'/login',
app.get('/auth/facebook/callback',passport.authenticate('facebook',{failureRedirect: '/login' }),function(req, res) {
// Successful authentication, redirect home. 
// console.log(facebookId)

res.redirect('/fbdb');
});

app.get('/fbdb',function(req,res){ 
console.log(req.user)
console.log(req.user.id)
console.log(req.user._json.age_range.min)
var sql ='SELECT * FROM user WHERE u_fb="'+req.user.id+'"'
var gg=new Array();
con.query(sql,function(error, result, fields){
   if(error){console.log('讀取失敗！');throw error;}
   gg=result;
   res.redirect('http://im108jsfinalproject.herokuapp.com/fb/fbfb/fbfbfb/fbfbfbfb?gglength='+gg.length+'&id='+req.user.id+'&email='+req.user._json.email+'&gender='+req.user.gender+'&age='+req.user._json.age_range.min)

})})

app.get('/fb/fbfb/fbfbfb/fbfbfbfb',function(req,res){
var gglength =req.query.gglength

var fb_id = req.query.id;
var fb_email = req.query.email;
var fb_age = req.query.age;
var fb_gender = req.query.gender;
console.log(fb_age)
console.log(fb_email)
if(gglength>0){
    req.session.username = fb_id;   
    res.redirect('http://im108jsfinalproject.herokuapp.com/homepage')     
}else{
    var sql2 = 'insert INTO user (u_fb,u_email,u_age,u_gender) values ("'+fb_id+'","'+fb_email+'","'+fb_age+'","'+fb_gender+'")'
    con.query(sql2,function(error){if(error){console.log('寫入資料失敗！');throw error;}})
    req.session.username = fb_id;
    res.redirect('http://im108jsfinalproject.herokuapp.com/homepage')
}

})


app.get('/backstage_login_check',function(req,res){

    var check_account = req.query.manager_account , check_pwd = req.query.manager_pwd
    if(check_account=='root' && check_pwd=='root'){
        
        res.redirect('http://im108jsfinalproject.herokuapp.com/backstage_option')
    }else{
	res.redirect('http://im108jsfinalproject.herokuapp.com/backstage_login')
    }
})

app.get('/homepage', function (req, res) {      //首頁
    var user=new Array();
    if(req.session.userid){
        var session_userid=req.session.userid
    }else{
        var session_userid=0
    }
    var select4=' SELECT u_account FROM user WHERE u_id = "'+req.session.userid+'"'
    con.query(select4,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        user = result
    });

    var history=new Array();
    var select3=' SELECT v_no,name FROM vote WHERE v_no="'+req.cookies.history1+'" OR v_no="'+req.cookies.history2+'" OR v_no="'+req.cookies.history3+'" OR v_no="'+req.cookies.history4+'" OR v_no="'+req.cookies.history5+'" OR v_no="'+req.cookies.history6+'" OR v_no="'+req.cookies.history7+'" OR v_no="'+req.cookies.history8+'" OR v_no="'+req.cookies.history9+'" OR v_no="'+req.cookies.history10+'" '
    con.query(select3,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        history = result
    });

    var nowtime = dateFormat(now, "yyyy-mm-dd hh:MM:ss");
    // var select = 'select * from vote where endtime>"'+nowtime+'" '
    var T_message=new Array();
    var select = ' select v_no,name,endtime,SUM(vote_option1+vote_option2+vote_option3+vote_option4+vote_option5+vote_option6+vote_option7+vote_option8+vote_option9+vote_option10) as totalvote from vote,voting_results where endtime>"'+nowtime+'" and vote.v_no=voting_results.v_id GROUP BY v_no '
    var select2 = ' SELECT v_id,COUNT(no) as total FROM message GROUP BY v_id '
    con.query(select2,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        T_message=result
    });
    
    
    con.query(select,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        console.log(result);
        console.log(nowtime);
        console.log(T_message)
        console.log(history)
        console.log(session_userid)
        console.log(user)
        res.render('homepage',{file: result,T_message: T_message,history: history,userid: session_userid,user: user})    
    });

 })


 app.get('/allvote', function (req, res) {      //所有投票葉
    var user=new Array();
    if(req.session.userid){
        var session_userid=req.session.userid
    }else{
        var session_userid=0
    }
    var select4=' SELECT u_account FROM user WHERE u_id = "'+req.session.userid+'"'
    con.query(select4,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        user = result
    });

    var history=new Array();
    var select3=' SELECT v_no,name FROM vote WHERE v_no="'+req.cookies.history1+'" OR v_no="'+req.cookies.history2+'" OR v_no="'+req.cookies.history3+'" OR v_no="'+req.cookies.history4+'" OR v_no="'+req.cookies.history5+'" OR v_no="'+req.cookies.history6+'" OR v_no="'+req.cookies.history7+'" OR v_no="'+req.cookies.history8+'" OR v_no="'+req.cookies.history9+'" OR v_no="'+req.cookies.history10+'" '
    con.query(select3,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        history = result
    });

    var nowtime = dateFormat(now, "yyyy-mm-dd hh:MM:ss");
    // var select = 'select * from vote where endtime>"'+nowtime+'" '
    var T_message=new Array();
    var select = ' select v_no,name,endtime,SUM(vote_option1+vote_option2+vote_option3+vote_option4+vote_option5+vote_option6+vote_option7+vote_option8+vote_option9+vote_option10) as totalvote from vote,voting_results where vote.v_no=voting_results.v_id GROUP BY v_no '
    var select2 = ' SELECT v_id,COUNT(no) as total FROM message GROUP BY v_id '
    con.query(select2,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        T_message=result
    });
    
    
    con.query(select,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        console.log(result);
        console.log(nowtime);
        console.log(T_message)
        console.log(history)
        console.log(session_userid)
        console.log(user)
        res.render('allvote',{file: result,T_message: T_message,history: history,userid: session_userid,user: user})    
    });

 })


app.get('/user_edit', function (req, res) {     //資料更新
    if(req.session.userid) {
        var select='select * from user where u_id="'+req.session.userid+'" '

        con.query(select,function(error, result, fields){
            if(error){
                console.log('資料讀取失敗！');
                throw error;
            }
            console.log(result);
            res.render('user_edit',{file: result})    
        });
        console.log(req.session.userid)
    
    }else{
        res.redirect('http://im108jsfinalproject.herokuapp.com/login')
    }


 })
 app.post('/user_edit', function (req, res) {     //資料更新
    var u_code=req.body.u_id;
    var account=req.body.account;
    var pwd=req.body.pwd;
    var gender=req.body.gender;
    var age=req.body.age;

    var select='UPDATE user SET u_account="'+account+'",u_pwd="'+pwd+'",u_gender="'+gender+'",u_age="'+age+'" where u_id="'+u_code+'" '
    
    con.query(select,function(error){
        if(error){
            console.log('資料更新失敗！');
            throw error;
        }
    });
    res.redirect('http://im108jsfinalproject.herokuapp.com/user_edit')
 })

 app.get('/votepage', function (req, res) {     //投票頁
    var user=new Array();
    if(req.session.userid){
        var session_userid=req.session.userid
    }else{
        var session_userid=0
    }

    var select4=' SELECT u_account FROM user WHERE u_id = "'+req.session.userid+'"'
    con.query(select4,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        user = result
    });
    var votestatus="no"
    var no=req.query.no
    var select='select * from user,vote,message where v_no="'+no+'" and vote.v_no=message.v_id and message.u_id=user.u_id '
    var select2='select * from vote where v_no="'+no+'" '
    var select3='select SUM(vote_option1+vote_option2+vote_option3+vote_option4+vote_option5+vote_option6+vote_option7+vote_option8+vote_option9+vote_option10) as totalvote, sum(vote_option1) as SUMoption1, sum(vote_option2) as SUMoption2, sum(vote_option3) as SUMoption3, sum(vote_option4) as SUMoption4, sum(vote_option5) as SUMoption5, sum(vote_option6) as SUMoption6, sum(vote_option7) as SUMoption7, sum(vote_option8) as SUMoption8, sum(vote_option9) as SUMoption9, sum(vote_option10) as SUMoption10 from vote,voting_results where v_no="'+no+'" and voting_results.v_id=vote.v_no'
    var vote_option=new Array(10);
    var totalvote=0;
    var select5='select v_id from voting_results where v_id="'+no+'" and u_id="'+session_userid+'" and u_id not in ("0") '
    con.query(select5,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
            
        if(result.length>0){
            votestatus="yes"
        }else{

        }
    });

    con.query(select3,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        console.log(result);
        vote_option[0] = result[0].SUMoption1
        vote_option[1] = result[0].SUMoption2
        vote_option[2] = result[0].SUMoption3
        vote_option[3] = result[0].SUMoption4
        vote_option[4] = result[0].SUMoption5
        vote_option[5] = result[0].SUMoption6
        vote_option[6] = result[0].SUMoption7
        vote_option[7] = result[0].SUMoption8
        vote_option[8] = result[0].SUMoption9
        vote_option[9] = result[0].SUMoption10
        totalvote=  result[0].totalvote
        console.log(totalvote);

       console.log((vote_option[0]/totalvote));
    });
    
    
    con.query(select,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        console.log(result);
        console.log(result.length);
        
        if(result.length>0){
            console.log(result[0].endtime.toLocaleString())
            res.render('votepage',{file: result, vote_option: vote_option, totalvote: totalvote, userid: session_userid, user: user, end: result[0].endtime.toLocaleString(),votestatus: votestatus})
        }else{
        }
    });
    con.query(select2,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        console.log(result);
        console.log(result.length);
        if(result.length>0){
            res.render('votepage2',{file: result, vote_option: vote_option , totalvote: totalvote, userid: session_userid, user: user, end: result[0].endtime.toLocaleString(),votestatus: votestatus})
        }
    });
    
 })

 app.get('/history', function (req, res) {     //歷史頁
    var user=new Array();
    if(req.session.userid){
        var session_userid=req.session.userid
    }else{
        var session_userid=0
    }
    var select4=' SELECT u_account FROM user WHERE u_id = "'+req.session.userid+'"'
    con.query(select4,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        user = result
    });
    
    var no=req.query.no
    var select='select * from user,vote,message where v_no="'+no+'" and vote.v_no=message.v_id and message.u_id=user.u_id '
    var select2='select * from vote where v_no="'+no+'" '

    var select3='select SUM(vote_option1+vote_option2+vote_option3+vote_option4+vote_option5+vote_option6+vote_option7+vote_option8+vote_option9+vote_option10) as totalvote, sum(vote_option1) as SUMoption1, sum(vote_option2) as SUMoption2, sum(vote_option3) as SUMoption3, sum(vote_option4) as SUMoption4, sum(vote_option5) as SUMoption5, sum(vote_option6) as SUMoption6, sum(vote_option7) as SUMoption7, sum(vote_option8) as SUMoption8, sum(vote_option9) as SUMoption9, sum(vote_option10) as SUMoption10 from vote,voting_results where v_no="'+no+'" and voting_results.v_id=vote.v_no'
    var vote_option=new Array(10);
    var totalvote=0;

    con.query(select3,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        console.log(result);
        vote_option[0] = result[0].SUMoption1
        vote_option[1] = result[0].SUMoption2
        vote_option[2] = result[0].SUMoption3
        vote_option[3] = result[0].SUMoption4
        vote_option[4] = result[0].SUMoption5
        vote_option[5] = result[0].SUMoption6
        vote_option[6] = result[0].SUMoption7
        vote_option[7] = result[0].SUMoption8
        vote_option[8] = result[0].SUMoption9
        vote_option[9] = result[0].SUMoption10
        totalvote=  result[0].totalvote
        console.log(totalvote);

       console.log((vote_option[0]/totalvote));
    });
    
    
    con.query(select,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        console.log(result);
        console.log(result.length);
        
        if(result.length>0){
            
            console.log(result[0].endtime.toLocaleString())
            res.render('votepage_history',{file: result, vote_option: vote_option, totalvote: totalvote, userid: session_userid, user: user, end: result[0].endtime.toLocaleString()})
        }else{
        }
    });
    con.query(select2,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        console.log(result);
        console.log(result.length);
        if(result.length>0){
            res.render('votepage2_history',{file: result, vote_option: vote_option , totalvote: totalvote, userid: session_userid, user: user, end: result[0].endtime.toLocaleString()})
        }
    });
    
 })

 app.post('/sendvote', function (req, res) {    //送出投票
    var v_code=req.body.v_code;
    if(req.body.radio){
        if(req.session.userid) {
            // var v_code=req.body.v_code;
            var whatoption=new Array(10);
            for(var y=0;y<10;y++){
                whatoption[y] = 0;
            }
            // var whatoption=req.body.radio;
            var history=new Array(10);
            history[0]=req.cookies.history1
            history[1]=req.cookies.history2
            history[2]=req.cookies.history3
            history[3]=req.cookies.history4
            history[4]=req.cookies.history5
            history[5]=req.cookies.history6
            history[6]=req.cookies.history7
            history[7]=req.cookies.history8
            history[8]=req.cookies.history9
            history[9]=req.cookies.history10
            console.log(req.body.radio)
            var r=0;
            r=req.body.radio.length
            for(var k=0;k<r;k++){
                var x = req.body.radio[k];
                whatoption[(x-1)] =1;
                console.log(whatoption[(x-1)]+" , "+x)
            }

            for(var i=9;i>=0;i--){
                res.cookie('history'+(i+1),history[(i-1)])
                if(i==0){
                    res.cookie('history1',v_code)
                }
            }
            // var add='INSERT INTO voting_results (u_id,v_id,vote_option'+whatoption+') values ("'+req.session.userid+'","'+v_code+'","1" )'
            var add='INSERT INTO voting_results (u_id,v_id,vote_option1,vote_option2,vote_option3,vote_option4,vote_option5,vote_option6,vote_option7,vote_option8,vote_option9,vote_option10) values ("'+req.session.userid+'","'+v_code+'","'+whatoption[0]+'","'+whatoption[1]+'","'+whatoption[2]+'","'+whatoption[3]+'","'+whatoption[4]+'","'+whatoption[5]+'","'+whatoption[6]+'","'+whatoption[7]+'","'+whatoption[8]+'","'+whatoption[9]+'" )'
            con.query(add,function(error){
                if(error){
                    console.log('寫入資料失敗！');
                    throw error;
                } 
            });
            res.redirect('http://im108jsfinalproject.herokuapp.com/votepage?no='+v_code)
        }else{
            res.redirect('http://im108jsfinalproject.herokuapp.com/login')
        }
    }else{
        res.redirect('http://im108jsfinalproject.herokuapp.com/votepage?no='+v_code)
    }
 })
 app.post('/comment', function (req, res) {       //留言
    
    if(req.session.userid) {
        var v_code=req.body.v_code;
        var u_message=req.body.message;
        var nowtime = dateFormat(now, "yyyy-mm-dd HH:MM:ss");
        nowtime.toLocaleString();
        console.log("nowtime"+nowtime)
        console.log("now"+now)
        console.log("now2"+now.toLocaleString())
        var add='INSERT INTO message (u_id,v_id,message,settime) values ("'+req.session.userid+'","'+v_code+'","'+u_message+'","'+nowtime+'" )'
        con.query(add,function(error){
            if(error){
                console.log('寫入資料失敗！');
                throw error;
            }
        });

        res.redirect('http://im108jsfinalproject.herokuapp.com/votepage?no='+v_code)
    }else{
        res.redirect('http://im108jsfinalproject.herokuapp.com/login')
    }
   

 })


 app.get('/login', function (req, res) {    //登錄
    
    res.render('login')

 })

 app.post('/signin', function (req, res) {  //本地
    
    var account=req.body.account;
    var pwd=req.body.pwd;
    var sql ='SELECT * FROM user WHERE u_account="'+account+'" and u_pwd="'+pwd+'" '
    con.query(sql,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        console.log(result);
        if(result.length>0){
            req.session.userid = result[0].u_id;
        // console.log(req.session.userid);
        // res.send("req.session.userid")
            res.redirect('http://im108jsfinalproject.herokuapp.com/homepage')
        // res.render('votepage',{ name: result[0].name ,endtime:result[0].endtime ,Option1:result[0].Option1 ,Option2:result[0].Option2})
        }else{
            res.redirect('http://im108jsfinalproject.herokuapp.com/login')
        }
    });
 })

 app.get('/signup', function (req, res) {   //註冊
    
     var account2 = req.query.account2;
     var pwd2 = req.query.pwd2;
     var email2 = req.query.email2;
     var age2 = req.query.age2;
     var gender2 = req.query.gender2;
     var ff=new Array()
     var sql = 'select * from user where u_account= "'+account2+'" OR  u_email="'+email2+'"'
     con.query(sql,function(error, result, fields){
        if(error){console.log('讀取失敗！');throw error;}
        ff=result
        console.log(ff.length+"ssads")
        res.redirect('http://im108jsfinalproject.herokuapp.com/aabbccdd/lmkmnkj/iujiu/ji?length='+ff.length+'&account='+account2+'&pwd='+pwd2+'&email='+email2+'&age='+age2+'&gender='+gender2)
    })
    console.log(ff.length)
})
app.get('/aabbccdd/lmkmnkj/iujiu/ji', function (req, res){  //把註冊轉寫到資料庫
    var length =req.query.length
    var account2= req.query.account;
    var pwd2 =req.query.pwd
    var email2 =req.query.email
    var age2 =req.query.age
    var gender2 =req.query.gender
    if(length>0){
        res.send('wrong')
    }else{
        var sql2 = 'insert INTO user (u_account,u_pwd,u_email,u_age,u_gender) values ("'+account2+'","'+pwd2+'","'+email2+'","'+age2+'","'+gender2+'" )'
        con.query(sql2,function(error){if(error){console.log('寫入資料失敗！');throw error;}});
        
        // res.send("asas")
        //req.session.userid= result[0].u_id;
        res.redirect('http://im108jsfinalproject.herokuapp.com/login')
    }
    });

 app.get('/build', function (req, res) {    //建立投票
    if(req.session.userid) {
        var user=new Array();
        var nowdate = dateFormat(now, "yyyy-mm-dd");
        var mintime = dateFormat(now, "HH:MM");
        var select4=' SELECT u_account FROM user WHERE u_id = "'+req.session.userid+'"'
        con.query(select4,function(error, result, fields){
            if(error){
                console.log('資料讀取失敗！');
                throw error;
            }
            console.log(nowdate)
            console.log(mintime)
            res.render('build',{user: result,nowdate: nowdate,mintime: mintime})
        });
        
    }else{
        res.redirect('http://im108jsfinalproject.herokuapp.com/login')
    }
 })


 app.post('/build', function(req, res){
    if(req.body.title && req.body.voet_deadline && req.body.vote_amount && req.body.test[0] && req.body.test[1]){
        var name,endtime,votelimit,Option1=null,Option2=null,Option3=null,Option4=null,Option5=null;
        name=req.body.title
        endtime=req.body.voet_deadline
        votelimit=req.body.vote_amount
        Option1=req.body.test[0]
        Option2=req.body.test[1]
        Option3=req.body.test[2]
        Option4=req.body.test[3]
        Option5=req.body.test[4]
        Option6=req.body.test[5]
        Option7=req.body.test[6]
        Option8=req.body.test[7]
        Option9=req.body.test[8]
        Option10=req.body.test[9]

        var add='INSERT INTO vote (name,endtime,votelimit,Option1,Option2,Option3,Option4,Option5,Option6,Option7,Option8,Option9,Option10) values ("'+name+'","'+endtime+'","'+votelimit+'","'+Option1+'","'+Option2+'","'+Option3+'","'+Option4+'","'+Option5+'","'+Option6+'","'+Option7+'","'+Option8+'","'+Option9+'","'+Option10+'" )'
        con.query(add,function(error){if(error){console.log('寫入資料失敗！');throw error;}});

        res.redirect('http://im108jsfinalproject.herokuapp.com/build/voting_results/new/input')
    }else{
        res.redirect('http://im108jsfinalproject.herokuapp.com/build')
    }
   
 })
 app.get('/build/voting_results/new/input', function (req, res) {
    var newno = 0
    var select = ' SELECT MAX(v_no) as no FROM vote '
    con.query(select,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        console.log(result);
        newno=result[0].no
    });
    
    setTimeout(function(){
        var add = ' INSERT INTO voting_results(v_id,u_id) value ("'+newno+'","0") '
        con.query(add,function(error){if(error){console.log('寫入資料失敗！');throw error;}console.log(newno);});
        res.redirect('http://im108jsfinalproject.herokuapp.com/homepage')
    },500);
 })


 app.get('/backstage_option', function (req, res) {

    var T_message=new Array();
    var select = ' select v_no,name,endtime,SUM(vote_option1+vote_option2+vote_option3+vote_option4+vote_option5+vote_option6+vote_option7+vote_option8+vote_option9+vote_option10) as totalvote from vote,voting_results where vote.v_no=voting_results.v_id GROUP BY v_no '
    var select2 = ' SELECT v_id,COUNT(no) as total FROM message GROUP BY v_id '
    con.query(select2,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        T_message=result
    });
    
    
    con.query(select,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        console.log(result);
        console.log(T_message)
        res.render('backstage_option',{file: result,T_message: T_message})    
    });

 })
 app.get('/backstage_login', function (req, res) {
    
    res.render('backstage_login')

 })


 app.get('/backstage_analysis', function (req, res) {
    
    var no=req.query.no
    var select='select * from user,vote,message where v_no="'+no+'" and vote.v_no=message.v_id and message.u_id=user.u_id '
    var select2='select u_gender,COUNT(u_gender) as COUNT from user,voting_results where v_id="'+no+'" and user.u_id=voting_results.u_id and u_gender not in ("root") GROUP BY u_gender'
    var select4="select CASE WHEN u_age<10 then '00~09' WHEN u_age<20 then '10~19' WHEN u_age<30 then '20~29' WHEN u_age<40 then '30~39' WHEN u_age<50 then '40~49' WHEN u_age<60 then '50~59' WHEN u_age<70 then '60~69' WHEN u_age<80 then '70~79' WHEN u_age<90 then '80~89' WHEN u_age>90 then '90以上' END as agerang ,COUNT(u_age) as COUNT from user,voting_results where v_id='"+no+"' and user.u_id=voting_results.u_id and u_age not in (0)  GROUP BY CASE WHEN u_age<10 then '00~09' WHEN u_age<20 then '10~19' WHEN u_age<30 then '20~29' WHEN u_age<40 then '30~39' WHEN u_age<50 then '40~49' WHEN u_age<60 then '50~59' WHEN u_age<70 then '60~69' WHEN u_age<80 then '70~79' WHEN u_age<90 then '80~89' WHEN u_age>90 then '90以上' END"
    var select3='select SUM(vote_option1+vote_option2+vote_option3+vote_option4+vote_option5+vote_option6+vote_option7+vote_option8+vote_option9+vote_option10) as totalvote, sum(vote_option1) as SUMoption1, sum(vote_option2) as SUMoption2, sum(vote_option3) as SUMoption3, sum(vote_option4) as SUMoption4, sum(vote_option5) as SUMoption5, sum(vote_option6) as SUMoption6, sum(vote_option7) as SUMoption7, sum(vote_option8) as SUMoption8, sum(vote_option9) as SUMoption9, sum(vote_option10) as SUMoption10 from vote,voting_results where v_no="'+no+'" and voting_results.v_id=vote.v_no'
    var vote_option=new Array(10);
    var totalvote=0;
    var gender=new Array();
    var age=new Array();

    con.query(select3,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        console.log(result);
        vote_option[0] = result[0].SUMoption1
        vote_option[1] = result[0].SUMoption2
        vote_option[2] = result[0].SUMoption3
        vote_option[3] = result[0].SUMoption4
        vote_option[4] = result[0].SUMoption5
        vote_option[5] = result[0].SUMoption6
        vote_option[6] = result[0].SUMoption7
        vote_option[7] = result[0].SUMoption8
        vote_option[8] = result[0].SUMoption9
        vote_option[9] = result[0].SUMoption10
        totalvote=  result[0].totalvote
        console.log(totalvote);

       console.log((vote_option[0]/totalvote));
    });
    con.query(select2,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        gender = result;
    });
    con.query(select4,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        age = result;
    });

    
    con.query(select,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        console.log(result);
        console.log(result.length);
        console.log(result[0].endtime.toLocaleString())
        console.log(gender);
        console.log(age);
        console.log(age.length);
        res.render('backstage_analysis',{file: result, vote_option: vote_option, totalvote: totalvote, end: result[0].endtime.toLocaleString(),gender: gender,age: age})
        
    });


 })


 app.get('/test', function (req, res) {
    
    res.render('test')

 })

 app.get('/set_session',function(req,res){
    req.session.userid = 1
    res.send("a")
    // res.redirect('/homepage')
})
app.get('/pie', function (req, res) {
    
    res.render('pie')

 })
 app.get('/logout', function (req, res) {
    req.session = null
    res.redirect('http://im108jsfinalproject.herokuapp.com/login')
 })

 app.listen(process.env.PORT || 5000)
