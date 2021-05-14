const scriptName = "로그점수";
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

    if (cmd[0] == "/로그") {
        try {
          
          Log.debug("cmd[1]=" + cmd[1]);
        
          var res = org.jsoup.Jsoup.connect("https://ko.classic.warcraftlogs.com/character/kr/%EC%96%BC%EC%9D%8C%ED%94%BC/" + cmd[1])
              .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36")
              .execute();
          var data = res.parse();
              
          var csrf = data.select("head > [name='csrf-token']").attr("content");
          
          //Log.debug("csrf=" + csrf);
          
          var zone = data.select("#character-inset > div:nth-child(2) > div.header-zone-name").text();
          
          //Log.debug("zone=" + zone);
          
          var scripts = data.select("script");
          var characterId = "";
          
          for (var idx = 0, _max = scripts.size() ; idx < _max ; idx ++) {

              var script = scripts.get(idx).html();

              if (script == "") continue;
              
              if (script.indexOf("jQuery") < 0) continue;

              characterId = script.match(/characterID\ \=\ ([0-9]+)/);
              
              if (characterId != null) {
                characterId = characterId[1];
                break;
              }
          }
          
          //Log.debug("characterId=" + characterId);
          
          //Log.debug(res.cookies());
          var cookies = res.cookies();
                    
          var headers = res.headers();
          //Log.debug(cookies);
          //Log.debug(headers);
          
          var zoneId = 1006;
          
          if ("안퀴라즈 사원" == zone) {
            zoneId = 1005;
          } else if ("검은날개 둥지" == zone) {
            zoneId = 1002;
          }
          
          var rDiv = "dps";
          
          if (cmd[2] == '힐') {
            rDiv = "hps";
          }
                    
          data = org.jsoup.Jsoup.connect("https://ko.classic.warcraftlogs.com/character/rankings-zone/"+ characterId + "/"+ rDiv+"/3/" + zoneId + "/0/3/40/5/Any/rankings/0/0?dpstype=rdps" )
              .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36")
              .cookies(cookies)
              .header("X-Requested-With", "XMLHttpRequest")
              .header("Referer", "https://ko.classic.warcraftlogs.com/character/kr/%EC%96%BC%EC%9D%8C%ED%94%BC/" + cmd[1])
              //.headers(headers)
              .get();
          
          //Log.debug(data);
          
          var best = data.select("#top-box > div.stats > div.best-perf-avg > b").text();
          //Log.debug("best=" + best);
                             
          var mid = data.select("#top-box > div.stats > div.median-perf-avg > table > tbody > tr:nth-child(1) > td:nth-child(2)").text();
          //Log.debug("mid=" + mid);
          
          var bossTrs = data.select("#boss-table-" + zoneId + " > tbody > tr");
          
          var bossDmg = "";
          
          for (var idx = 0, _max = bossTrs.size() ; idx < _max ; idx ++) {
              var bossTr = bossTrs.get(idx);
              
              var bossNm = bossTr.select("td:nth-child(1) > div > div:nth-child(1) > a").text();
              var bossBest = bossTr.select("td:nth-child(2)").text();
              var bossDps = bossTr.select("td:nth-child(3)").text();
              var bossKill = bossTr.select("td:nth-child(4)").text();
              
              bossDmg = bossDmg + "[" + bossNm + "] " + bossBest + "점 / " + bossDps + " / " + bossKill + "킬\n";
          }
          
          replier.reply(
          "https://ko.classic.warcraftlogs.com/character/id/" + characterId + "\n\n"
          + "[" + cmd[1] + " / " + rDiv + " / " + zone + "]\nbest : " + best + "\nmedian : " + mid
          + "\n\n" + bossDmg
          );
        } catch (e) {
          replier.reply("와우로그 정보 불러오기 실패");
          Log.error(e);
        }
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
