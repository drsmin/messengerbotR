const scriptName = "계산";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    var cmd = msg.split(" ");
    
    if (cmd[0] == "/계산") {
        
        var calc = msg.substr(3);
        
        var res = test(calc);
        
        if (res == null) {
            replier.reply("계산 식 오류 입니다 (" + calc + ")");  
        } else {
        
            replier.reply(calc + " = " + res);
        }
    }
}

String.prototype.replaceAll = function(search, replace)
{
    if(!replace){
        return this;
    }
    return this.replace(new RegExp('[' + search + ']', 'g'), replace);
};
 
function scriptXSS(msg){
    msg = msg.replaceAll("&", "&");
    msg = msg.replaceAll("<", "<");
    msg = msg.replaceAll(">", ">");
    msg = msg.replaceAll("(", "&#040;");
    msg = msg.replaceAll(")", "&#041;");
    msg = msg.replaceAll("\"", "");
    msg = msg.replaceAll("'", "&#x27;");
 return msg;
}
 
function test (req)
{
    try {
      return eval(unescape(scriptXSS(req)));
    } catch(e) {
      return null;
    }
}

//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
  var textView = new android.widget.TextView(activity);
  textView.setText("Hello, World!");
  textView.setTextColor(android.graphics.Color.DKGRAY);
  activity.setContentView(textView);
}

function onStart(activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}
