function UI_init(){$(".introduction").click(function(){if(account==null){}$(this).fadeOut()});$("#btn-continue-challenge,#btn-refresh,#btn-levelup,#btn-upload,.bottomline .comment,.init-unfinish,.more-info").css({visibility:"hidden"});$(".more-info").click(function(){$(this).css({visibility:"hidden"})});$("#btn-about").click(function(){$(".more-info").css({visibility:"visible"})});$("#btn-challenge").click(function(){main.Fight()});$("#btn-get-opponents").click(function(){main.btn_get_opponents()});$("#name-player1").bind("keypress",function(event){if(event.keyCode=="13"){custom_name(this)}});$("#name-player2").bind("keypress",function(event){if(event.keyCode=="13"){custom_opponent(this);main.p2_wallet.name=$(this).val();main.p2_wallet.hash=parseInt("0x"+hex_md5($(this).val()));main.ResetToFirstBattle()}});$("#btn-custom-name").click(function(){custom_name($("#name-player1"))});$("#btn-custom-opponent").click(function(){custom_opponent($("#name-player2"))});Display.Div=$(".battle-log .content");$("#btn-speedup").click(function(){main.display_loop()});$(".interface button,#btn-custom-name,#btn-custom-opponent").addClass("button button-large button-plain button-border button-box")}function custom_name(obj){main.p1_wallet.name=$(obj).val();main.ResetToFirstBattle();main.upload_nickname(main.p1_wallet.name)}function custom_opponent(obj){main.p2_wallet.name=$(obj).val();main.p2_wallet.hash=parseInt("0x"+hex_md5($(obj).val()));main.ResetToFirstBattle()};
function ToDisplay(source,opponent,display_type,number,hpafter,isCombo,delay){this.source=source;this.opponent=opponent;this.number=number;this.hpafter=hpafter;this.isCombo=isCombo||false;this.type=display_type;this.delay=delay||1000;this.id=this.count++;this.pre=main.rundata.display_list[main.rundata.display_list.length-1];this.next_need_newline=false;switch(this.type){case eDisplayType.Defend:case eDisplayType.Counter:case eDisplayType.CriticalHit:case eDisplayType.Punch:break;case eDisplayType.Dodge:case eDisplayType.PunchCombo:case eDisplayType.Dead:case eDisplayType.Damage:case eDisplayType.Win:case eDisplayType.WinChallenge:case eDisplayType.LoseSuggerst:case eDisplayType.WinSuggerst:this.next_need_newline=true;default:break}this.need_intend=false;switch(this.type){case eDisplayType.Damage:case eDisplayType.Dead:case eDisplayType.Defend:case eDisplayType.Dodge:case eDisplayType.Counter:case eDisplayType.CriticalHit:if(this.pre!=null&&this.isCombo&&this.pre.isCombo){this.need_intend=true}break;case eDisplayType.Punch:case eDisplayType.PunchCombo:case eDisplayType.WinChallenge:case eDisplayType.LoseSuggerst:case eDisplayType.WinSuggerst:case eDisplayType.Win:default:break}main.rundata.display_list[main.rundata.display_list.length]=this}ToDisplay.prototype.count=0;ToDisplay.prototype.display=function(){this.NeedNewLine(false);switch(this.type){case eDisplayType.Punch:this.Punch();break;case eDisplayType.Damage:this.Damage();break;case eDisplayType.Dead:this.Dead();break;case eDisplayType.Win:this.Win();break;case eDisplayType.Defend:this.Defend();break;case eDisplayType.Dodge:this.Dodge();break;case eDisplayType.Counter:this.Counter();break;case eDisplayType.CriticalHit:this.CriticalHit();break;case eDisplayType.PunchCombo:this.PunchCombo();break;case eDisplayType.WinChallenge:this.WinChallenge();case eDisplayType.LoseSuggerst:this.LoseSuggerst();case eDisplayType.WinSuggerst:this.WinSuggerst();default:console.log("DisplayType丢失");break}$(".battle-log").animate({scrollTop:Display.Div.height()},10);
setTimeout(function(){main.display_loop()},this.delay)};ToDisplay.prototype.Punch=function(){var str=this.source.getName();str+=Display.RS(["挥出一拳","挥出摆拳","踢出一脚侧踹","使用正蹬"])+"，";Display.LastP().append(Display.ToSpan(str))};ToDisplay.prototype.Damage=function(){var str=this.opponent.getName()+"受到";str+=Display.ToSpan(this.number,"damage number");str+="点伤害";$(".hp .content."+this.opponent.data.tag).html("<p>"+this.hpafter+"</p>");Display.HPBarQ(this.opponent.data.tag,this.hpafter,this.opponent.data.hp);Display.LastP().append(Display.ToSpan(str))};ToDisplay.prototype.Dead=function(){var str=this.source.getName();str+=Display.RS(["倒下了","再起不能","举手投降","被打下了擂台","已经不能继续战斗了"]);Display.LastP().append(Display.ToSpan(str))};ToDisplay.prototype.Win=function(){var str=this.source.getName();str+="获得胜利";Display.LastP().append(Display.ToSpan(str))};ToDisplay.prototype.Defend=function(){var str=this.source.getName();str+=Display.RS(["迅速捂住了脸","抱头蹲下","进行防御"],"defend")+"，";Display.LastP().append(Display.ToSpan(str))};ToDisplay.prototype.Dodge=function(){var str=this.source.getName();str+=Display.RS(["躲开了攻击","没有被打中","发动闪避"]);Display.LastP().append(Display.ToSpan(str))};ToDisplay.prototype.Counter=function(){var str=this.source.getName();str+=Display.RS(["抓住机会进行了反击","找到了破绽反手一拳"])+"，";Display.LastP().append(Display.ToSpan(str))};ToDisplay.prototype.CriticalHit=function(){var name=this.source.getName();var str=Display.RS(["命中要害","致命一击","这一下看起来很痛","会心一击"]);Display.LastP().append(Display.ToSpan(str,"critical-hit")+Display.ToSpan("！"))};ToDisplay.prototype.PunchCombo=function(){var name=this.source.getName();var str=Display.RS([name+"打了一套组合拳",name+"把"+this.opponent.getName()+"按在地上一顿乱打"]);Display.LastP().append(Display.ToSpan(str))};ToDisplay.prototype.WinChallenge=function(){$("#btn-upload").css({visibility:"visible"})};ToDisplay.prototype.LoseSuggerst=function(){var str=Display.RS("建议：虽然这一把输了，但多尝试几次不同的打发就有可能胜利哦！");Display.LastP().append(Display.ToSpan(str))};ToDisplay.prototype.WinSuggerst=function(){var str=Display.RS("恭喜你新擂主。如果你安装了星云链钱包，可以点击上传成绩。");
Display.LastP().append(Display.ToSpan(str))};ToDisplay.prototype.NeedNewLine=function(isREC){if(this.pre==null||this.pre.next_need_newline){Display.Div.append(Display.ToP("",this.need_intend?"combo":""))}};Display={};Display.Div=null;Display.LastP=function(){return $(".battle-log .content p").last()};Display.ToElem=function(elemType,str,cls){return"<"+elemType+' class="'+(cls||"")+'">'+str+"</"+elemType+">"};Display.ToSpan=function(str,cls){return'<span class="'+(cls||"")+'">'+str+"</span>"};Display.ToP=function(str,cls){return'<p class="log-item '+(cls||"")+'">'+str+"</p>"};Display.RS=function(arr,cls){return this.ToSpan(arr[Math.floor(Math.random()*arr.length)],cls)};Display.HPBar=function(tag,number,maxhp,duration){var hpwidth=number/maxhp*118;$(".hpbar."+tag).animate({width:hpwidth},duration)};Display.HPBarQ=function(tag,hp,maxhp){var hpwidth=hp/maxhp*118;$(".hpbar."+tag+" .back").animate({width:hpwidth},1000);$(".hpbar."+tag+" .front").animate({width:hpwidth},250)};eDisplayType={Punch:0,Damage:1,Dead:2,Win:3,Defend:4,Dodge:5,Counter:6,CriticalHit:7,PunchCombo:8,WinChallenge:9,LoseSuggerst:10,WinSuggerst:11,Max:12,};
function BkRand(hash1,hash2){this.OrderCode={seed:hash1+hash2};this.OperationCode={seed:hash1-hash2};this.TechniqueCode={seed:hash1*hash2};this.IntensityCode={seed:hash1/hash2}}BkRand.prototype.OrderCodeIndex=0;BkRand.prototype.GetOrder=function(max){return this.seededRandom(this.OrderCode,max)};BkRand.prototype.OperationCodeIndex=0;BkRand.prototype.GetOperation=function(max){return this.seededRandom(this.OperationCode,max)};BkRand.prototype.TechniqueCodeIndex=0;BkRand.prototype.GetTechnique=function(max){return this.seededRandom(this.TechniqueCode,max)};BkRand.prototype.IntensityCodeIndex=0;BkRand.prototype.GetIntensity=function(max){return this.seededRandom(this.IntensityCode,max)};BkRand.prototype.seededRandom=function(code,max,min){max=max||1;min=min||0;code.seed=(code.seed*9301+49297)%233280;var rnd=code.seed/233280;return min+rnd*(max-min)};
var HttpRequest=require("nebulas").HttpRequest;var Neb=require("nebulas").Neb;var NebPay=require("nebpay");var neb=new Neb();neb.setRequest(new HttpRequest("https://mainnet.nebulas.io"));var nebApi=neb.api;var nebPay=new NebPay();var nebState=undefined;var account=undefined;var contractAddress="n1hxAD8etdF4Bp2T4cSnmuyLVpT8KQEmhcW";function Main(){}Main.prototype={p1:null,p2:null,has_init:false,target_is_last_winner:false,battle_times:0,p1_action_list:[],p1_now_action_index:0,p2_action_list:[],p2_now_action_index:0,display_index:0,display_list:[],display_looping:false,bk_rand:null,};Main.prototype.toASCII=function(str){var code="";var usernameMi="";for(var i=str.length-1;i>=0;i--){code=str.charCodeAt(i);usernameMi+=code}return usernameMi};Main.prototype.p1_wallet={hash:parseInt(Main.prototype.toASCII("n1Yv4HpXN7Jckfnik2r7nbDqKoCpZNjTpCx")),name:"鱼香肉丝"},Main.prototype.p2_wallet={hash:parseInt(Main.prototype.toASCII("n1UaMNYDDV8D6oE77KMHu6uhgKBfAf9i2Z1")),name:"宫保鸡丁"},Main.prototype.init=function(){if(this.has_init){return}this.has_init=true;$("#btn-upload").click(function(event){main.upload_winner(main.battle_times)});this.p1_wallet.hash=parseInt(this.toASCII(account));this.btn_get_opponents();this.ResetToFirstBattle()};Main.prototype.rundata={};Main.prototype.Fight=function(){this.resetBattleLog(true);$(".opponent-list").html("");this.init_player_info();this.resetRunData();this.battle_times++;$(".player-info.battle .content").html(this.battle_times);if(this.fight_loop(this.p1,this.p2)&&this.target_is_last_winner){new ToDisplay(null,null,eDisplayType.WinChallenge,null,null,null,500);new ToDisplay(null,null,eDisplayType.WinSuggerst,null,null,null,500)}if(!this.display_looping){this.display_looping=true;this.display_loop()}};Main.prototype.fight_loop=function(p1,p2){var res,action_type,success_rate;var acitve,passive;var battle=new Battle(this.bk_rand);while(true){res=battle.generateActionList(p1,p2,this.rundata);if(res){this.rundata.p1_now_action_index++;acitve=p1;passive=p2
}else{this.rundata.p2_now_action_index++;acitve=p2;passive=p1}battle.generateAction(acitve,passive);if(p1.hp==0){console.log("p2获胜");new ToDisplay(p1,null,eDisplayType.Dead);new ToDisplay(p2,null,eDisplayType.Win);new ToDisplay(null,null,eDisplayType.LoseSuggerst);break}else{if(p2.hp==0){console.log("p1获胜");new ToDisplay(p2,null,eDisplayType.Dead);new ToDisplay(p1,null,eDisplayType.Win);return true}}}};Main.prototype.display_loop=function(){var now_display=this.rundata.display_list[this.rundata.display_index];if(now_display){now_display.display();this.rundata.display_index++}else{setTimeout(function(){main.display_loop()},500)}};Main.prototype.upload_winner=function(times){var to=contractAddress;var value="0";var callFunction="setWinner";var callArgs=JSON.stringify([{times:times}]);var options={qrcode:{showQRCode:false,container:undefined,completeTip:undefined,cancelTip:undefined},callback:NebPay.config.testnetUrl,listener:function(value){if(typeof value==="string"){return}}};nebPay.call(to,value,callFunction,callArgs,options)};Main.prototype.upload_nickname=function(nickname){var to=contractAddress;var value="0";var callFunction="setUser";var callArgs=JSON.stringify([{name:nickname}]);var options={qrcode:{showQRCode:false,container:undefined,completeTip:undefined,cancelTip:undefined},callback:NebPay.config.testnetUrl,listener:function(value){if(typeof value==="string"){return}}};nebPay.call(to,value,callFunction,callArgs,options)};Main.prototype.btn_get_opponents=function(){var opponents;var pattern={name:"刘怪斯",hash:1};$(".opponent-list").html('<div class="title">正在获取对手列表……</div>');nebApi.call({chainID:nebState.chain_id,from:account,to:contractAddress,value:0,gasPrice:1000000,gasLimit:2000000,"contract":{"function":"getWinner",args:JSON.stringify([])},}).then(function(resp){if(resp&&resp.result){var result=JSON.parse(resp.result);if(result){opponents=[{name:result.name,hash:parseInt(main.toASCII(result.address))}];main.list_opponents(opponents)}}})};Main.prototype.list_opponents=function(opponents){$(".opponent-list").html('<div class="title">擂主：</div>');
for(var i=0;i<opponents.length;i++){$(".opponent-list").append(Display.ToElem("div",Display.ToElem("button",(opponents[i].name||"无名氏")),"item"));var fn=function(){var obj=i;if(i==opponents.length-1){opponents[obj].target_is_last_winner=true}$(".opponent-list .item").last().click(function(){main.select_opponents(opponents[obj])})};fn()}};Main.prototype.select_opponents=function(obj){$(".info-grid.name .content.hero-target").val(obj.name);$("#name-player2").val(obj.name);this.p2_wallet=obj;this.ResetToFirstBattle();this.target_is_last_winner=obj.target_is_last_winner};Main.prototype.ResetToFirstBattle=function(){$("#btn-upload").css({visibility:"hidden"});this.resetBattleLog();this.bk_rand=new BkRand(this.p1_wallet.hash,this.p2_wallet.hash);this.init_player_info();this.resetRunData()};Main.prototype.resetBattleLog=function(keep_times){if(!keep_times){this.battle_times=0}$(".player-info.battle .content").html(this.battle_times);Display.Div.html("")};Main.prototype.init_player_info=function(){this.p1=new Hero(this.p1_wallet.hash,"hero-me",this.p1_wallet.name,this.bk_rand);this.p2=new Hero(this.p2_wallet.hash,"hero-target",this.p2_wallet.name,this.bk_rand)};Main.prototype.resetRunData=function(){this.rundata.p1_action_list=this.p1_action_list.concat();this.rundata.p1_now_action_index=this.p1_now_action_index;this.rundata.p2_action_list=this.p2_action_list.concat();this.rundata.p2_now_action_index=this.p2_now_action_index;this.rundata.display_index=this.display_index;this.rundata.display_list=this.display_list.concat()};
function Battle(_bk_rand){this.bk_rand=_bk_rand}Battle.prototype.generateActionList=function(p1,p2,rundata){var p1time=rundata.p1_action_list[rundata.p1_now_action_index];var p2time=rundata.p2_action_list[rundata.p2_now_action_index];if(p1time==null){p1time=this.generateActionTime(p1,rundata.p1_action_list,rundata.p1_now_action_index);rundata.p1_action_list[rundata.p1_now_action_index]=p1time}if(p2time==null){p2time=this.generateActionTime(p2,rundata.p2_action_list,rundata.p2_now_action_index);rundata.p2_action_list[rundata.p2_now_action_index]=p2time}return p1time<=p2time};Battle.prototype.generateActionTime=function(player,arr,index){return(arr[index-1]||0)+player.spd+this.bk_rand.GetOrder()};Battle.prototype.generateAction=function(player,opponent){this.analyzeAction(player,opponent,Math.floor(this.bk_rand.GetOperation()*eActionType.Max))};Battle.prototype.analyzeAction=function(player,opponent,action_type){var action;switch(action_type){case eActionType.Punch:action=this.ActionPunch;break;case eActionType.PunchCombo:action=this.ActionPunchCombo;break;default:action=this.ActionPunch;break}var rate=this.bk_rand.GetTechnique(100);if(rate<70){action=this.ActionPunch}action.call(this,player,opponent)};var eActionType={Punch:0,PunchCombo:1,Max:2,};var eReactionType={None:0,Defend:1,Dodge:2,Counter:3,Max:4,};Battle.prototype.ActionPunch=function(player,opponent){new ToDisplay(player,opponent,eDisplayType.Punch);var dam=player.atk*(0.5+this.bk_rand.GetIntensity());this.NormalAttack(player,opponent,dam,false)};Battle.prototype.ActionPunchCombo=function(player,opponent){new ToDisplay(player,opponent,eDisplayType.PunchCombo,null,null,true);var remain_qi=600;var is_continue=true;while(remain_qi>0){is_continue=this.NormalAttack(player,opponent,0.5*player.atk*(0.5+this.bk_rand.GetIntensity()),true);if(!is_continue){break}remain_qi-=100+this.bk_rand.GetTechnique(100)*(opponent.skl/player.skl)}};Battle.prototype.NormalAttack=function(player,opponent,dam,isCombo){var react=this.PunchReact(opponent,player,isCombo);
switch(react){case eReactionType.None:dam-=0.1*opponent.def;break;case eReactionType.Defend:dam-=0.5*opponent.def;break;case eReactionType.Dodge:dam=0;return false;case eReactionType.Counter:dam=0;return false;default:break}if(dam<=0){dam=0}else{var cri=this.bk_rand.GetTechnique(100);if(cri>this.CriticalHitRate-20*(player.luk/opponent.luk-1)){dam*=2;new ToDisplay(player,opponent,eDisplayType.CriticalHit,dam,opponent.hp,isCombo)}dam=Math.floor(dam)}dam=Math.floor(dam);opponent.OnDamage(dam);new ToDisplay(player,opponent,eDisplayType.Damage,dam,opponent.hp,isCombo);return true};Battle.prototype.PunchReact=function(player,opponent,isCombo){var ram=this.bk_rand.GetOperation()*100+20*(player.skl/opponent.skl-1);if(ram<50){ram=eReactionType.None}else{if(ram<75){ram=eReactionType.Defend;new ToDisplay(player,opponent,eDisplayType.Defend,dam,null,isCombo)}else{if(ram<95){ram=eReactionType.Dodge;new ToDisplay(player,opponent,eDisplayType.Dodge,dam,null,isCombo)}else{ram=eReactionType.Counter;var dam=player.atk*(0.5+this.bk_rand.GetIntensity());dam=Math.floor(dam);opponent.OnDamage(dam);new ToDisplay(player,opponent,eDisplayType.Counter,dam,null,isCombo);new ToDisplay(player,opponent,eDisplayType.Damage,dam,opponent.hp,isCombo)}}}return ram};Battle.prototype.CriticalHitRate=70;
function Hero(hashcode1,tag,name,_bkRand){this.hp=0;this.ap=0;this.atk=0;this.def=0;this.luk=0;this.spd=0;this.skl=0;this.name=name;this.data={};this.data.tag=tag;this.seed=hashcode1;this.init(_bkRand)}Hero.prototype.init=function(_bkRand){this.data.hp=Math.round(_bkRand.seededRandom(this,750,1000));this.data.ap=0;this.data.atk=Math.round(_bkRand.seededRandom(this,39,100));this.data.def=Math.round(_bkRand.seededRandom(this,39,100));this.data.luk=Math.round(_bkRand.seededRandom(this,39,100));this.data.spd=Math.round(_bkRand.seededRandom(this,39,100));this.data.skl=Math.round(_bkRand.seededRandom(this,39,100));this.readAttri()};Hero.prototype.readAttri=function(){this.hp=this.data.hp;this.ap=0;this.atk=this.data.atk;this.def=this.data.def;this.luk=this.data.luk;this.spd=this.data.spd;this.skl=this.data.skl;var target_tag=".content."+this.data.tag;$(".name "+target_tag).html("<p>"+this.name+"</p>");$(".hp "+target_tag).html("<p>"+this.hp+"</p>");$(".atk "+target_tag).html("<p>"+this.atk+"</p>");$(".def "+target_tag).html("<p>"+this.def+"</p>");$(".luk "+target_tag).html("<p>"+this.luk+"</p>");$(".spd "+target_tag).html("<p>"+this.spd+"</p>");$(".skl "+target_tag).html("<p>"+this.skl+"</p>");Display.HPBarQ(this.data.tag,this.hp,this.data.hp)};Hero.prototype.id=0;Hero.prototype.OnDamage=function(dam){this.hp-=dam;if(this.hp<0){this.hp=0}console.log(this.name+"收到伤害"+dam+"点")};Hero.prototype.getName=function(){return Display.ToSpan("【"+this.name+"】",this.data.tag+" name")};
