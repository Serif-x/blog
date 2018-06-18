(function($){
  // Ready
  $(function(){
    var $result = $('#result');
    var $inpName = $('#inp-name');
    var $restInp = $('#rest-inp');
    var $restLink = $('.rest-link');
    
    $('#btnSubmit').on('click', function(e) {
      e.preventDefault();

      var name = $inpName.val();
      if (!name) {
        alert('请输入姓名');
        return;
      }
      generateParams(name, function(code) {
        var baseUrl = $('#labBaseUrl').val();
        var url = baseUrl + '?un=' + code;
        $restLink.attr('href', url);
        $restInp.val($restLink[0].href);
        $result.show();
      });
    });
  });
}(Zepto));

function generateParams(name, callback) {
  getConfig(function(conf) {
    var key = conf.key;
    if (!key) {
      return;
    }

    var _name = encrypt(name, key);
    var _hash = Hash(_name, key);
    callback(_name + 'A' + _hash);
  });
}

function Hash(str1, str2) {
  var str = Array.prototype.join.call(arguments, '');
  return CryptoJS.MD5(str).toString().toLowerCase();
}

function encrypt(str, key) {
  str = str || '';
  var arr = [];

  var getCode = function(str) {
    str = str || '';
    var result = 0;
    for (var i = 0, l = str.length; i < l; i++) {
      result += str.charCodeAt(i);
    }
    return result;
  }

  var keyCode = getCode(key);
  for (var i = 0, l = str.length; i < l; i++) {
    arr.push(str.charCodeAt(i) ^ keyCode);
  }
  return arr.join(key[0].toLowerCase());
}

function getConfig(callback) {
  $.getJSON('../conf.json', function(data) {
    if (data) {
      callback && callback(data);
      return;
    }

    alert('获取配置失败');
  });
}