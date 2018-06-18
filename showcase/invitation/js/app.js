var support = {
  canvas: function () {
    return !!document.createElement('canvas').getContext;
  }
};

(function($){
  // Ready
  $(function(){
    var $pageIndex = $('#page-index');
    var $pageContent = $('#page-content');
    var canvas = document.getElementById('content-canvas');

    var loadPage = function(page) {
      $(page).addClass('page-in').siblings('.page').removeClass('page-in');
    };

    var un = getQueryString('un');
    if (!un) {
      alert('该邀请函不存在');
      return;
    }

    getName(un, function(name) {
      $pageIndex.on('click', function() {
        loadPage($pageContent);
      });

      setTimeout(function() {
        loadPage($pageContent);
      }, 3e3);
  
      if(!support.canvas()){
        document.body.insertBefore(document.createTextNode('您的浏览器不支持绘图！'), document.body.firstChild);
        return;
      }
  
      drawImage(canvas, canvas.getAttribute('data-img'), function() {
        drawText(canvas, {
          text: name,
          fontSize: '40px',
          startPoint: {
            x: 238,
            y: 102
          },
          maxWidth: 130
        });
      });

    }, function() {
      alert('该邀请函不存在');
    });
  });
}(Zepto));

function drawText(canvas, options){
  var context = canvas.getContext('2d');
  // save
  context.save();

  var fontSize = options.fontSize || '';
  var font = fontSize + ' Microsoft Yahei';
  var textAlign = 'center';
  var fillStyle = '#000';

  var text = options.text || '';
  var startPoint = options.startPoint || '';
  var maxWidth = options.maxWidth;

  context.font = font;
  context.textAlign = textAlign;
  context.fillStyle = fillStyle;
  context.textBaseline = 'middle';

  context.fillText(text, startPoint.x, startPoint.y, maxWidth);

  context.restore();
}

function drawImage(canvas, imageSrc, callback) {
  var img = new Image();
  var ctx = canvas.getContext('2d');
  img.onload = function () {
    ctx.canvas.width = img.width;
    ctx.canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    callback && callback(ctx);
  };
  img.src = imageSrc;
}

function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
      return decodeURIComponent(r[2]);
  }
  return null;
}

function getConfig(callback) {
  $.getJSON('conf.json', function(data) {
    if (data) {
      callback && callback(data);
      return;
    }

    alert('获取配置失败');
  });
}

function Hash(str1, str2) {
  var str = Array.prototype.join.call(arguments, '');
  return CryptoJS.MD5(str).toString().toLowerCase();
}

function getName(str, success, failed) {
  success = success || function() {};
  failed = failed || function() {};

  getConfig(function(conf) {
    var key = conf.key;
    if (!key) {
      failed();
      return;
    }

    var arrQuery = str.split('A');
    if (arrQuery.length < 2) {
      failed();
    }
    var queryName = arrQuery[0];
    var queryHash = arrQuery[1];
    var hash = Hash(queryName, key);
    if (hash === queryHash) {
      var name = decrypt(queryName, key);
      success(name);
    } else {
      failed();
    }
  });
}

function decrypt(str, key) {
  str = str || '';
  var result = '';
  var arr = str.split(key[0].toLowerCase());

  var getCode = function(str) {
    str = str || '';
    var result = 0;
    for (var i = 0, l = str.length; i < l; i++) {
      result += str.charCodeAt(i);
    }
    return result;
  }

  var keyCode = getCode(key);
  for (var i = 0, l = arr.length; i < l; i++) {
    result += String.fromCharCode(arr[i] ^ keyCode);
  }
  return result;
}