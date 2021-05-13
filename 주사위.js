const scriptName = "주사위";
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
    if (cmd[0] == "/주사위") {
        
        var min = 1;
        var max = 100;
        
        var result = 0;
        var range = "";
        
        if (cmd.length == 1) {
            range = "";
        } else if (cmd.length == 2) {
            if (cmd[1].indexOf('-') !== -1) {
                var rng = cmd[1].split('-');
                min = rng[0];
                max = rng[1];
            } else {
                max = cmd[1];
            }
            
            if (Number.isNaN(min) == true || Number.isNaN(max) == true) {
                replier.reply(sender + "!! 주사위에는 숫자만 입력해 주세요");
                return;
            }
                        
            range = "(" + min + "-" + max + ")";
        }
        
        result = Number(rand(Number(min), Number(max)));
        
        replier.reply(sender + " 이(가) 주사위를 굴려 " + result + " 이(가) 나왔습니다" + range);
    }
}

function rand(min, max) {
  
  var rnd = Math.random();
  
  return Math.floor(rnd * (max - min + 1)) + min;
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
