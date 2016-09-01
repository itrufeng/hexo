'use strict';

hexo.extend.filter.register('after_post_render', function(data) {
  if (data.layout === 'post') {
    let short_name = 'itrufeng'
    let title = data.title.replace(' ', '_');
    let content = `
			<!-- 多说评论框 start -->
      <div class='ds-thread' data-thread-key='${short_name}' data-title=${title} data-url='null'></div>
      <!-- 多说评论框 end -->
      <!-- 多说公共JS代码 start (一个网页只需插入一次) -->
      <script type='text/javascript'>
        var duoshuoQuery = {short_name:'${short_name}'};
        (function() {
          var ds = document.createElement('script');
          ds.type = 'text/javascript';ds.async = true;
          ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
          ds.charset = 'UTF-8';
          (document.getElementsByTagName('head')[0]
           || document.getElementsByTagName('body')[0]).appendChild(ds);
        })();
      </script>
      <!-- 多说公共JS代码 end -->`;
    data.content = data.content + content;
  }
  return data;
}, 1000);
